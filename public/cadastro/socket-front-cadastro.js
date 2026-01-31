const socket = io();

function emitirCadastrarUsuario(dados) {
  socket.emit("cadastrar_usuario", dados);
}

socket.on("cadastro_sucesso", () => {
  Toastify({
    text: "Cadastro realizado com sucesso!",
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#28a745",
  }).showToast();
  setTimeout(() => {
    window.location.href = "/login/index.html";
  }, 2000);
});
socket.on("cadastro_erro", () => {
  Toastify({
    text: "Erro no cadastro.",
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#dc3545",
  }).showToast();
});
socket.on("usuario_ja_existente", () => {
  Toastify({
    text: "Usuário já existe!",
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#ffc107",
  }).showToast();
});

export { emitirCadastrarUsuario };
