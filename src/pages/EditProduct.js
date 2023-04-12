import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { EditProductFunctional } from "./EditProductFunctional";

class EditProduct extends React.Component {
	render() {
		if (this.props.formSubmitted) {
			return <Navigate to="/" />;
		}
		return <EditProductFunctional products={this.props.products} dispatch={this.props.dispatch}/>;
	}
}

function mapStateToProps(state) {
	return {
		products: state.products,
	};
}

const connectedEditProductComponent = connect(mapStateToProps)(EditProduct);

export default connectedEditProductComponent;
