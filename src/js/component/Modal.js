import React, { useState, useEffect, useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const Modal = props => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState();

	const deleteFetch = () => {
		fetch("https://assets.breatheco.de/apis/fake/contact/" + store.index, {
			method: "DELETE"
		})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/nicolas703")
					.then(res => {
						console.log(res.status);
						console.log(res.text);
						return res.json();
					})
					.then(data => {
						actions.agregarContact(data);
					})
					.catch(error => console.error("el error", error));
			})
			.catch(error => console.error(error));
		props.onClose();
	};

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<p>Warning: unknown consequences after this point... Kidding!</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary">
							Oh no!
						</button>
						<button
							type="button"
							className="btn btn-secondary"
							onClick={() => {
								deleteFetch();
								const mensaje = "Contacto eliminado con éxito.";
								alert(mensaje);
							}}
							data-dismiss="modal">
							Do it!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null
};
