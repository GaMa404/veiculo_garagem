$(() => {
	window.api.send("toMain", {
		command: "getData"
	});
});

window.api.receive("fromMain", (data) => {
	loadPage(data);
});

function loadPage(res) {
	res.marcas.forEach(m => {
		selectMarca.append(new Option(m.descricao, m.id, false, false));
	})

	res.tipos.forEach(t => {
		selectTipo.append(new Option(t.descricao, t.id, false, false));
	})

	res.combustiveis.forEach(c => {
		selectCombustivel.append(new Option(c.descricao, c.id, false, false))
	});

	selectMarca.on('change', async (e) => {
		console.log(e);
		const marca = res.marcas.find(m => m.id == e.target.value);

		txtFabricante.val(marca.fabricante);
	});

	const selects = [selectMarca, selectTipo, selectCombustivel];

	selects.forEach((select) => {
		select.on('change', async (e) => {
			select.children().each((index, element) => {
				if (element.getAttribute("default") != null) {
					element.remove();
				};
			});
		});
	});

	addVeiculoForm.on("submit", async () => {

		let formItems = [];

		for (const item of $(".form-item")) {

			let children = item.children;

			for (let child of children) {
				if (child.tagName != "INPUT" && child.tagName != "SELECT") continue;

				formItems.push({
					column: child.getAttribute("db-column"),
					id: child.id,
					type: child.tagName,
					value: child.type == "checkbox" ? child.checked : child.value,
				});
			}

		};

		let veiculo = {};
		formItems.forEach((formItem) => {
			veiculo[formItem.column] = formItem.value;
		});

		window.api.send("toMain", {
			command: "insert",
			data: veiculo
		});

		window.location.reload();
	});
}