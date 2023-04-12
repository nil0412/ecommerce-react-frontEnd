import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { addNewProductToList } from "../actions";
import { JSON_API_URL } from "../Constants";
import { ToastContainer, toast } from "react-toastify";
import { toastContainerStyle, toastStyle } from "../Constants";

class CreateProduct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			description: "",
			price: "",
			rating: "3",
			img: "",
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		fetch(JSON_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(this.state),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
				this.props.dispatch(addNewProductToList(data));
				toast.success("Product added to cart!", toastStyle);
			})
			.catch((error) => {
				console.error("Error:", error);
				toast.error(("Error: ", error), toastStyle);
			});
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		if (this.props.formSubmitted) {
			return <Navigate to="/" />;
		}
		return (
			<div className="page-container">
				<div className="form-container">
					<form onSubmit={this.handleSubmit}>
						<h1>Add a Product</h1>
						<label htmlFor="name">Name</label>
						<br />
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Product name"
							value={this.state.name}
							onChange={this.handleChange}
							required></input>
						<br />
						<label htmlFor="description">Description</label>
						<br />
						<input
							type="text"
							id="description"
							name="description"
							placeholder="Product description"
							value={this.state.description}
							onChange={this.handleChange}
							required></input>
						<br />
						<label htmlFor="price">Price</label>
						<br />
						<input
							type="number"
							id="price"
							name="price"
							value={this.state.price}
							onChange={this.handleChange}
							placeholder="Price greater than or equals to 0"
							required></input>
						<br />
						<label htmlFor="rating">Rating: &nbsp; {this.state.rating}/5</label>
						<br />
						<input
							type="range"
							id="rating"
							name="rating"
							min={1}
							max={5}
							value={this.state.rating}
							onChange={this.handleChange}
							required></input>
						<br />
						<label htmlFor="img">Product Image Link</label>
						<br />
						<input
							type="text"
							id="img"
							name="img"
							placeholder="https://images.unsplash.com/photo-1570198561490"
							value={this.state.img}
							onChange={this.handleChange}></input>
						<br />
						<button type="submit">Add Product</button>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		products: state.products,
		formSubmitted: state.products.formSubmitted,
	};
}

const connectedCreateProductComponent = connect(mapStateToProps)(CreateProduct);

export default connectedCreateProductComponent;
