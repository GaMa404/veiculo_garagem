//import $ from "jquery";

$(() => {
	window.api.send("toMain", {
		command: "getVehicles",
		type: "veiculo"
	});
});

window.api.receive("fromMain", (data) => {
	loadPage(data);
});

function loadPage(data) {
	data.veiculos.forEach((v) => {
		let vehicleContent = `
		<div class="vehicle">
			<h3 class="pk">%id%</h3>
			<h3>%marca%</h3>
			<h3>%modelo%</h3>
			<h3>%fabricante%</h3>
			<h3>%ano%</h3>
			<h3>%cor%</h3>
		</div>`;

		vehicleContent = vehicleContent.replace("%id%", v.veiculo_id);
		vehicleContent = vehicleContent.replace("%marca%", v.marca_descricao);
		vehicleContent = vehicleContent.replace("%modelo%", v.modelo);
		vehicleContent = vehicleContent.replace("%fabricante%", v.fabricante);
		vehicleContent = vehicleContent.replace("%ano%", v.ano);
		vehicleContent = vehicleContent.replace("%cor%", v.cor);

		let elem = 
		`
		<div class="vehicle-columns">
			<div class="vehicle-columns-header">
				<h3>ID</h3>
				<h3>Marca</h3>
				<h3>Modelo</h3>
				<h3>Fabricante</h3>
				<h3>Ano</h3>
				<h3>Cor</h3>
			</div>

			${vehicleContent}
		</div>`;

		$(".vehicle-list").append(elem);
	});

	$(".pk").on("click", (e) => {
		location.href = "../form/form.html?id=" + (e.target.innerHTML)
	});

	$("#btn-new-vehicle").on("click", (e) => {
		location.href = "../form/form.html";
	});
}