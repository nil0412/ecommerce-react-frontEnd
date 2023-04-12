import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import EditProduct from "../pages/EditProduct";
import React from "react";
import { addProductsToList } from "../actions";
import { connect } from "react-redux";
import CreateProduct from "../pages/CreateProduct";
import { JSON_API_URL } from "../Constants";

class App extends React.Component {
	componentWillMount() {
		const url = JSON_API_URL;
		fetch(url)
			.then((response) => response.json())
			.then((products) => {
				console.log("products: ", products);

				this.props.dispatch(addProductsToList(products));
				// dispatchEvent()
				// this.props.products.list = products;
				// console.log("productsList: ", this.props.products.list);
			});
	}
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/createProduct" element={<CreateProduct />} />
						<Route path="/editProduct/:productId" element={<EditProduct />} />
					</Routes>
				</BrowserRouter>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		list: state.products.list,
		cart: state.products.cart,
	};
}

const connecteAppComponent = connect(mapStateToProps)(App);

export default connecteAppComponent;
