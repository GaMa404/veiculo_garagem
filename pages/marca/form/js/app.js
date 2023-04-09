$(() => {

	$("#listar-marcas").on("click", () => {
	 	window.location.href = "../lista/listar.html";
	});

	let queryString = location.search;
	
	const urlParams = new URLSearchParams(queryString);

	let id = urlParams.get("id");

	let updateId;
	if (id)
		$("#codigo-marca").val(id);

	updateId = $("#codigo-marca").val();

	let editMarca = $("#codigo-marca").val() != "";

	console.log(editMarca);
	console.log(updateId);

	if (editMarca)
	{
		window.api.send("toMain", {
			command: "getDataToEdit",
			type: "marca",
			data: $("#codigo-marca").val()
		});
	} else {
		window.api.send("toMain", {
			command: "addMarca"
		});
	}
});

window.api.receive("fromMain", (args) => {
	console.log(args);
	switch (args.command)
	{
		case "dataToUpdate":
			loadPageToUpdate(args.data, args.auxiliarData);
		break;

		case "newMarca":
			loadPage();
		break;

		default:
			break;
	}
});

function loadPageToUpdate(marca) {
	$("#codigo-marca").val(marca.id);
	$("#txt-marca").val(marca.descricao);
	$("#txt-fabricante").val(marca.fabricante);
	
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

		let marca = {};
		formItems.forEach((formItem) => {
			marca[formItem.column] = formItem.value;
		});

		console.log(marca);

		if ($("#codigo-marca").val())
		{
			window.api.send("toMain", {
				command: "update",
				type: "marca",
				data: marca
			});
		} else {
			window.api.send("toMain", {
				command: "insert",
				type: "marca",
				data: marca
			});
		}
		window.location.href = "../lista/listar.html";
	});
}

function loadPage() {
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

		let marca = {};

		formItems.forEach((formItem) => {
			marca[formItem.column] = formItem.value;
		});

		window.api.send("toMain", {
			command: "insert",
			type: "marca",
			data: marca
		});

		window.location.href = "../lista/listar.html";
	});
}