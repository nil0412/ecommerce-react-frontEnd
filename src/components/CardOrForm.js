import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	addProductToCart,
	deleteProduct,
	editProduct,
	removeProductFromCart,
} from "../actions";
import { JSON_API_URL, toastStyle } from "../Constants";

export function CardOrForm(props) {
	const [isEditable, setIsEditable] = useState(false);
	const [name, setName] = useState(props.product.name);
	const [description, setDescription] = useState(props.product.description);
	const [price, setPrice] = useState(props.product.price);
	const [rating, setRating] = useState(props.product.rating);
	const [img, setImg] = useState(props.product.img);

	const product = props.product;
	const isShowCart = props.isShowCart;
	const handleAddToCart = async (id) => {
		console.log("adding to cart");
		await props.dispatch(addProductToCart(id));
	};
	const handleRemoveFromCart = (id) => {
		console.log("removing from cart");
		props.dispatch(removeProductFromCart(id));
	};
	const handleDeleteBtn = (id) => {
		console.log("Product delete");
		props.dispatch(deleteProduct(id));
	};
	const handleEdit = () => {
		setIsEditable(true);
	};
	const handleCancelEdit = () => {
		setIsEditable(false);
	};

	const setValuesBeforeSubmit = () => {
		const submitData = {};
		if (name !== "") {
			submitData.name = name;
		}
		if (description !== "") {
			submitData.description = description;
		}
		if (price !== "") {
			submitData.price = price;
		}
		if (rating !== "") {
			submitData.rating = String(rating);
		}
		if (img !== "") {
			submitData.img = img;
		}
		console.log("submitData: ", submitData);
		return submitData;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const submitData = setValuesBeforeSubmit();
		fetch(`${JSON_API_URL}/${product.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(submitData),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success PUT:", data);
				props.dispatch(editProduct(data));
				setIsEditable(false);
				toast.success("Product added to cart!", toastStyle);
			})
			.catch((error) => {
				console.error("Error:", error);
				toast.erroe("Error while editing product", toastStyle);
			});
	};

	if (isEditable) {
		return (
			<li>
				<div className="product-card" style={{ backgroundColor: "black", color: "white" }}>
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
						<h3>
							<textarea
								value={name}
								onChange={(e) => setName(e.target.value)}
								style={{ width: "80%" }}></textarea>
						</h3>
						<h5>
							Rs.{" "}
							<input
								type="number"
                                min={0}
								value={price}
								onChange={(e) => setPrice(e.target.value)}></input>
						</h5>
						<h6>
							Rating:{" "}
							<input
								type="number"
								max={5}
								min={1}
								value={rating}
								onChange={(e) => setRating(e.target.value)}></input>
							/5
						</h6>
					</div>
					<div className="card-description">
						<p>
							<textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								style={{ width: "100%", height: "100px" }}></textarea>
						</p>
						<hr></hr>
						<div className="card-edit-btns">
							<button onClick={handleCancelEdit}>Cancel</button>
							<button onClick={handleSubmit}>Save Changes</button>
						</div>
					</div>
				</div>
			</li>
		);
	}

	return (
		<li>
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
						{/* <NavLink
							to={`/editProduct/${product.id}`}
							state={{ id: product.id }}>
							<span className="card-edit-btn">
								<i className="fa-solid fa-pencil"></i>
							</span>
						</NavLink> */}
						<span className="card-edit-btn" onClick={handleEdit}>
							<i className="fa-solid fa-pencil"></i>
						</span>
						<span
							className="card-delete-btn"
							onClick={() => handleDeleteBtn(product.id)}>
							<i className="fa-solid fa-trash-can"></i>
						</span>
						{isShowCart ? (
							<span
								className="Remove-from-cart-btn brown"
								onClick={() => handleRemoveFromCart(product.id)}>
								Remove from Cart
							</span>
						) : (
							<span
								className="Add-to-cart-btn"
								onClick={() => handleAddToCart(product.id)}>
								Add to Cart
							</span>
						)}
					</div>
				</div>
			</div>
		</li>
	);
}
