const { BrowserWindow, ipcMain, dialog } = require("electron");
const { CombustivelModel } = require("./model/CombustivelModel");
const { MarcaModel } = require("./model/MarcaModel");
const { TipoModel } = require("./model/TipoModel");
const { VeiculoModel } = require("./model/VeiculoModel");

const path = require("path");
const fs = require("fs");
const strip = require("strip-comments");
const { DatabaseHelper } = require("./helper/DatabaseHelper");

// Função responsável por renderizar a interface.
const createWindow = () => {

	// Criando uma nova instância de BrowserWindow, ou seja, a janela da nossa aplicação.
	const win = new BrowserWindow({
		title: "FormVeiculo",
		width: 1024,
		height: 768,
		center: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
			spellcheck: false,
		},
		roundedCorners: true,
		darkTheme: false,
	});

	//win.setMenu(null);

	// Renderizando o arquivo listar.html na janela.
	win.loadFile(path.join("./pages/inicial", "index.html"));

	ipcMain.on("toMain", async (event, args) => {
		switch (args.command) {

			case "sqlToRestore":
				const result = await dialog.showOpenDialog(win, {
					properties: ['openFile'],
				});

				if (!result.canceled) {
					const dumpFile = result.filePaths[0];

					fs.readFile(dumpFile, 'utf8', async (err, data) => {
						if (err) {
							console.error('Erro ao ler o arquivo de dump:', err);
							return;
						}
						const mysql = require("mysql2");

						const conn = mysql.createConnection({
							host: 'localhost',
							port: 3307,
							user: 'root',
							password: 'Lcs6141$',
							database: "db_garagem",
						});
						
						function splitSQLCommands(sql) {
							const commands = [];
							let command = '';
						  
							const lines = sql.split('\n');
							lines.forEach(line => {
							  // Remove espaços em branco extras no início e no final da linha
							  line = line.trim();
						  
							  // Ignora comentários e linhas vazias
							  if (line.startsWith('--') || line === '') {
								return;
							  }
						  
							  // Adiciona a linha atual ao comando
							  command += line + '\n';
						  
							  // Verifica se o comando está completo
							  if (line.endsWith(';')) {
								// Remove o ponto e vírgula final
								command = command.slice(0, -1);
						  
								// Adiciona o comando completo ao array de comandos
								commands.push(command);
						  
								// Limpa o comando para o próximo
								command = '';
							  }
							});
						  
							return commands;
						}

						let commands = splitSQLCommands(data);

						commands.forEach(cmd => {

							conn.query(cmd, (err, res, fields) => {
								if (err)
								{
									console.error('Erro ao restaurar o dump:', err);
								} else {
									console.log('Dump restaurado com sucesso!')
								}
							})
						})
					});
				}
				break;

			case "newBackup":
				const mysqlDump = require("mysqldump").default;

				mysqlDump({
					connection: {
						host: 'localhost',
						port: 3307,
						user: 'root',
						password: 'Lcs6141$',
						database: 'db_garagem'
					},
					dumpToFile: path.join(__dirname, `dumps\\dump.sql`),
				}).then(() => {
					// Ler o conteúdo do arquivo de dump
					const dumpContent = fs.readFileSync(path.join(__dirname, `dumps\\dump.sql`), 'utf8');

					// Remover os comentários do dump
					const dumpWithoutComments = strip(dumpContent);

					let lines = dumpWithoutComments.split('\n');

					lines = lines.filter((line, index) => {
						return !line.startsWith(";") && line != "" && !line.startsWith("#");
					})

					// Sobrescrever o arquivo de dump com o conteúdo sem comentários
					fs.writeFileSync(path.join(__dirname, `dumps\\dump.sql`), lines.join("\n"));

					console.log('Dump gerado com sucesso!');
				})
				.catch((error) => {
					console.error('Erro ao gerar o dump:', error);
				});

				break;

			case "getData":
				win.webContents.send("fromMain", {
					command: "newVehicle",
					combustiveis: await CombustivelModel.getCombustiveis(),
					marcas: await MarcaModel.getMarcas(),
					tipos: await TipoModel.getTipos(),
					veiculos: await VeiculoModel.getVeiculos()
				});

				break;

			case "getVehicles":

				win.webContents.send("fromMain", {
					veiculos: await VeiculoModel.getVeiculos(),
				});

				break;

			case "getMarcas":

				win.webContents.send("fromMain", {
					marcas: await MarcaModel.getMarcas(),
				});

				break;

			case "getTipos":

				win.webContents.send("fromMain", {
					tipos: await TipoModel.getTipos(),
				});

				break;

			case "getCombustiveis":

				win.webContents.send("fromMain", {
					combustiveis: await CombustivelModel.getCombustiveis(),
				});

				break;

			case "addMarca":
				win.webContents.send("fromMain", {
					command: "newMarca"
				})
				break;

			case "addTipo":
				win.webContents.send("fromMain", {
					command: "newTipo"
				});
				break;

			case "addCombustivel":
				win.webContents.send("fromMain", {
					command: "newCombustivel"
				});
				break;

			case "getDataToEdit":
				if (args.type == "veiculo") {
					let veiculo = await VeiculoModel.getVeiculoById(args.data);

					let auxiliarData = {
						combustiveis: await CombustivelModel.getCombustiveis(),
						marcas: await MarcaModel.getMarcas(),
						tipos: await TipoModel.getTipos(),
					};

					win.webContents.send("fromMain", {
						command: "dataToUpdate",
						data: veiculo,
						auxiliarData: auxiliarData
					});
				}
				else if (args.type == "marca") {
					let marca = await MarcaModel.getMarcaById(args.data);

					console.log(marca);

					win.webContents.send("fromMain", {
						command: "dataToUpdate",
						data: marca
					});
				}
				else if (args.type == "tipo") {
					console.log(args);
					let tipo = await TipoModel.getTipoById(args.data);

					console.log(tipo);

					win.webContents.send("fromMain", {
						command: "dataToUpdate",
						data: tipo
					});
				}
				else if (args.type == "combustivel") {
					let combustivel = await CombustivelModel.getCombustivelById(args.data);

					win.webContents.send("fromMain", {
						command: "dataToUpdate",
						data: combustivel
					});
				}

				break;


			default:
				break;
		}
	})
}

module.exports = {
	createWindow
}