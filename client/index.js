const BASE_END_POINT = '/players';

//-----------------------------------------------------------------------------
// Suponiendo que tienes un botón en tu HTML con el ID "botonConsulta"
const botonConsulta = document.getElementById('botonConsulta');
//Boton borrar que va a estar implementado en la tabla//
const botonBorrar=document.getElementById('botonBorrar');
//Boton Modificar o editar usuario metodo PUT //
const botonEditar=document.getElementById('botonEditar');

// Asignar la función como manejador de eventos al hacer clic en el botón
botonConsulta.addEventListener('click', consultarPlayers);
botonBorrar.addEventListener('click', borrarJugador);
botonEditar.addEventListener('click', editarJugadorEnFront);


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
    const cellAcciones = row.insertCell(7);

    cellId.innerHTML = player.id;
    cellNombre.innerHTML = player.nombre;
    cellApellido.innerHTML = player.apellido;
    cellEmail.innerHTML = player.email;
    cellTelefono.innerHTML = player.telefono;
    cellCategoria.innerHTML = player.categoria;
    cellAvatar.innerHTML = `<img src="${player.avatar}" alt="${player.nombre}">`;
    
    // Agregamos los botones "Editar" y "Borrar"
    cellAcciones.innerHTML = `
    <button class="btn btn-primary botonEditar" data-player-id="${player.id}">Editar</button>
    <button class="btn btn-danger botonBorrar" data-player-id="${player.id}">Borrar</button>`;
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
  // const id = players.length + 1;
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const telefono = Number(document.getElementById('telefono').value);
  const categoria = Number(document.getElementById('categoria').value);
  // const avatar = `https://i.pravatar.cc/300?img=${id}`;

  // Crear objeto de player
  //  const pp:player = new Player(nombre, apellido, email,        telefono, categoria, avatar);
  const player = { nombre, apellido, email, telefono, categoria }; //, avatar

  // Agregar player al array
  // players.push(player);
  try {
    const response = await fetch(BASE_END_POINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player),
    });
    if (!response.ok) {
      console.log('addPlayer.error.response', response);
    }
  } catch (error) {
    console.log('addPlayer.error.catch', error);
  }

  // Limpiar el formulario
  document.getElementById('formulario').reset();
  // Actualizar la tabla
  consultarPlayers();
  // actualizarTabla();
}

// Definir los manejadores de eventos para los botones "Editar" y "Borrar"
document.addEventListener('click', async (event) => {
  if (event.target && event.target.classList.contains('botonEditar')) {
    // Obtener el ID del jugador desde el botón de "Editar"
    const playerId = event.target.getAttribute('data-player-id');
    // Llamar a la función para editar el jugador con el ID playerId
    editarJugador(playerId);
  }
  if (event.target && event.target.classList.contains('botonBorrar')) {
    // Obtener el ID del jugador desde el botón de "Borrar"
    const playerId = event.target.getAttribute('data-player-id');
    // Llamar a la función para borrar el jugador con el ID playerId
    await borrarJugador(playerId); // Agregar el await aquí
  }
});

//Funcion Borrar Player implementacion//  Nicolas-Mansilla
// Función para borrar un jugador
async function borrarJugador() { // Cambio aquí
  // Obtener el ID del jugador desde el botón //
  const playerId = event.target.getAttribute('data-player-id');

  try {
    const response = await fetch(`${BASE_END_POINT}/${playerId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.log('borrarJugador.error.response', response);
    } else {
      console.log(`Jugador con ID ${playerId} borrado con éxito.`);
      // Actualizar la tabla después de borrar el jugador
      consultarPlayers();
    }
  } catch (error) {
    console.log('borrarJugador.error.catch', error);
  }
}

// Función para editar un jugador en el frontend
async function editarJugador(playerId) {
  // Obtener el jugador que se va a editar de la tabla
  const filaJugador = document.getElementById(`fila-jugador-${playerId}`);
  const celdas = filaJugador.getElementsByTagName('td');
  const nombre = celdas[1].innerText;
  const apellido = celdas[2].innerText;
  const email = celdas[3].innerText;
  const telefono = celdas[4].innerText;
  const categoria = celdas[5].innerText;

  // Crear un objeto con los datos del jugador
  const jugadorActualizado = {
    nombre,
    apellido,
    email,
    telefono,
    categoria,
  };

  // Llamar a la función para editar el jugador en el servidor
  try {
    await editarJugadorEnServidor(playerId, jugadorActualizado);
    console.log(`Jugador con ID ${playerId} actualizado en el servidor.`);
    // Actualizar la tabla después de editar el jugador
    consultarPlayers();
  } catch (error) {
    console.error('Error al actualizar el jugador en el servidor:', error);
  }
}