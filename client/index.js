const BASE_END_POINT = '/players';

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
    const cellAvatar = row.insertCell(6);
    const cellAcciones = row.insertCell(7);

    cellId.innerHTML = player.id;
    cellNombre.innerHTML = player.nombre;
    cellApellido.innerHTML = player.apellido;
    cellEmail.innerHTML = player.email;
    cellTelefono.innerHTML = player.telefono;
    cellCategoria.innerHTML = player.categoria;
    cellAvatar.innerHTML = `<img src="${player.avatar}" alt="${player.nombre}">`;
    cellAcciones.innerHTML = `<button type="button" class="edit btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" data-player-id="${player.id}">Edit</button>
  <button class="btn btn-danger botonBorrar" data-player-id="${player.id}">Borrar</button>
`;
  });
}
//-----------------------------------------------------------------------------
// Array para almacenar las players
// const players = [];
document.getElementById('addPlayer').addEventListener('click', addPlayer);
//-----------------------------------------------------------------------------
// document.getElementById('addPlayer').addEventListener('click', savePlayer);
// Función para guardar una player 
async function savePlayer() {
  /**REVISARLA---- FALTA COMPLETAR NO FUNCIONA---- TODAVIA */
  const nombre = String(document.getElementById('nombre').value.trim());
  const apellido = String(document.getElementById('apellido').value.trim());
  const email = String(document.getElementById('email').value.trim());
  const telefono = Number(document.getElementById('telefono').value.trim());
  const categoria = Number(document.getElementById('categoria').value.trim());
  const player = { nombre, apellido, email, telefono, categoria }; //, avatar

  //  ------DE DONDE SACO EL ID EDITADO ???????????????????
  const playerId = document.getElementById('addPlayer').value.trim();
  if (playerId === "") await addPlayer(player);
  await editarPlayer(playerId, player);
}
//-----------------------------------------------------------------------------
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
        headers: { 'Content-Type': 'application/json' },
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

  // ...

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

// Event listener para el botón "editar" en cada fila de la tabla
document.addEventListener('click', async function (event) {
  if (event.target.classList.contains('botonEditar')) {
    const playerId = event.target.getAttribute('data-player-id');
    /* confirm('¿Estás seguro de que quieres editar este jugador?') */
    if (
      playerId &&
      Swal.fire({
        title: 'Edicion',
        text: "¿Estás seguro de que quieres editar este jugador",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      })
    ) {
      try {
        const newData = obtenerNuevosDatos(playerId); // Implementa esta función para obtener los nuevos datos del jugador
        await editarPlayer(playerId, newData);
      } catch (error) {
        console.error(error);
        Swal.fire('Error', 'No se pudo editar al jugador', 'error');
      }
    }
  }
});

async function obtenerNuevosDatos(playerId) {
  try {
    const response = await fetch(`${BASE_END_POINT}/${playerId}`);
    if (response.ok) {
      // const tabla = document.getElementById('tabla').getElementsByTagName('tbody')[0];
      // tabla.forEach(row => {/**si la columna del id de la fila actual es la q busco copiar los datos y salir del for */      });
      const player = await response.json();
      document.getElementById('nombre').value = player.nombre;
      document.getElementById('apellido').value = player.apellido;
      document.getElementById('email').value = player.email;
      document.getElementById('telefono').value = player.telefono;
      document.getElementById('categoria').value = player.categoria;
      // TODO:  Actualizar el texto del boton y guardar el id en edicion.

    } else {
      Swal.fire(response.status, response.statusText, 'error');
    }
  } catch (error) {
    console.error(error);
  }
}

// Función para editar un jugador
async function editarPlayer(playerId, newData) {
  try {
    const response = await fetch(`${BASE_END_POINT}/${playerId}`, {
      method: 'PUT', // O utiliza 'PATCH' si solo quieres actualizar ciertos campos
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData), // newData debe ser un objeto con los datos a actualizar
    });

    if (response.ok) {
      Swal.fire(
        'Jugador editado',
        'Los datos del jugador fueron actualizados con éxito',
        'success',
      );
      // Actualizar la tabla después de editar
      consultarPlayers();
    } else {
      Swal.fire('Error', 'No se pudo editar al jugador', 'error');
    }
  } catch (error) {
    console.error(error);
    throw error; // Propaga el error para que el event listener lo maneje
  }
}