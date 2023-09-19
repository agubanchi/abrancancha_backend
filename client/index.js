/* eslint-disable prettier/prettier */
const BASE_END_POINT = '/players';
const CONTENT_TYPE_APPLICATION_JSON = { 'Content-Type': 'application/json' };
//-----------------------------------------------------------------------------
// Boton de consular tabla de Jugadores
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
    const cellAcciones = row.insertCell(6);

    cellId.innerHTML = player.id;
    cellNombre.innerHTML = player.nombre;
    cellApellido.innerHTML = player.apellido;
    cellEmail.innerHTML = player.email;
    cellTelefono.innerHTML = player.telefono;
    cellCategoria.innerHTML = player.categoria;

    cellAcciones.innerHTML = `<button type="button" class="edit btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-player-id="${player.id}"><i class="fa-regular fa-pen-to-square"></i></button>
  <button class="btn btn-danger botonBorrar" data-player-id="${player.id}"><i class="fa-solid fa-trash"></i></button>
  <button type="button" class="view btn btn-info" data-bs-toggle="modal" data-bs-target="#viewModal" data-player-id="${player.id}"><i class="fa-regular fa-eye" style="color:#fff"></i></button>
`;
  });
}
//-----------------------------------------------------------------------------
// Array para almacenar las players
// const players = [];
document.getElementById('addPlayer').addEventListener('click', addPlayer);
// Función para agregar una player a la tabla
async function addPlayer() {
  const nombre = String(document.getElementById('nombre').value.trim());
  const apellido = String(document.getElementById('apellido').value.trim());
  const email = String(document.getElementById('email').value.trim());
  const telefono = Number(document.getElementById('telefono').value.trim());
  const categoria = Number(document.getElementById('categoria').value.trim());

  const player = { nombre, apellido, email, telefono, categoria }; //, avatar
  // const checkFormEnabled = document.getElementById("checkForm").value
  const checkFormEnabled = true;
  if (checkFormEnabled && !isValidForm(player)) return;
  console.log(JSON.stringify(player));
  // Agregar player al array
  // players.push(player);
  try {
    const response = await fetch(BASE_END_POINT, {
      method: 'POST',
      headers: CONTENT_TYPE_APPLICATION_JSON,
      body: JSON.stringify(player),
    });
    if (response.ok) {
      Swal.fire(
        'Jugador agregado!',
        'El jugador fue agregado con éxito',
        'success',
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El jugador no pudo ser agregado con éxito',
      });
    }
  } catch (error) {
    console.error(error);
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
  let soloEmailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  // console.log(nombre, "-",apellido, "-", email,  "-",telefono,  "-",categoria);
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.innerText = '';
  if (nombre === '')
    errorMessage.innerText += 'El nombre no puede estar vacio.\n';
  else if (!soloLetrasRegex.test(nombre))
    errorMessage.innerText +=
      'El nombre solo acepta caracteres alfabeticos.\n';

  if (apellido === '')
    errorMessage.innerText += 'El apellido no puede estar vacio.\n';
  else if (!soloLetrasRegex.test(apellido))
    errorMessage.innerText +=
      'El apellido solo acepta caracteres alfabeticos.\n';

  if (email === '')
    errorMessage.innerText += 'El email no puede estar vacio.\n';
  else if (!soloEmailRegex.test(email))
    errorMessage.innerText += 'No es un email válido.\n';

  if (telefono === 0)
    errorMessage.innerText += 'El telefono no puede estar vacio.\n';
  else if (isNaN(telefono))
    errorMessage.innerText += 'El telefono solo acepta numeros.\n';

  if (categoria === 0)
    errorMessage.innerText += 'La categoria no puede estar vacia.\n';
  else if (isNaN(categoria))
    errorMessage.innerText += 'La categoria solo acepta numeros.\n';

  if (errorMessage.innerText !== '') {
    errorMessage.innerText =
      'Corregir los siguientes Errores: \n' + errorMessage.innerText;
    return false;
  }
  return true;
}

function isValidForm({ nombre, apellido, email, telefono, categoria }) {
  let soloLetrasRegex = /^[A-Za-z]+$/;
  // let soloEmailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  let soloEmailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  // console.log(nombre, "-",apellido, "-", email,  "-",telefono,  "-",categoria);
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.innerText = '';
  if (nombre === '')
    errorMessage.innerText += 'El nombre no puede estar vacio.\n';
  else if (!soloLetrasRegex.test(nombre))
    errorMessage.innerText +=
      'El nombre solo acepta caracteres alfabeticos.\n';

  if (apellido === '')
    errorMessage.innerText += 'El apellido no puede estar vacio.\n';
  else if (!soloLetrasRegex.test(apellido))
    errorMessage.innerText +=
      'El apellido solo acepta caracteres alfabeticos.\n';

  if (email === '')
    errorMessage.innerText += 'El email no puede estar vacio.\n';
  else if (!soloEmailRegex.test(email))
    errorMessage.innerText += 'No es un email válido.\n';

  if (telefono === 0)
    errorMessage.innerText += 'El telefono no puede estar vacio.\n';
  else if (isNaN(telefono))
    errorMessage.innerText += 'El telefono solo acepta numeros.\n';

  if (categoria === 0)
    errorMessage.innerText += 'La categoria no puede estar vacia.\n';
  else if (isNaN(categoria))
    errorMessage.innerText += 'La categoria solo acepta numeros.\n';

  if (errorMessage.innerText !== '') {
    errorMessage.innerText =
      'Corregir los siguientes Errores: \n' + errorMessage.innerText;
    return false;
  }
  return true;
}

// Event listener para el botón "Borrar" en cada fila de la tabla
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('botonBorrar')) {
    const playerId = event.target.getAttribute('data-player-id');
    if (playerId) {
      if (confirm('¿Estás seguro de que quieres eliminar este jugador?')) {
        eliminarPlayer(playerId);
      }
    }
  }
});

// Función para eliminar un jugador
async function eliminarPlayer(playerId) {
  try {
    const response = await fetch(`${BASE_END_POINT}/${playerId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      Swal.fire(
        'Jugador eliminado',
        'El jugador fue eliminado con éxito',
        'success',
      );
      // Actualizar la tabla después de eliminar
      consultarPlayers();
    } else {
      Swal.fire('Error', 'No se pudo eliminar al jugador', 'error');
    }
  } catch (error) {
    console.error(error);
  }
}

const tab = document.getElementById('tabla');
const editButtons = tab.querySelectorAll('.edit');

editButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    const playerId = button.getAttribute('data-player-id');

    const nombreElement = cells[1];
    const apellidoElement = cells[2];
    const emailElement = cells[3];
    const telElement = cells[4];
    const catElement = cells[5];

    const nombreInput = document.getElementById('nombreEdit');
    nombreInput.type = 'text';
    nombreInput.value = nombreElement.textContent;

    const apellidoInput = document.getElementById('apellidoEdit');
    apellidoInput.type = 'text';
    apellidoInput.value = apellidoElement.textContent;

    const emailInput = document.getElementById('emailEdit');
    emailInput.type = 'text';
    emailInput.value = emailElement.textContent;

    const telInput = document.getElementById('telEdit');
    telInput.type = 'tel';
    telInput.value = telElement.textContent;

    const catInput = document.getElementById('catEdit');
    catInput.type = 'number';
    catInput.value = catElement.textContent;

    const guardarBoton = document.getElementById('saveEdit');
    guardarBoton.textContent = 'Guardar';

    guardarBoton.addEventListener('click', () => {
      const updatedUser = {
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        email: emailInput.value,
        telefono: telInput.value,
        categoria: catInput.value,
      };

      fetch(`${BASE_END_POINT}/${playerId}`, {
        method: 'PATCH',
        headers: CONTENT_TYPE_APPLICATION_JSON,
        body: JSON.stringify(updatedUser),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire(
            'Jugador Actualizado',
            'El jugador fue Actualizado con éxito',
            'success',
          );
          consultarPlayers();
          nombreElement.textContent = updatedUser.nombre;
          apellidoElement.textContent = updatedUser.apellido;
          emailElement.textContent = updatedUser.email;
          telElement.textContent = updatedUser.telefono;
          catElement.textContent = updatedUser.categoria;
        })
        .catch((err) => console.log(err));
    });
  });
});

const viewButtons = tab.querySelectorAll('.view');

viewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const playerId = button.getAttribute('data-player-id');
    const player = players.find((p) => p.id === parseInt(playerId));

    if (player) {
      const nombreView = document.getElementById('nombreView');
      nombreView.textContent = player.nombre;

      const apellidoView = document.getElementById('apellidoView');
      apellidoView.textContent = player.apellido;

      const emailView = document.getElementById('emailView');
      emailView.textContent = player.email;

      const telView = document.getElementById('telView');
      telView.textContent = player.telefono;

      const catView = document.getElementById('catView');
      catView.textContent = player.categoria;

      const avatarView = document.getElementById('avatarView');
      avatarView.innerHTML = `<img src="${player.avatar}" alt="${player.nombre}">`;
    } else {
      console.error(`Player with ID ${playerId} not found`);
    }
  });
});

// // Event listener para el botón "editar" en cada fila de la tabla
// document.addEventListener('click', async function (event) {
//   if (event.target.classList.contains('botonEditar')) {
//     const playerId = event.target.getAttribute('data-player-id');
//     if (
//       playerId &&
//       confirm('¿Estás seguro de que quieres editar este jugador?')
//     ) {
//       try {
//         const newData = obtenerNuevosDatos(); // Implementa esta función para obtener los nuevos datos del jugador
//         await editarPlayer(playerId, newData);
//       } catch (error) {
//         console.error(error);
//         Swal.fire('Error', 'No se pudo editar al jugador', 'error');
//       }
//     }
//   }
// });

// // Función para editar un jugador
// async function editarPlayer(playerId, newData) {
//   try {
//     const response = await fetch(`${BASE_END_POINT}/${playerId}`, {
//       method: 'PUT', // O utiliza 'PATCH' si solo quieres actualizar ciertos campos
//       headers: CONTENT_TYPE_APPLICATION_JSON,
//       body: JSON.stringify(newData), // newData debe ser un objeto con los datos a actualizar
//     });

//     if (response.ok) {
//       Swal.fire(
//         'Jugador editado',
//         'Los datos del jugador fueron actualizados con éxito',
//         'success',
//       );
//       // Actualizar la tabla después de editar
//       consultarPlayers();
//     } else {
//       Swal.fire('Error', 'No se pudo editar al jugador', 'error');
//     }
//   } catch (error) {
//     console.error(error);
//     throw error; // Propaga el error para que el event listener lo maneje
//   }
// }