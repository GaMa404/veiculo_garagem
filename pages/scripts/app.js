window.api.receive("fromMain", (data) => {
	loadPage(data);
});

function loadPage(res) {
	$(() => {
		const addVeiculoForm = $("#add-veiculo-form");

		const selectMarca = $("#select-marca");
		const txtModelo = $("#txt-modelo");
		const txtFabricante = $("#txt-fabricante");
		const selectTipo = $("#select-tipo");
		const txtAno = $("#txt-ano");
		const selectCombustivel = $("#select-combustivel");
		const txtCor = $("#txt-cor");
		const txtNumeroChassi = $("#txt-numero-chassi");
		const txtQuilometragem = $("#txt-quilometragem");

		const chkRevisao = $("#chk-revisao");
		const chkSinistro = $("#chk-sinistro");
		const chkRouboFurto = $("#chk-roubo-furto");
		const chkAluguel = $("#chk-aluguel");
		const chkVenda = $("#chk-venda");
		const chkParticular = $("#chk-particular");

		const txtObservacoes = $("#txt-observacoes");
		const btnCadastrar = $("#btn-cadastrar");

		res.marcas.forEach(m => {
			selectMarca.append(new Option(m.descricao, m.id, false, false));
		})

		res.tipos.forEach(t => {
			selectTipo.append(new Option(t.descricao, t.id, false, false));
		})

		res.combustiveis.forEach(c => {
			selectCombustivel.append(new Option(c.descricao, c.id, false, false))
		});

		selectMarca.on('change', (e) => {
			console.log(e);
			const marca = res.marcas.find(m => m.id == e.target.value);

			txtFabricante.val(marca.fabricante);
		});

		// const selects = [selectMarca, selectTipo, selectCombustivel];

		// selects.forEach((select) => {
		// 	select.children().each((index, element) => {
		// 		console.log(element.getAttribute("default") != null);
		// 	});
		// });

		addVeiculoForm.on("submit", () => {

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
		});
	})
}