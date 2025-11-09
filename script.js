const suporteBtn = document.getElementById("suporteBtn");
const chatBox = document.getElementById("chatBox");
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Abrir/fechar chat
suporteBtn.addEventListener("click", () => {
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
    if (chatBox.style.display === "flex") {
        chatBody.scrollTop = chatBody.scrollHeight;
        setTimeout(showOptions, 1500); // mostra as opções após a saudação
    }
});

// Enviar mensagem
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    addMessage(text, "user-msg");
    userInput.value = "";

    // Simulação de resposta do bot
    setTimeout(() => {
        addMessage("Entendido! Selecione uma das opções abaixo:", "bot-msg");
        showOptions();
    }, 800);
}

// Função para adicionar mensagens no chat
function addMessage(text, className) {
    const msg = document.createElement("div");
    msg.classList.add(className);
    msg.innerHTML = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Mostra opções do suporte
function showOptions() {
    const options = [
        "📘 FAQ - Dúvidas Frequentes",
        "💬 Chat com Atendimento",
        "📄 Manual do Usuário",
        "🎫 Abrir Ticket (prioritário)"
    ];

    const optionsDiv = document.createElement("div");
    optionsDiv.style.display = "flex";
    optionsDiv.style.flexDirection = "column";
    optionsDiv.style.gap = "6px";
    optionsDiv.style.marginTop = "10px";

    options.forEach(opt => {
        const btn = document.createElement("div");
        btn.classList.add("option");
        btn.textContent = opt;
        btn.addEventListener("click", () => handleOption(opt));
        optionsDiv.appendChild(btn);
    });

    chatBody.appendChild(optionsDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Ações ao clicar nas opções
function handleOption(option) {
    addMessage(`Você selecionou: ${option}`, "user-msg");

    if (option.includes("Ticket")) {
        setTimeout(() => {
            addMessage("Por favor, descreva o problema para abrir o ticket:", "bot-msg");
        }, 800);
    } else {
        setTimeout(() => {
            addMessage("Em breve um atendente irá te ajudar nessa opção.", "bot-msg");
        }, 800);
    }
}
