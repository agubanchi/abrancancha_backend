const BASE_END_POINT = '/players';

//-----------------------------------------------------------------------------
// Suponiendo que tienes un botón en tu HTML con el ID "botonConsulta"
const botonConsulta = document.getElementById('botonConsulta');

// Asignar la función como manejador de eventos al hacer clic en el botón
botonConsulta.addEventListener('click', consultarPlayers);

// Definición de la función consultarPlayers
async function consultarPlayers() {
  try {
    const response = await fetch(BASE_END_POINT);
    if (!response.ok) {
      console.log('consultarPlayers.error.response', response);
    }
    const data = await response.json();
    // console.log("consultarPlayers");
    actualizarTabla(data);
  } catch (error) {
    console.log('consultarPlayers.error.catch', error);
  }
}

//-----------------------------------------------------------------------------
// Función para actualizar la tabla con los datos de las players
function actualizarTabla(players) {
  const tabla = document
    .getElementById('tabla')
    .getElementsByTagName('tbody')[0];
  tabla.innerHTML = '';

  players.forEach((player) => {
    const row = tabla.insertRow();
    const cellId = row.insertCell(0);
    const cellNombre = row.insertCell(1);
    const cellApellido = row.insertCell(2);
    const cellEmail = row.insertCell(3);
    const cellTelefono = row.insertCell(4);
    const cellCategoria = row.insertCell(5);
    const cellAvatar = row.insertCell(6);

    cellId.innerHTML = player.id;
    cellNombre.innerHTML = player.nombre;
    cellApellido.innerHTML = player.apellido;
    cellEmail.innerHTML = player.email;
    cellTelefono.innerHTML = player.telefono;
    cellCategoria.innerHTML = player.categoria;
    cellAvatar.innerHTML = `<img src="${player.avatar}" alt="${player.nombre}">`;
  });
  // let infoCOntainer = document.getElementById("info");
  // let tablePlayers = document.getElementById("tabla").getElementsByTagName('tbody')[0]
  // // eliminar todos los hijos
  // data.forEach(player => {
  //     const playerElement = document.createElement('p')
  //     playerElement.textContent = "\n" + player.id + player.nombre + " " +
  //         player.apellido + " " + player.email + " "
  //         + player.telefono + " " + player.categoria + " " + player.avatar;
  //     tablePlayers.appendChild(playerElement);
  // });
}
//-----------------------------------------------------------------------------
// Array para almacenar las players
// const players = [];
document.getElementById('addPlayer').addEventListener('click', addPlayer);
// Función para agregar una player a la tabla
async function addPlayer() {
    const nombre = String( document.getElementById("nombre").value.trim());
    const apellido = String(document.getElementById("apellido").value.trim());
    const email = String(document.getElementById("email").value.trim());
    const telefono = Number(document.getElementById("telefono").value.trim());
    const categoria = Number(document.getElementById("categoria").value.trim());
    // const avatar = `https://i.pravatar.cc/300?img=${id}`;

    // Crear objeto de player
    //  const pp:player = new Player(nombre, apellido, email, telefono, categoria, avatar);
    const player = { nombre, apellido, email, telefono, categoria }; //, avatar
    // const checkFormEnabled = document.getElementById("checkForm").value
    const checkFormEnabled = true;
    if (checkFormEnabled && !isValidForm(player)) return
console.log(JSON.stringify(player));
    // Agregar player al array
    // players.push(player);
    try {
        const response = await fetch(BASE_END_POINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(player),
        });
        if (!response.ok) {
            console.log("addPlayer.error.response", response);
        }
    } catch (error) {
        console.log("addPlayer.error.catch", error);
    }

  // Limpiar el formulario
  document.getElementById('formulario').reset();
  // Actualizar la tabla
  consultarPlayers();
  // actualizarTabla();
}

function isValidForm({ nombre, apellido, email, telefono, categoria }) {
    let soloLetrasRegex = /^[A-Za-z]+$/;
    // let soloEmailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let soloEmailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
// console.log(nombre, "-",apellido, "-", email,  "-",telefono,  "-",categoria);
    const errorMessage = document.getElementById("errorMessage")
    errorMessage.innerText = ""
    if (nombre === '') errorMessage.innerText += "El nombre no puede estar vacio.\n"
    else if (!soloLetrasRegex.test(nombre)) errorMessage.innerText += "El nombre solo acepta caracteres alfabeticos.\n";
    
    if (apellido === '') errorMessage.innerText += "El apellido no puede estar vacio.\n";
    else if (!soloLetrasRegex.test(apellido)) errorMessage.innerText += "El apellido solo acepta caracteres alfabeticos.\n";
    
    if (email === '') errorMessage.innerText += "El email no puede estar vacio.\n";
    else if (!soloEmailRegex.test(email)) errorMessage.innerText += "No es un email válido.\n";

    if (telefono === 0) errorMessage.innerText += "El telefono no puede estar vacio.\n";
    else if (isNaN(telefono)) errorMessage.innerText += "El telefono solo acepta numeros.\n";

    if (categoria === 0) errorMessage.innerText += "La categoria no puede estar vacia.\n";
    else if (isNaN(categoria)) errorMessage.innerText += "La categoria solo acepta numeros.\n";

    if (errorMessage.innerText !== "") {
        errorMessage.innerText = "Corregir los siguientesError: \n" + errorMessage.innerText;
        return false
    }
    return true

    // if (
    //     nombre.trim() === '' ||
    //     apellido.trim() === '' ||
    //     email.trim() === '' ||
    //     telefono.trim() === '' ||
    //     categoria.trim() === '' ||
    //     isNaN(categoria)
    // ) {
    //     // Muestra un mensaje de error si algún campo está vacío o la categoría no es un número
    //     alert("Por favor, complete todos los campos correctamente.");
    // } else {


}