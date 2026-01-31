import { obterCookie } from "../utils/cookies.js";
import {
  alertarERedirecionar,
  atualizarInterfaceUsuarios,
  atualizaTextoEditor,
  tratarAutorizacaoSucesso,
} from "./documento.js";

const socket = io("/usuarios", {
  auth: {
    token: obterCookie("tokenJwt"),
  },
});

socket.on("autorizacao_sucesso", tratarAutorizacaoSucesso);

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

function selecionarDocumento(dadosEntrada) {
  socket.emit("selecionar_documento", dadosEntrada, (texto) => {
    atualizaTextoEditor(texto);
  });
}

socket.on("usuario_ja_no_documento", () => {
  Toastify({
    text: "Documento já aberto em outra página.",
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#ffc107",
  }).showToast();
  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
});

socket.on("usuarios_no_documento", atualizarInterfaceUsuarios);

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
