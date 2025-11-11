const classificacao = document.getElementById("classificacao");
const emailInst = document.getElementById("emailInstBox");
const emailComum = document.getElementById("emailComumBox");
const telefone = document.getElementById("telefoneBox");
const matricula = document.getElementById("matriculaBox");

classificacao.addEventListener("change", function () {
    const valor = this.value;

    // Oculta tudo primeiro
    emailInst.style.display = "none";
    emailComum.style.display = "none";
    telefone.style.display = "none";
    matricula.style.display = "none";

    // Exibe conforme classificação
    if (valor === "aluno" || valor === "professor") {
        emailInst.style.display = "block";
        matricula.style.display = "block";
    } else if (valor === "terceirizado") {
        emailComum.style.display = "block";
        telefone.style.display = "block";
    }
});
