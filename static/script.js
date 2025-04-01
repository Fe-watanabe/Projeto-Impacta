
document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", async function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const agendamentoId = event.target.dataset.id;

            const confirmDelete = confirm("Tem certeza que deseja excluir este agendamento?");
            if (!confirmDelete) return;

            try {
                const response = await fetch(`/delete/${agendamentoId}`, {
                    method: "POST",
                });

                const result = await response.json();

                if (result.success) {
                    document.querySelector(`#row-${agendamentoId}`).remove();
                    alert("Agendamento excluído com sucesso!");
                } else {
                    alert("Erro ao excluir o agendamento.");
                }
            } catch (error) {
                console.error("Erro ao excluir:", error);
            }
        }
    });
});

// Novo código para a animação de sucesso e limpeza do formulário
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('agendamentoForm');
    const sucessoMensagem = document.getElementById('sucessoMensagem');

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Previne o envio do formulário tradicional

        const formData = new FormData(form);

        try {
            const response = await fetch("/agendar", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                sucessoMensagem.style.display = 'block';
                sucessoMensagem.classList.add('animacaoSucesso');

                // Limpa os dados do formulário após 2 segundos
                setTimeout(function () {
                    form.reset();
                    sucessoMensagem.style.display = 'none';
                }, 2000); 
            } else {
                alert("Erro ao salvar o agendamento.");
            }
        } catch (error) {
            console.error("Erro ao enviar dados:", error);
            alert("Erro ao enviar dados.");
        }
    });
});

