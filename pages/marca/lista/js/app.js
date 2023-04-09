//import $ from "jquery";

$(() => {
	window.api.send("toMain", {
		command: "getMarcas",
		type: "marca"
	});
});

window.api.receive("fromMain", (data) => {
	console.log(data);
	loadPage(data);
});

function loadPage(data) {
	data.marcas.forEach((m) => {
		let marcasContent = `
		<div class="marcas">
			<h3 class="pk">%id%</h3>
			<h3>%marca%</h3>
			<h3>%fabricante%</h3>
		</div>`;

		marcasContent = marcasContent.replace("%id%", m.id);
		marcasContent = marcasContent.replace("%marca%", m.descricao);
		marcasContent = marcasContent.replace("%fabricante%", m.fabricante);

		let elem = 
		`
		<div class="marcas-columns">
			<div class="marcas-columns-header">
				<h3>ID</h3>
				<h3>Marca</h3>
				<h3>Fabricante</h3>
			</div>

			${marcasContent}
		</div>`;

		$(".marcas-list").append(elem);
	});

	$(".pk").on("click", (e) => {
		location.href = "../form/form.html?id=" + (e.target.innerHTML)
	});

	$("#btn-new-marca").on("click", (e) => {
		location.href = "../form/form.html";
	});

	$("#inicial").on("click", () => {
		window.location.href = "../../inicial/index.html";
	});
}