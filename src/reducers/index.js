import { toast } from "react-toastify";

import {
	ADD_PRODUCTS_TO_LIST,
	ADD_PRODUCT_TO_CART,
	ADD_NEW_PRODUCT_TO_LIST,
	DELETE_PRODUCT_FROM_LIST,
	IS_SHOW_CART,
	REMOVE_PRODUCT_FROM_CART,
	SET_FORM_SUBMITTED_TO_FALSE,
	EDIT_PRODUCT,
	SORT_BY_PRICE,
	SORT_BY_ID,
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
		case EDIT_PRODUCT:
			const newState = state.list.filter(
				(product) => product.id !== action.data.id
			);
			return {
				...state,
				list: [action.data, ...newState],
			};
		case SORT_BY_PRICE:
			const sortedByPriceList = state.list.sort((a, b) => a.price - b.price);
			const sortedByPriceCart = state.cart.sort((a, b) => a.price - b.price);
			return {
				...state,
				list: [...sortedByPriceList],
				cart: [...sortedByPriceCart],
			};
		case SORT_BY_ID:
			const sortedByIdList = state.list.sort((a, b) => a.id - b.id);
			const sortedByIdCart = state.cart.sort((a, b) => a.id - b.id);
			return {
				...state,
				list: [...sortedByIdList],
				cart: [...sortedByIdCart],
			};
		default:
			return state;
	}
}
