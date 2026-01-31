import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";
import { obterCookie } from "./utils/cookies.js";

const socket = io("/usuarios", {
  auth: {
    token: obterCookie("tokenJwt"),
  },
});

socket.on("connect_error", (erro) => {
  Toastify({
    text: erro.toString(),
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#dc3545",
  }).showToast();
  setTimeout(() => {
    window.location.href = "/login/index.html";
  }, 1500);
});

socket.emit("obter_documentos", (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  });
});

function emitirAdicionarDocumento(nome) {
  socket.emit("adicionar_documento", nome);
}

socket.on("adicionar_documento_interface", (nome) => {
  inserirLinkDocumento(nome);
});

socket.on("documento_existente", (nome) => {
  Toastify({
    text: `O documento ${nome} já existe!`,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#ffc107",
  }).showToast();
});

socket.on("excluir_documento_sucesso", (nome) => {
  removerLinkDocumento(nome);
});

export { emitirAdicionarDocumento };
