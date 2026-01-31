import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://root:root123@socket.j3dqxsy.mongodb.net/"
);

let documentosColecao, usuariosColecao;

try {
  await cliente.connect();

  const db = cliente.db("websockets");
  documentosColecao = db.collection("documentos");
  usuariosColecao = db.collection("usuarios");

  console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
  console.log(erro);
}

export { documentosColecao, usuariosColecao };
