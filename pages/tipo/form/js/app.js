$(() => {
	$(this).on("keyup", (key) => {
		if (key.code == "F5") {
			window.location.reload();
		}
	});

	$("#listar-tipos").on("click", () => {
	 	window.location.href = "../lista/listar.html";
	});

	$("#inicial").on("click", () => {
		window.location.href = "../../inicial/index.html";
	});

	let queryString = location.search;
	
	const urlParams = new URLSearchParams(queryString);

	let id = urlParams.get("id");

	let updateId;
	if (id)
		$("#codigo-tipo").val(id);

	updateId = $("#codigo-tipo").val();

	let editTipo = $("#codigo-tipo").val() != "";

	console.log(editTipo);
	console.log(updateId);

	if (editTipo)
	{
		window.api.send("toMain", {
			command: "getDataToEdit",
			type: "tipo",
			data: $("#codigo-tipo").val()
		});

		$("#delete").css("display", "inline");

		$("#delete").on("click", () => {
			window.api.send("toMain", {
				command: "delete",
				type: "tipo",
				data: updateId
			});

			window.location.href = "../lista/listar.html";
		});
	} else {
		window.api.send("toMain", {
			command: "addTipo"
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

		case "newTipo":
			loadPage();
		break;

		default:
			break;
	}
});

function loadPageToUpdate(tipo) {
	$("#codigo-tipo").val(tipo.id);
	$("#txt-tipo").val(tipo.descricao);
	
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

		let tipo = {};
		formItems.forEach((formItem) => {
			tipo[formItem.column] = formItem.value;
		});

		console.log(tipo);

		if ($("#codigo-tipo").val())
		{
			window.api.send("toMain", {
				command: "update",
				type: "tipo",
				data: tipo
			});
		} else {
			window.api.send("toMain", {
				command: "insert",
				type: "tipo",
				data: tipo
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

		let tipo = {};

		formItems.forEach((formItem) => {
			tipo[formItem.column] = formItem.value;
		});

		window.api.send("toMain", {
			command: "insert",
			type: "tipo",
			data: tipo
		});

		window.location.href = "../lista/listar.html";
	});
}