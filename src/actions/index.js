import { toast } from "react-toastify";

//action types
export const ADD_PRODUCTS_TO_LIST = "ADD_PRODUCTS_TO_LIST";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const ADD_NEW_PRODUCT_TO_LIST = "ADD_NEW_PRODUCT_TO_LIST";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT_FROM_LIST = "DELETE_PRODUCT_FROM_LIST";
export const IS_SHOW_CART = "IS_SHOW_CART";
export const SET_FORM_SUBMITTED_TO_FALSE = "SET_FORM_SUBMITTED_TO_FALSE";
export const SORT_BY_PRICE = "SORT_BY_PRICE";
export const SORT_BY_ID = "SORT_BY_ID";

//action creaters
export function addProductsToList(products) {
	return {
		type: ADD_PRODUCTS_TO_LIST,
		products,
	};
}
export function addProductToCart(id) {
	return function (dispatch) {
		dispatch({
			type: ADD_PRODUCT_TO_CART,
			id,
		});
		toast.success("Added to cart successfully!!!", {
			autoClose: 1000,
		});
	};
}
export function removeProductFromCart(id) {
	return function (dispatch) {
		dispatch({
			type: REMOVE_PRODUCT_FROM_CART,
			id,
		});
		toast.success("Removed from cart successfully!!!", {
			autoClose: 1000,
		});
	};
}
export function addNewProductToList(product) {
	return {
		type: ADD_NEW_PRODUCT_TO_LIST,
		product,
	};
}
export function setFormSubmittedToFalse() {
	return {
		type: SET_FORM_SUBMITTED_TO_FALSE,
	};
}
export function editProduct(data) {
	return {
		type: EDIT_PRODUCT,
		data,
	};
}
export function deleteProduct(id) {
	return function (dispatch) {
		dispatch({
			type: DELETE_PRODUCT_FROM_LIST,
			id,
		});
		toast.success("Product deleted successfully!!!", {
			autoClose: 1000,
		});
	};
}
export function isShowCart(boolean) {
	return {
		type: IS_SHOW_CART,
		boolean,
	};
}
export function sortByPrice() {
	return {
		type: SORT_BY_PRICE,
	};
}
export function sortById() {
	return {
		type: SORT_BY_ID,
	};
}
