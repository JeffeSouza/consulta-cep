function limparForm() {
    document.querySelector("#cep").value = "";
    document.querySelector("#rua").value = "";
    document.querySelector("#bairro").value = "";
    document.querySelector("#cidade").value = "";
    document.querySelector("#estado").value = "";
}

document.querySelector("#btn-limpar").addEventListener("click", () => {
    limparForm();
});

document.querySelector("#btn-consultar").addEventListener("click", () => {
    var cep = document.querySelector("#cep").value;
    document.querySelector(".message").textContent = "";

    if (!validCep(cep)) {
        document.querySelector("#cep").setAttribute("class", "error");
        document.querySelector(".message").textContent =
            "Informe um CEP válido";
        limparForm();
        return false;
    }

    document.querySelector("#cep").removeAttribute("class");
    $.ajax({
        url: "https://viacep.com.br/ws/" + cep + "/json/",
        dataType: "json",
        success: function (data) {
            if (data.erro) {
                document.querySelector("#cep").setAttribute("class", "error");
                document.querySelector(".message").textContent =
                    "Ops, erro ao consultar este cep!";
                return;
            }
            document.querySelector("#rua").value = data.logradouro;
            document.querySelector("#bairro").value = data.bairro;
            document.querySelector("#cidade").value = data.localidade;
            document.querySelector("#estado").value = data.uf;
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("error: " + textStatus);
        },
    });
});

function validCep(cep) {
    cep = cep.replace("-", "");
    cep = cep.replace(/[^0-9]/gi, "");
    if (cep.length == 8) {
        return true;
    }
    return false;
}
