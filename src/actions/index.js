//action types
export const ADD_PRODUCTS_TO_LIST = "ADD_PRODUCTS_TO_LIST";
export const ADD_PRODUCT_TO_CART = "ADD_PRODUCT_TO_CART";
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART";
export const ADD_NEW_PRODUCT_TO_LIST = "ADD_NEW_PRODUCT_TO_LIST";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT_FROM_LIST = "DELETE_PRODUCT_FROM_LIST";
export const IS_SHOW_CART = "IS_SHOW_CART";
export const SET_FORM_SUBMITTED_TO_FALSE = "SET_FORM_SUBMITTED_TO_FALSE";

//action creaters
export function addProductsToList(products) {
	return {
		type: ADD_PRODUCTS_TO_LIST,
		products,
	};
}
export function addProductToCart(id) {
	return {
		type: ADD_PRODUCT_TO_CART,
		id,
	};
}
export function removeProductFromCart(id) {
	return {
		type: REMOVE_PRODUCT_FROM_CART,
		id,
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
	return {
		type: DELETE_PRODUCT_FROM_LIST,
		id,
	};
}
export function isShowCart(boolean) {
	return {
		type: IS_SHOW_CART,
		boolean,
	};
}
