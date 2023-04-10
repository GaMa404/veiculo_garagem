//import $ from "jquery";

$(() => {
	$(this).on("keyup", (key) => {
		if (key.code == "F5") {
			window.location.reload();
		}
	});
	
	window.api.send("toMain", {
		command: "getCombustiveis",
		type: "tipo"
	});
});

window.api.receive("fromMain", (data) => {
	console.log(data);
	loadPage(data);
});

function loadPage({combustiveis}) {
	combustiveis.forEach((t) => {
		let combustiveisContent = `
		<div class="combustiveis">
			<h3 class="pk">%id%</h3>
			<h3>%descricao%</h3>
		</div>`;

		combustiveisContent = combustiveisContent.replace("%id%", t.id);
		combustiveisContent = combustiveisContent.replace("%descricao%", t.descricao);

		let elem = 
		`
		<div class="combustiveis-columns">
			<div class="combustiveis-columns-header">
				<h3>ID</h3>
				<h3>Descrição</h3>
			</div>

			${combustiveisContent}
		</div>`;

		$(".combustiveis-list").append(elem);
	});

	$(".pk").on("click", async (e) => {
		console.log(e.target.innerHTML);
		location.href = "../form/form.html?id=" + (e.target.innerHTML)
	});

	$("#btn-new-tipo").on("click", async (e) => {
		location.href = "../form/form.html";
	});

	$("#inicial").on("click", async () => {
		window.location.href = "../../inicial/index.html";
	});
}