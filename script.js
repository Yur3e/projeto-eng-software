const suporteBtn = document.getElementById("suporteBtn"); 
const chatBox = document.getElementById("chatBox");
const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Abrir/fechar chat
suporteBtn.addEventListener("click", () => {
    chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
    if (chatBox.style.display === "flex") {
        chatBody.innerHTML = "";
        addMessage("👋 Olá! Sou o assistente de suporte. Como posso te ajudar?", "bot-msg");
        setTimeout(showOptions, 1500);
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
    setTimeout(() => {
        addMessage("Entendido! Selecione uma das opções abaixo:", "bot-msg");
        showOptions();
    }, 800);
}

function addMessage(text, className) {
    const msg = document.createElement("div");
    msg.classList.add(className);
    msg.innerHTML = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Mostra opções
function showOptions() {
    const options = [
        "📘 FAQ - Dúvidas Frequentes",
        "💬 Chat com Atendimento",
        "📄 Manual do Usuário",
        "🎫 Abrir Ticket",
        "📋 Ver Tickets em Andamento"
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

// Opções
function handleOption(option) {
    addMessage(`Você selecionou: ${option}`, "user-msg");

    if (option.includes("Abrir Ticket")) {
        setTimeout(() => {
            addMessage("📝 Preencha os campos abaixo para abrir o ticket:", "bot-msg");
            showTicketForm();
        }, 800);
    }

    else if (option.includes("Ver Tickets")) {
        setTimeout(() => {
            addMessage("🔍 Para consultar seus tickets, informe os dados abaixo:", "bot-msg");
            showConsultaForm();
        }, 800);
    }

    else {
        setTimeout(() => {
            addMessage("💬 Em breve um atendente irá te ajudar nessa opção.", "bot-msg");
        }, 800);
    }
}

// === FORMULÁRIO DE ABERTURA DE TICKET ===
function showTicketForm() {
    const formDiv = document.createElement("div");
    formDiv.classList.add("ticketchat");
    formDiv.innerHTML = `
        <label>Nome completo:</label>
        <input type="text" id="ticketNome" placeholder="Digite seu nome completo">

        <label>Número de telefone:</label>
        <input type="tel" id="ticketTelefone" placeholder="(DDD) 99999-9999">

        <label>Descrição do problema:</label>
        <textarea id="ticketDescricao" placeholder="Descreva o que está acontecendo..."></textarea>

        <label>Anexo:</label>
        <input type="file" id="ticketAnexo">

        <button id="enviarTicket">📨 Enviar Ticket</button>
    `;

    chatBody.appendChild(formDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    document.getElementById("enviarTicket").addEventListener("click", () => {
        const nome = document.getElementById("ticketNome").value.trim();
        const telefone = document.getElementById("ticketTelefone").value.trim();
        const descricao = document.getElementById("ticketDescricao").value.trim();

        if (!nome || !telefone || !descricao) {
            addMessage("⚠️ Por favor, preencha todos os campos obrigatórios.", "bot-msg");
            return;
        }

        addMessage("✅ Ticket enviado com sucesso! Nossa equipe entrará em contato em breve.", "bot-msg");
        formDiv.remove();
    });
}

// === FORMULÁRIO DE CONSULTA ===
function showConsultaForm() {
    const formDiv = document.createElement("div");
    formDiv.classList.add("ticketchat");
    formDiv.innerHTML = `
        <label>Nome completo:</label>
        <input type="text" id="consultaNome" placeholder="Digite seu nome completo">

        <label>Número de telefone:</label>
        <input type="tel" id="consultaTelefone" placeholder="(DDD) 99999-9999">

        <button id="consultarTicket">🔍 Consultar Tickets</button>
    `;

    chatBody.appendChild(formDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    document.getElementById("consultarTicket").addEventListener("click", () => {
        const nome = document.getElementById("consultaNome").value.trim();
        const telefone = document.getElementById("consultaTelefone").value.trim();

        if (!nome || !telefone) {
            addMessage("⚠️ Por favor, informe seu nome completo e telefone.", "bot-msg");
            return;
        }

        addMessage(`📄 Buscando tickets para <b>${nome}</b> (${telefone})...`, "bot-msg");

        setTimeout(() => {
            const id = Math.floor(Math.random() * 90000) + 10000;
            const descricaoExemplo = [
                "A limpeza do refeitório não está sendo realizada adequadamente."
            ];
            const desc = descricaoExemplo[Math.floor(Math.random() * descricaoExemplo.length)];

            // Status Amarelo (Resolução)
            const ticketHtml = `
                <div class="ticket-card" style="border-left: 5px solid #ffc107; background: #fff8e1; padding: 10px; border-radius: 8px; margin-top: 8px;">
                    <b>🎫 ID do Ticket:</b> #${id}<br>
                    <b>🟡 Status:</b> <span style="color:#e0a800;">Em resolução</span><br>
                    <b>Problema:</b> Problema com a limpeza do refeitório.<br>
                    <b>Descrição:</b> ${desc}<br>
                    <b>Última atualização:</b> ${new Date().toLocaleString()}
                </div>
            `;

            addMessage(ticketHtml, "bot-msg");
            formDiv.remove();
        }, 1200);
    });
}
