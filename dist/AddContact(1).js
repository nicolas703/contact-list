import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
	const [data, setData] = useState();
	const { store, actions } = useContext(Context);

	const nuevosDatos = e => {
		e.preventDefault();
		console.log("recarga", data);
		console.log("https://assets.breatheco.de/apis/fake/contact/");

		fetch("https://assets.breatheco.de/apis/fake/contact/", {
			method: "POST",
			body: JSON.stringify(data),
			headers: { "content-Type": "application/json" }
		})
			.then(res => {
				console.log(res.ok);
				console.log(res.status);
				console.log(res.text);
				console.log("Hola ESTO SE ENVIO:", data);
				return res.json();
			})
			.then(data => {
				console.log(data);
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/Agenda_de_jose_lorant")
					.then(res => {
						console.log(res.status);
						console.log(res.text);
						return res.json();
					})
					.then(data => {
						actions.agregarContact(data);
					})
					.catch(error => console.error("error ", error));
			})
			.catch(error => {
				console.error("error ", error);
			});
	};

	const cambiarInput = e => {
		setData({
			...data,
			[e.target.name]: e.target.value,
			agenda_slug: "Agenda_de_jose_lorant"
		});
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form
					onSubmit={e => {
						nuevosDatos(e);
						const mensaje = "Felicidades Se Agrego Con Exito!!! vuelva a la pantalla principal";
						alert(mensaje);
					}}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							onChange={cambiarInput}
							className="form-control"
							name="full_name"
							placeholder="Full Name"
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							onChange={cambiarInput}
							className="form-control"
							name="email"
							placeholder="Enter email"
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							onChange={cambiarInput}
							className="form-control"
							name="phone"
							placeholder="Enter phone"
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							onChange={cambiarInput}
							className="form-control"
							name="address"
							placeholder="Enter address"
						/>
					</div>
					<button type="submit" className="btn btn-primary form-control">
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

export const EditContact = props => {
	const [data, setData] = useState();
	const { store, actions, setStore } = useContext(Context);
	useEffect(() => {
		setData(store.contacto.find(item => item.id == props.match.params.theid));
	}, []);

	const enviardatos = e => {
		console.log("recarga", data);
		console.log("https://assets.breatheco.de/apis/fake/contact/" + data.id);

		fetch("https://assets.breatheco.de/apis/fake/contact/" + data.id, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: { "content-Type": "application/json" }
		})
			.then(res => {
				console.log(res.ok);
				console.log(res.status);
				console.log(res.text);
				console.log("Hola ESTO SE ENVIO:", data);
				return res.json();
			})
			.then(data => {
				console.log(data);
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/Agenda_de_jose_lorant")
					.then(res => {
						console.log(res.status);
						console.log(res.text);
						return res.json();
					})
					.then(data => {
						actions.agregarContact(data);
					})
					.catch(error => console.error("error ", error));
			})
			.catch(error => {
				console.error("error ", error);
			});
		e.preventDefault();
		console.log("listo");
	};

	const cambiarInput = e => {
		setData({
			...data,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className="container">
			{data == undefined ? null : (
				<div>
					<h1 className="text-center mt-5">Edit your contact</h1>
					<form
						onSubmit={e => {
							enviardatos(e);
							const mensaje = "Felicidades Se Edito Con Exito!!! vuelva a la pantalla principal";
							alert(mensaje);
						}}>
						<div className="form-group">
							<label>Full Name</label>
							<input
								type="text"
								className="form-control"
								name="full_name"
								placeholder="Full Name"
								value={data.full_name}
								onChange={cambiarInput}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								className="form-control"
								name="email"
								placeholder="Enter email"
								onChange={cambiarInput}
								value={data.email}
							/>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input
								type="phone"
								className="form-control"
								name="phone"
								placeholder="Enter phone"
								onChange={cambiarInput}
								value={data.phone}
							/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input
								type="text"
								className="form-control"
								name="address"
								placeholder="Enter address"
								onChange={cambiarInput}
								value={data.address}
							/>
						</div>
						<button type="submit" className="btn btn-primary form-control">
							save
						</button>
						<Link className="mt-3 w-100 text-center" to="/">
							or get back to contacts
						</Link>
					</form>
				</div>
			)}
		</div>
	);
};

EditContact.propTypes = {
	match: PropTypes.object
};
