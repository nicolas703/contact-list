const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacto: null,
			//Your data structures, A.K.A Entities
			index: null
		},
		actions: {
			getFetchContact: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/Agenda_de_jose_lorant")
					.then(res => {
						console.log(res.status);
						console.log(res.text);
						return res.json();
						console.log("se devolvio");
					})
					.then(data => setStore({ contacto: data }))
					.catch(error => console.error("error ", error));
			},
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			indexDelEliminar: e => {
				setStore({ index: e });
			},
			agregarContact: data => {
				setStore({ contacto: data });
			}
		}
	};
};

export default getState;
