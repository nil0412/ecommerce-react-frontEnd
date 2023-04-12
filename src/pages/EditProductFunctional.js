import { useState } from "react";
import { useParams } from "react-router-dom";
import { editProduct } from "../actions";
import { JSON_API_URL } from "../Constants";
import { ToastContainer, toast } from "react-toastify";
import { toastContainerStyle, toastStyle } from "../Constants";

export function EditProductFunctional(props) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [rating, setRating] = useState("3");
	const [img, setImg] = useState("");
	const [imgPreview, setImgPreview] = useState(false);

	const { productId } = useParams();

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
		if (img !== "") {
			submitData.img = img;
		}
		submitData.rating = rating;
		console.log(submitData);
		return submitData;
	};

	console.log("this.props: ", props);

	const handleSubmit = (e) => {
		e.preventDefault();
		const submitData = setValuesBeforeSubmit();
		fetch(`${JSON_API_URL}/${productId}`, {
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
				toast.success("Product added to cart!", toastStyle);
			})
			.catch((error) => {
				console.error("Error:", error);
				toast.erroe(("Error while editing product"), toastStyle);
			});
	};

	const handlePreview = (e) => {
		e.preventDefault();
		setImgPreview({
			imgPreview: true,
		});
	};

	const product = props.products.list.filter((product) => {
		return String(product.id) === productId;
	})[0];

	return (
		<div className="page-container">
			<div className="form-container">
				<form onSubmit={handleSubmit}>
					<h1>Edit Product</h1>
					<label htmlFor="name">
						Name: <span className="old-details">{product.name}</span>
					</label>
					<br />
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Product name"
						value={name}
						onChange={(e) => setName(e.target.value)}></input>
					<br />
					<label htmlFor="description">
						Description:{" "}
						<span className="old-details">{product.description}</span>
					</label>
					<br />
					<input
						type="text"
						id="description"
						name="description"
						placeholder="Product description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}></input>
					<br />
					<label htmlFor="price">
						Price: <span className="old-details">Rs. {product.price}</span>
					</label>
					<br />
					<input
						type="number"
						id="price"
						name="price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder="Price greater than or equals to 0"></input>
					<br />
					<label htmlFor="rating">
						Rating: <span className="old-details">{product.rating}/5</span>{" "}
						&nbsp; {rating}/5
					</label>
					<br />
					<input
						type="range"
						id="rating"
						name="rating"
						min={1}
						max={5}
						value={rating}
						onChange={(e) => setRating(e.target.value)}></input>
					<br />
					<label htmlFor="img">Product Image Link</label>
					<br />
					<img
						className="old-product-img"
						src={product.img}
						alt="Image does not exists"
					/>
					<img
						className={
							imgPreview
								? "product-img-preview show"
								: "product-img-preview hide"
						}
						src={img}
						alt="product img preview"
					/>
					<br />
					<input
						type="text"
						id="img"
						name="img"
						placeholder="https://images.unsplash.com/photo-1570198561490"
						value={img}
						onChange={(e) => setImg(e.target.value)}></input>
					<br />
					<button
						className="product-img-preview-btn btn"
						onClick={handlePreview}>
						Preview
					</button>
					<button className="submit-btn btn" type="submit">
						Save changes
						<ToastContainer style={toastContainerStyle} />
					</button>
					<br />
				</form>
			</div>
		</div>
	);
}
