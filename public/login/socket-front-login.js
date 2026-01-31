import { definirCookie } from "../utils/cookies.js";

const socket = io();

function emitirAutenticarUsuario(dados) {
  socket.emit("autenticar_usuario", dados);
}

socket.on("autenticacao_sucesso", (tokenJwt) => {
  definirCookie("tokenJwt", tokenJwt);

  Toastify({
    text: "Usuário autenticado com sucesso!",
    duration: 2000,
    gravity: "top",
    position: "right",
    backgroundColor: "#28a745",
  }).showToast();
  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
});

socket.on("autenticacao_erro", () => {
  Toastify({
    text: "Erro na autenticação.",
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#dc3545",
  }).showToast();
});
socket.on("usuario_nao_encontrado", () => {
  Toastify({
    text: "Usuário não encontrado.",
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#dc3545",
  }).showToast();
});

export { emitirAutenticarUsuario };
