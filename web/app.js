const API_URL = "http://localhost:8080/api";

document.addEventListener("DOMContentLoaded", loadPersons);

function loadPersons() {
    fetch(`${API_URL}/persons`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#personTable tbody");
            tbody.innerHTML = "";
            data.forEach(p => {
                const row = `
                    <tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.userName || ""}</td>
                        <td>
                            <button class="edit-btn" onclick='editPerson(${JSON.stringify(p)})'>Editar</button>
                            <button class="delete-btn" onclick='deletePerson(${p.id})'>Eliminar</button>
                        </td>
                    </tr>
                `;
                tbody.insertAdjacentHTML("beforeend", row);
            });
        })
        .catch(error => console.error("Error al cargar personas:", error));
}

function createOrUpdatePerson() {
    const id = document.getElementById("personId").value;
    const name = document.getElementById("name").value;
    const userName = document.getElementById("userName").value;

    const person = { id, name, userName };

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/person/${id}` : `${API_URL}/person`;

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en el guardado/actualización");
        clearForm();
        loadPersons();
    })
    .catch(error => console.error("Error:", error));
}


const id = document.getElementById("personId").value;
const name = document.getElementById("name").value;
const userName = document.getElementById("userName").value;

const person = {id, name, userName};

const method = id ? "PUT" : "POST";
const url = id ? `${API_URL}/person/${id}` : `${API_URL}/person`;

fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person)
})
.then(response => {
    if (!response.ok) throw new Error("Error en el guardado/actualización");
    clearForm();
    loadPersons();
})
.catch(error => console.error("Error:", error));

function editPerson(person) {
    document.getElementById("personId").value = person.id;
    document.getElementById("name").value = person.name;
    document.getElementById("userName").value = person.userName || "";
}

function deletePerson(id) {
    if (confirm("¿Deseas eliminar esta persona?")) {
        fetch(`${API_URL}/person/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al eliminar persona");
            loadPersons();
        })
        .catch(error => console.error("Error:", error));
    }
}

function clearForm() {
    document.getElementById("personId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("userName").value = "";
}