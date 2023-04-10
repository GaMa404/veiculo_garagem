$(() => {
	$(this).on("keyup", (key) => {
		if (key.code == "F5") {
			window.location.reload();
		}
	});
	
	$("#listar-combustiveis").on("click", () => {
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
		$("#codigo-combustivel").val(id);

	updateId = $("#codigo-combustivel").val();

	let editTipo = updateId != "";

	console.log(editTipo);
	console.log(updateId);

	if (editTipo)
	{
		window.api.send("toMain", {
			command: "getDataToEdit",
			type: "combustivel",
			data: updateId
		});

		$("#delete").css("display", "inline");

		$("#delete").on("click", () => {
			window.api.send("toMain", {
				command: "delete",
				type: "combustivel",
				data: updateId
			});

			window.location.href = "../lista/listar.html";
		});
	} else {
		window.api.send("toMain", {
			command: "addCombustivel"
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

		case "newCombustivel":
			loadPage();
		break;

		default:
			break;
	}
});

function loadPageToUpdate(combustivel) {
	$("#codigo-combustivel").val(combustivel.id);
	$("#txt-combustivel").val(combustivel.descricao);
	
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

		let combustivel = {};
		formItems.forEach((formItem) => {
			combustivel[formItem.column] = formItem.value;
		});

		console.log(combustivel);

		if ($("#codigo-combustivel").val())
		{
			window.api.send("toMain", {
				command: "update",
				type: "combustivel",
				data: combustivel
			});
		} else {
			window.api.send("toMain", {
				command: "insert",
				type: "combustivel",
				data: combustivel
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

		let combustivel = {};

		formItems.forEach((formItem) => {
			combustivel[formItem.column] = formItem.value;
		});

		window.api.send("toMain", {
			command: "insert",
			type: "combustivel",
			data: combustivel
		});

		window.location.href = "../lista/listar.html";
	});
}