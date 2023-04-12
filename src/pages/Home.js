import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
	addProductToCart,
	deleteProduct,
	removeProductFromCart,
	sortByPrice,
	sortById,
} from "../actions";
import { toastContainerStyle } from "../Constants";
import { ToastContainer } from "react-toastify";

class Home extends React.Component {
	handleSort = () => {
		console.log("sorted");
		this.props.dispatch(sortByPrice());
	};
	handleClearSort = () => {
		console.log("cleared sort");
		this.props.dispatch(sortById());
	};
	handleAddToCart = async (id) => {
		console.log("adding to cart");
		await this.props.dispatch(addProductToCart(id));
	};
	handleRemoveFromCart = (id) => {
		console.log("removing from cart");
		this.props.dispatch(removeProductFromCart(id));
	};
	handleDeleteBtn = (id) => {
		console.log("Product delete");
		this.props.dispatch(deleteProduct(id));
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
							<li key={`product-${product.id}`}>
								<div className="product-card">
									<div className="card-img">
										<img
											src={product.img}
											alt="product img"
											onError={(e) =>
												(e.target.src =
													"https://media.istockphoto.com/id/1383674565/photo/notification-icon-symbol-on-red-background-3d-rendering-illustration.jpg?s=612x612&w=0&k=20&c=g1CeKLANtyvvWYfHfAsXXBw2S8VJGZuWbFDY1TEv1SE=")
											}
										/>
									</div>
									<div className="card-details">
										<h3>{product.name}</h3>
										<h5>Rs. {product.price}</h5>
										<h6>Rating: {product.rating}/5</h6>
									</div>
									<div className="card-description">
										<p>{product.description}</p>
										<hr></hr>
										<div className="card-edit-btns">
											<Link
												to={`/editProduct/${product.id}`}
												state={{ id: product.id }}>
												<span className="card-edit-btn">
													<i className="fa-solid fa-pencil"></i>
												</span>
											</Link>
											<span
												className="card-delete-btn"
												onClick={() => this.handleDeleteBtn(product.id)}>
												<i className="fa-solid fa-trash-can"></i>
											</span>
											{isShowCart ? (
												<span
													className="Remove-from-cart-btn brown"
													onClick={() => this.handleRemoveFromCart(product.id)}>
													Remove from Cart
												</span>
											) : (
												<span
													className="Add-to-cart-btn"
													onClick={() => this.handleAddToCart(product.id)}>
													Add to Cart
												</span>
											)}
										</div>
									</div>
								</div>
							</li>
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
