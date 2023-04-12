import { Link } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import { isShowCart, setFormSubmittedToFalse } from "../actions";

class Navbar extends React.Component {

	handleFormSubmittedToFalse = () => {
		this.props.dispatch(setFormSubmittedToFalse());
	}

	render() {
		return (
			<nav>
				<div className="nav-left">
					<div
						className="brand-logo"
						onClick={() => {
							this.props.dispatch(isShowCart(false));
						}}>
						<Link to="/">eCommerce</Link>
					</div>
					<ul
						className="nav-list"
						onClick={() => {
							this.props.dispatch(isShowCart(false));
						}}>
						<li>
							<Link to="/">Products</Link>
						</li>
						<li>
							<Link to="/createProduct" onClick={this.handleFormSubmittedToFalse}>
								<span>
									Add a Product{" "}
									<i className="fa-solid fa-circle-plus green"></i>
								</span>{" "}
							</Link>
							{/* <a href="/createProduct" onClick={this.handleFormSubmittedToFalse}>
								<span>
									Add a Product{" "}
									<i className="fa-solid fa-circle-plus green"></i>
								</span>{" "}
							</a> */}
						</li>
					</ul>
				</div>
				<div className="nav-right">
					<div
						className="nav-cart"
						onClick={() => {
							this.props.dispatch(isShowCart(true));
						}}>
						<Link to="/">
							<span>
								<i className="fa-solid fa-cart-shopping"></i>
								<span className="cart-count">{this.props.cart.length}</span>
							</span>
						</Link>
					</div>
					<div className="user-info">
						<span className="user-name">John Doe</span>
						<img
							src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
							alt="user-img"></img>
					</div>
				</div>
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		cart: state.products.cart,
		showCart: state.products.showCart,
	};
}

const connectedNavbarComponent = connect(mapStateToProps)(Navbar);

export default connectedNavbarComponent;
