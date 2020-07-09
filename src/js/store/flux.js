const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			contact: null,
			index: null
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			getContacts: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/nicolas703")
					.then(res => {
						console.log(res.status);
						console.log(res.text);
						return res.json();
					})
					.then(data => setStore({ contact: data }))
					.catch(error => console.error(error));
			},

			indexDelEliminar: e => {
				setStore({ index: e });
			},
			agregarContact: data => {
				setStore({ contact: data });
			}
		}
	};
};

export default getState;
