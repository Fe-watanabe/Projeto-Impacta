document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = form.querySelector("button[type='submit']");
    const listarButton = document.querySelector("#btn-listar"); // Seleciona o botão de listar
    const messageBox = document.createElement("div");

    // Configuração do box de mensagens
    messageBox.id = "message-box";
    messageBox.style.display = "none";
    form.appendChild(messageBox);

    // Adiciona efeito de foco nos campos de entrada
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.border = "2px solid #007bff";
            input.style.transition = "border 0.3s ease";
        });

        input.addEventListener("blur", () => {
            input.style.border = "1px solid #ccc";
        });
    });

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Impede o comportamento padrão

        const formData = new FormData(form);
        submitButton.innerHTML = "Agendando...";
        submitButton.disabled = true;

        try {
            const response = await fetch("/", { 
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                showMessage("Agendamento realizado com sucesso!", "success");
                form.reset();
            } else {
                throw new Error("Erro ao agendar consulta.");
            }
        } catch (error) {
            showMessage(error.message, "error");
        } finally {
            submitButton.innerHTML = "Agendar";
            submitButton.disabled = false;
        }
    });

    // Garante que o botão de listar funcione corretamente
    if (listarButton) {
        listarButton.addEventListener("click", function () {
            window.location.href = "/consultas"; // Redireciona para a página de listagem
        });
    }

    // Função para exibir mensagens animadas
    function showMessage(text, type) {
        messageBox.textContent = text;
        messageBox.className = type;
        messageBox.style.display = "block";
        messageBox.style.opacity = "1";

        setTimeout(() => {
            messageBox.style.opacity = "0";
            setTimeout(() => {
                messageBox.style.display = "none";
            }, 500);
        }, 3000);
    }
});
