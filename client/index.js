// import eliminarPlayer from "./fetchs.js";
const BASE_END_POINT = '/players';
const CONTENT_TYPE_APPLICATION_JSON = { 'Content-Type': 'application/json' };
// const ERRORS_HANDLING = {
//   ConnectionError: (msg) => showUIError(msg),
//   ValidationPlayerError: (msg) => showUIModalValidation(msg)
// }
//-----------------------------------------------------------------------------
document.getElementById('searchPlayer').addEventListener('click', async () => {
  const searchParam = String(document.getElementById('searchField').value.trim());
  try {
    const response = await fetch(`${BASE_END_POINT}?name=${searchParam}`);
    if (!response.ok) {
      console.log('searchField.error.response', response);
    }
    const data = await response.json();
    // console.log("consultarPlayers");
    actualizarTabla(data);
  } catch (error) {
    console.log('searchField.error.catch', error);
  }
});
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
// Función para agregar una player a la tabla
document.getElementById('addPlayer').addEventListener('click', (event) => {
  const nombre = String(document.getElementById('nombre').value.trim());
  const apellido = String(document.getElementById('apellido').value.trim());
  const email = String(document.getElementById('email').value.trim());
  const telefono = Number(document.getElementById('telefono').value.trim());
  const categoria = Number(document.getElementById('categoria').value.trim());

  const player = { nombre, apellido, email, telefono, categoria }; //, avatar
  // // const checkFormEnabled = document.getElementById("checkForm").value
  // const checkFormEnabled = true;
  // if (checkFormEnabled && !isValidForm(player)) return;
  // // Agregar player al array
  // // players.push(player);
  // agregarPlayer(player)

  // // Limpiar el formulario
  // document.getElementById('formulario').reset();
  // // Actualizar la tabla
  // consultarPlayers();
  // // actualizarTabla();
  try {
    validatePlayer(player)
    agregarPlayer(player)
    // Limpiar el formulario
    document.getElementById('formulario').reset();
    // Actualizar la tabla
    consultarPlayers();
    // actualizarTabla();
  } catch (e) {
    // const handler = ERRORS_HANDLING[e.name]
    // handler ? handler(e.errorMessage) : console.log(e.errorMessage);

    // if (e instanceof ConnectionError) {
    //   //retry after a ffew seconds
    //   // setTimeout(() => { validateUser({ name, age, email }) })
    //   showUIError(e);
    // }
    if (e instanceof ValidationPlayerError) {
      showUIModalValidation(e);
    }
    else showUIError(e);
  }
})
// function showUIConectionError(e) {
function showUIError(e) {
  // const errorMessage = document.getElementById('errorMessage');
  // errorMessage.innerText = e.errorMessage;
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: e.errorMessage,
  });
}

function showUIModalValidation(e) {
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.innerText = e.errorMessage;
  // Swal.fire({
  //   icon: 'error',
  //   title: 'Datos invalidos',
  //   text: e.errorMessage,
  // });
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
//-----------------------------------------------------------------------------
// Función para actualizar la tabla con los datos de las players
function actualizarTabla(players) {
  // const players = await consultarPlayers();
  const tabla = document
    .getElementById('tabla').getElementsByTagName('tbody')[0];
  tabla.innerHTML = '';
  // console.log("table refresh");
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

  // const tab = document.getElementById('tabla');
  // const editButtons = tab.querySelectorAll('.edit');

  // editButtons.forEach((button) => {
  //   button.addEventListener('click', () => {
  //              
  //           const row = button.closest('tr');
  //           const cells = row.querySelectorAll('td');
  //           const playerId = Number(button.getAttribute('data-player-id'));
  //
  //     // handleEdit(event)      
  //
  //     // guardarBoton.addEventListener('click', () =>  handleSaveModifications());
  //     guardarBoton.addEventListener('click', () => {//handleSaveModifications()
  //       const playerId = Number(event.target.getAttribute('data-player-id'));
  //       const updatedUser = {
  //         id: playerId,
  //         nombre: document.getElementById('nombreEdit').value,
  //         apellido: document.getElementById('apellidoEdit').value,
  //         email: document.getElementById('emailEdit').value,
  //         telefono: Number(document.getElementById('telEdit').value),
  //         categoria: Number(document.getElementById('catEdit').value),
  //       };
  //       // const checkFormEnabled = true;
  //       // if (checkFormEnabled && !isValidForm(player)) return;
  //
  //       actualizarPlayer(updatedUser)
  //       // alert(`${updatedUser.id}\n${updatedUser.nombre}\n${updatedUser.apellido}\n${updatedUser.email}\n${updatedUser.categoria}\n`);
  //       // alert(`${BASE_END_POINT}/${playerId}`);
  //     });
  //   });
  // });
  //
  // const viewButtons = tab.querySelectorAll('.view');
  //
  // viewButtons.forEach((button) => {
  //   button.addEventListener('click', () => {
  //     const playerId = button.getAttribute('data-player-id');
  //     const player = players.find((p) => p.id === parseInt(playerId));
  //
  //     if (player) {
  //       const nombreView = document.getElementById('nombreView');
  //       nombreView.textContent = player.nombre;
  //
  //       const apellidoView = document.getElementById('apellidoView');
  //       apellidoView.textContent = player.apellido;
  //
  //       const emailView = document.getElementById('emailView');
  //       emailView.textContent = player.email;
  //
  //       const telView = document.getElementById('telView');
  //       telView.textContent = player.telefono;
  //
  //       const catView = document.getElementById('catView');
  //       catView.textContent = player.categoria;
  //
  //       const avatarView = document.getElementById('avatarView');
  //       avatarView.innerHTML = `<img src="${player.avatar}" alt="${player.nombre}">`;
  //     } else {
  //       console.error(`Player with ID ${playerId} not found`);
  //     }
  //   });
  // });
}
// Event listener para el botón "Borrar" en cada fila de la tabla
document.addEventListener('click', function (event) {
  const btn = event.target.closest('button');
  if (btn === null) return

  if (btn.classList.contains('view')) handleView(event)
  else if (btn.classList.contains('edit')) handleEdit(event)
  else if (btn.classList.contains('botonBorrar')) {
    // const playerId = event.target.getAttribute('data-player-id');
    const playerId = btn.getAttribute('data-player-id');
    handleDelete(playerId)
  }
});

document.getElementById('saveEdit').addEventListener('click', (event) => /*  handleSaveModifications() */ {
  // const playerId = Number(event.target.getAttribute('data-player-id'));
  const updatedUser = {
    id: Number(event.target.getAttribute('data-player-id')),
    nombre: document.getElementById('nombreEdit').value,
    apellido: document.getElementById('apellidoEdit').value,
    email: document.getElementById('emailEdit').value,
    telefono: Number(document.getElementById('telEdit').value),
    categoria: Number(document.getElementById('catEdit').value)
  };

  // const checkFormEnabled = true;
  // if (checkFormEnabled && !isValidForm(player)) return;

  actualizarPlayer(updatedUser)
  // alert(`${updatedUser.id}\n${updatedUser.nombre}\n${updatedUser.apellido}\n${updatedUser.email}\n${updatedUser.categoria}\n`);
  // alert(`${BASE_END_POINT}/${playerId}`);
});
//-----------------------------------------------------------------------------
function handleView(event) {
  const row = event.target.closest('tr');
  const cells = row.querySelectorAll('td');
  // const playerId = Number(event.target.getAttribute('data-player-id'));
  // function handleView(btn) {
  // const row = btn.closest('tr');
  // const cells = row.querySelectorAll('td');
  // const playerId = Number(btn.getAttribute('data-player-id'));

  const playerId = Number(cells[0].textContent);
  const player = {
    nombre: cells[1].textContent,
    apellido: cells[2].textContent,
    email: cells[3].textContent,
    tel: cells[4].textContent,
    cat: cells[5].textContent
  }

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
    // avatarView.innerHTML = `<img src="${player.avatar}" alt="${player.nombre}">`;
  } else {
    console.error(`Player with ID ${playerId} not found`);
  }
}

function handleEdit(event) {
  const row = event.target.closest('tr');
  const cells = row.querySelectorAll('td');
  const playerId = Number(cells[0].textContent);

  document.getElementById('nombreEdit').textContent = cells[1].textContent;
  document.getElementById('apellidoEdit').textContent = cells[2].textContent;
  document.getElementById('emailEdit').textContent = cells[3].textContent;
  document.getElementById('telEdit').textContent = cells[4].textContent;
  document.getElementById('catEdit').textContent = cells[5].textContent;

  const guardarBoton = document.getElementById('saveEdit');
  guardarBoton.setAttribute('data-player-id', playerId)
}

function handleDelete(playerId) {
  if (playerId) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: "Esta accion no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      /* confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33', */
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) eliminarPlayer(playerId);
    })
    // if (Swal.fire('Atencion!', '¿Estás seguro de que quieres eliminar este jugador?', 'success',))
    // if (confirm('¿Estás seguro de que quieres eliminar este jugador?')) {
    //   eliminarPlayer(playerId);
    // }
  }
}
//-----------------------------------------------------------------------------
// FETCHs
async function agregarPlayer(newPlayer) {
  try {
    const response = await fetch(`${BASE_END_POINT}`, {
      method: 'POST',
      headers: CONTENT_TYPE_APPLICATION_JSON,
      body: JSON.stringify(newPlayer),
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
}

async function actualizarPlayer(updatedPlayer) {
  // console.log({updatedPlayer});
  try {
    const response = await fetch(`${BASE_END_POINT}/${updatedPlayer.id}`, {
      method: 'PUT',
      headers: CONTENT_TYPE_APPLICATION_JSON,
      body: JSON.stringify(updatedPlayer),
    })
    if (response.ok) {
      Swal.fire(
        'Jugador Actualizado',
        'El jugador fue Actualizado con éxito',
        'success',
      );
      // Actualizar la tabla después de eliminar
      consultarPlayers();
    } else {
      Swal.fire("Error", 'No se pudo actualizar al jugador', 'error');
      // Swal.fire(response.error, response.errorMessage, 'error');
    }
  } catch (error) {
    console.log('actualizarPlayer.error.catch', error);
  }
}

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