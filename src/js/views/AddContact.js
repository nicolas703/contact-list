import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
	const [state, setState] = useState();
	const { store, actions } = useContext(Context);

	const nuevosDatos = e => {
		e.preventDefault();
		console.log("se mandó", state);
		console.log("https://assets.breatheco.de/apis/fake/contact/");

		fetch("https://assets.breatheco.de/apis/fake/contact/", {
			method: "POST",
			body: JSON.stringify(state),
			headers: { "content-Type": "application/json" }
		})
			.then(r => {
				console.log(r.ok);
				console.log(r.status);
				console.log(r.text);
				console.log("enviaste:", state);
				return r.json();
			})
			.then(data => {
				console.log(data);
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/nicolas703")
					.then(res => {
						console.log(res.status);
						console.log(res.text);
						return res.json();
					})
					.then(data => {
						actions.agregarContact(data);
						console.log("round 2", data);
					})
					.catch(error => console.error("error ", error));
			})
			.catch(error => {
				console.error("error ", error);
			});
	};

	const cambioInput = e => {
		setState({
			...state,
			[e.target.name]: e.target.value,
			agenda_slug: "nicolas703"
		});
	};

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form
					onSubmit={e => {
						nuevosDatos(e);
						const alerta = "Contacto agregado con exito, vuelve a la pantalla principal";
						alert(alerta);
					}}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							name="full_name"
							onChange={cambioInput}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							onChange={cambioInput}
							name="email"
							type="email"
							className="form-control"
							placeholder="Enter email"
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							onChange={cambioInput}
							name="phone"
							type="phone"
							className="form-control"
							placeholder="Enter phone"
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							onChange={cambioInput}
							type="text"
							name="address"
							className="form-control"
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

export const EditarContacto = props => {
	const [data, setData] = useState();
	const { store, actions, setStore } = useContext(Context);
	useEffect(() => {
		setData(store.contact.find(item => item.id == props.match.params.index));
	}, []);

	const sendData = e => {
		console.log(data);
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
				console.log("enviaste", data);
				return res.json();
			})
			.then(data => {
				console.log(data);
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/nicolas703")
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
							sendData(e);
							const mensaje = "Contacto editado con éxito, vuelva a la pantalla principal";
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

EditarContacto.propTypes = {
	match: PropTypes.object
};
