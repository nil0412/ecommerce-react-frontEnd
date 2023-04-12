import React from "react";
import { connect } from "react-redux";

class Cart extends React.Component {
	render() {
		const products = this.props.products;
		console.log(products);
		return (
			<div className="page-container">
				{this.props.cart.length === 0 ? (
					<div>empty</div>
				) : (
					<div className="products-container">
						<ul>
							{this.props.cart.map((product) => (
								<li key={`product-${product.id}`}>
									<div className="product-card">
										<div className="card-img">
											<img src={product.img} alt="product img" />
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
												<span className="card-edit-btn">
													<i className="fa-solid fa-pencil"></i>
												</span>
												<span className="card-delete-btn">
													<i className="fa-solid fa-trash-can"></i>
												</span>
												<span
													className="Add-to-cart-btn"
													onClick={() => this.handleAddToCart(product.id)}>
													Add to Cart
												</span>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				)}
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

const connecteCartComponent = connect(mapStateToProps)(Cart);

export default connecteCartComponent;
