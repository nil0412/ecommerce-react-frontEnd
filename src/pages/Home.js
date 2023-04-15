import React from "react";
import { connect } from "react-redux";
import {
	sortByPrice,
	sortById,
} from "../actions";
import { toastContainerStyle } from "../Constants";
import { ToastContainer } from "react-toastify";
import { CardOrForm } from "../components/CardOrForm";

class Home extends React.Component {
	handleSort = () => {
		console.log("sorted");
		this.props.dispatch(sortByPrice());
	};
	handleClearSort = () => {
		console.log("cleared sort");
		this.props.dispatch(sortById());
	};
	render() {
		const products = this.props.products;
		const isShowCart = this.props.isShowCart;
		const cartOrList = isShowCart ? products.cart : products.list;
		return (
			<div className="page-container">
				<ToastContainer style={toastContainerStyle} />
				<div className="sort-div-container">
					<div className="sort-div">
						<span className="sort-btn" onClick={this.handleSort}>
							Sort by Price
						</span>{" "}
						<i
							className="fa-solid fa-circle-xmark brown sort-clear-btn"
							onClick={this.handleClearSort}></i>
					</div>
				</div>
				<div className="products-container">
					<ul>
						{cartOrList.map((product) => (
							<CardOrForm key={`product-${product.id}`}
								product={product}
								isShowCart={isShowCart}
								dispatch={this.props.dispatch}
								handleAddToCart={this.handleAddToCart}
								handleRemoveFromCart={this.handleRemoveFromCart}
								handleDeleteBtn={this.handleDeleteBtn}
							/>
						))}
					</ul>
					{cartOrList.length === 0 ? <div>No item to show !!!</div> : null}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.products,
		isShowCart: state.products.isShowCart,
	};
}

const connectedHomeComponent = connect(mapStateToProps)(Home);

export default connectedHomeComponent;
