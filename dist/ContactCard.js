import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import MikePhoto from "../../img/m101.jpg";
import { Context } from "../store/appContext";

export const ContactCard = props => {
	const [state, setState] = useState({
		//initialize state here
		input: ""
	});
	const { store, actions } = useContext(Context);

	return (
		<>
			{!!store.contacto &&
				store.contacto.map((item, index) => {
					return (
						<li className="list-group-item" key={index}>
							<div className="row w-100">
								<div className="col-12 col-sm-6 col-md-3 px-0">
									<img
										src={MikePhoto}
										alt={item.full_name}
										className="rounded-circle mx-auto d-block img-fluid"
									/>
								</div>
								<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
									<div className=" float-right">
										<button
											className="btn"
											onClick={e => {
												console.log(e);
											}}>
											<Link to={"/edit/" + item.id}>
												<i className="fas fa-pencil-alt mr-3" />
											</Link>
										</button>
										<button
											className="btn"
											onClick={() => {
												actions.indexDelEliminar(item.id);
												props.onDelete();
											}}>
											<i className="fas fa-trash-alt" />
										</button>
									</div>
									<label className="name lead">{item.full_name}</label>
									<br />
									<i className="fas fa-map-marker-alt text-muted mr-3" />
									<span className="text-muted">{item.address}</span>
									<br />
									<span
										className="fa fa-phone fa-fw text-muted mr-3"
										data-toggle="tooltip"
										title=""
										data-original-title="(870) 288-4149"
									/>
									<span className="text-muted small">{item.phone}</span>
									<br />
									<span
										className="fa fa-envelope fa-fw text-muted mr-3"
										data-toggle="tooltip"
										data-original-title=""
										title=""
									/>
									<span className="text-muted small text-truncate">{item.email}</span>
								</div>
							</div>
						</li>
					);
				})}
		</>
	);
};

/**
 * Define the data-types for
 * your component's properties
 **/
ContactCard.propTypes = {
	history: PropTypes.object,
	onDelete: PropTypes.func
};

/**
 * Define the default values for
 * your component's properties
 **/
ContactCard.defaultProps = {
	onDelete: null
};
