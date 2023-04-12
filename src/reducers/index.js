import {
	ADD_PRODUCTS_TO_LIST,
	ADD_PRODUCT_TO_CART,
	ADD_NEW_PRODUCT_TO_LIST,
	DELETE_PRODUCT_FROM_LIST,
	IS_SHOW_CART,
	REMOVE_PRODUCT_FROM_CART,
	SET_FORM_SUBMITTED_TO_FALSE,
} from "../actions";

const initialProductsState = {
	list: [],
	cart: [],
	showCart: false,
	formSubmitted: false,
};

export function products(state = initialProductsState, action) {
	switch (action.type) {
		case ADD_PRODUCTS_TO_LIST:
			return {
				...state,
				list: action.products,
			};
		case ADD_PRODUCT_TO_CART:
			console.log("State: ", state);
			const isPresent = state.cart.some((product) => product.id === action.id);
			if (!isPresent) {
				const product = state.list.filter(
					(product) => product.id === action.id
				);
				return {
					...state,
					cart: [product[0], ...state.cart],
				};
			}
			return {
				...state,
			};
		case REMOVE_PRODUCT_FROM_CART:
			console.log("State: ", state);
			const cartProducts = state.cart.filter(
				(product) => product.id !== action.id
			);
			return {
				...state,
				cart: [...cartProducts],
			};
		case ADD_NEW_PRODUCT_TO_LIST:
			return {
				...state,
				list: [action.product, ...state.list],
				formSubmitted: true,
			};
		case SET_FORM_SUBMITTED_TO_FALSE:
			return {
				...state,
				formSubmitted: false,
			};
		case DELETE_PRODUCT_FROM_LIST:
			return {
				...state,
				list: state.list.filter((product) => product.id !== action.id),
				cart: state.cart.filter((product) => product.id !== action.id),
			};
		case IS_SHOW_CART:
			return {
				...state,
				isShowCart: action.boolean,
			};
		default:
			return state;
	}
}
