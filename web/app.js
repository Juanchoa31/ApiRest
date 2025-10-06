const API_URL = "http://localhost:8080/api";

// ✅ Cargar la lista de personas cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", loadPersons);

// ======================
// 📌 Cargar todas las personas
// ======================
function loadPersons() {
    fetch(`${API_URL}/person`)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener personas");
            return res.json();
        })
        .then(data => {
            const tbody = document.getElementById("personList"); // 👈 ajustado
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

// ======================
// 📌 Crear o actualizar persona
// ======================
function createOrUpdatePerson() {
    const id = document.getElementById("personId").value;
    const name = document.getElementById("name").value.trim();
    const userName = document.getElementById("userName").value.trim();

    if (!name || !userName) {
        showMessage("❌ Campos vacíos", true);
        return;
    }

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
        showMessage("✅ Persona guardada correctamente");
        clearForm();
        loadPersons();
    })
    .catch(error => {
        console.error("Error:", error);
        showMessage("⚠️ Error al guardar persona", true);
    });
}

// ======================
// 📌 Editar persona
// ======================
function editPerson(person) {
    document.getElementById("personId").value = person.id;
    document.getElementById("name").value = person.name;
    document.getElementById("userName").value = person.userName || "";
}

// ======================
// 📌 Eliminar persona
// ======================
function deletePerson(id) {
    if (confirm("¿Deseas eliminar esta persona?")) {
        fetch(`${API_URL}/person/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) throw new Error("Error al eliminar persona");
            showMessage("🗑️ Persona eliminada correctamente");
            loadPersons();
        })
        .catch(error => {
            console.error("Error:", error);
            showMessage("⚠️ Error al eliminar persona", true);
        });
    }
}

// ======================
// 📌 Limpiar formulario
// ======================
function clearForm() {
    document.getElementById("personId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("userName").value = "";
}

// ======================
// 📌 Mostrar mensajes de estado
// ======================
function showMessage(message, isError = false) {
    const msgBox = document.getElementById("messageBox");

    // Reinicia cualquier temporizador previo
    clearTimeout(msgBox.hideTimeout);

    msgBox.textContent = message;
    msgBox.style.display = "block";
    msgBox.style.backgroundColor = isError ? "#f8d7da" : "#d4edda";
    msgBox.style.color = isError ? "#721c24" : "#155724";

    // Oculta después de 3 segundos, siempre igual
    msgBox.hideTimeout = setTimeout(() => {
        msgBox.style.display = "none";
    }, 1000);
}

