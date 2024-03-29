$(() => {
	$(this).on("keyup", (key) => {
		if (key.code == "F5") {
			window.location.reload();
		}
	});
	
	$("#listar-veiculos").on("click", () => {
		window.location.href = "../lista/listar.html";
	});

	$("#inicial").on("click", () => {
		window.location.href = "../../inicial/index.html";
	});

	let queryString = location.search;
	const urlParams = new URLSearchParams(queryString);

	let id = urlParams.get("id");

	$("#codigo-veiculo").val(id ?? "");

	let editVehicle = $("#codigo-veiculo").val() != "";

	if (editVehicle)
	{
		window.api.send("toMain", {
			command: "getDataToEdit",
			type: "veiculo",
			data: $("#codigo-veiculo").val()
		});

		$("#delete").css("display", "inline");

		$("#delete").on("click", () => {
			window.api.send("toMain", {
				command: "delete",
				type: "veiculo",
				data: id
			});

			window.location.href = "../lista/listar.html";
		});
	}
	else
	{
		window.api.send("toMain", {
			command: "getData",
			type: "veiculo"
		});
	}
});

window.api.receive("fromMain", (args) => {
	switch (args.command)
	{
		case "dataToUpdate": {
			loadPageToUpdate(args.data, args.auxiliarData);
			break;
		}

		case "newVehicle": {
			loadPage(args);
			break;
		}

		default:
			break;
	}
});

function loadPageToUpdate(vehicle, auxiliarData) {
	auxiliarData.marcas.forEach(m => {
		selectMarca.append(new Option(m.descricao, m.id, false, false));
	})

	auxiliarData.tipos.forEach(t => {
		selectTipo.append(new Option(t.descricao, t.id, false, false));
	})

	auxiliarData.combustiveis.forEach(c => {
		selectCombustivel.append(new Option(c.descricao, c.id, false, false))
	});

	selectMarca.on('change', async (e) => {
		console.log(e);
		const marca = auxiliarData.marcas.find(m => m.id == e.target.value);

		txtFabricante.val(marca.fabricante);
	});

	$("#codigo-veiculo").val(vehicle.veiculo_id);
	$("#txt-modelo").val(vehicle.modelo);
	$("#txt-fabricante").val(vehicle.fabricante);
	$("#txt-ano").val(vehicle.ano);
	$("#txt-cor").val(vehicle.cor);
	$("#txt-numero-chassi").val(vehicle.numero_chassi);
	$("#txt-quilometragem").val(vehicle.quilometragem);
	$("#txt-observacoes").val(vehicle.observacoes);

	$("#chk-revisao").prop("checked", vehicle.revisao);
	$("#chk-sinistro").prop("checked", vehicle.sinistro);
	$("#chk-roubo-furto").prop("checked", vehicle.roubo_furto);
	$("#chk-aluguel").prop("checked", vehicle.aluguel);
	$("#chk-venda").prop("checked", vehicle.venda);
	$("#chk-particular").prop("checked", vehicle.particular);

	$("#select-marca").val(vehicle.id_marca);
	$("#select-tipo").val(vehicle.id_tipo);
	$("#select-combustivel").val(vehicle.id_combustivel);

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

		console.log(veiculo);

		if ($("#codigo-veiculo").val())
		{
			window.api.send("toMain", {
				command: "update",
				type: "veiculo",
				data: veiculo
			});
		}
		else {
			window.api.send("toMain", {
				command: "insert",
				type: "veiculo",
				data: veiculo
			});
		}
		window.location.href = "../lista/listar.html";
	});
}

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
			type: "veiculo",
			data: veiculo
		});

		window.location.href = "../lista/listar.html";
	});
}