const BASE_END_POINT = '/players';
document.addEventListener('DOMContentLoaded', () => {
    consultarPlayers();
});
//-----------------------------------------------------------------------------
async function consultarPlayers() {
    try {
        const response = await fetch(BASE_END_POINT);
        if (!response.ok) {
            console.log("consultarPlayers.error.response", response);
        }
        const data = await response.json();
        // console.log("consultarPlayers");
        actualizarTabla(data);
    }
    catch (error) {
        console.log("consultarPlayers.error.catch", error);
    }
}
//-----------------------------------------------------------------------------
// Función para actualizar la tabla con los datos de las players
function actualizarTabla(players) {
    const tabla = document.getElementById("tabla").getElementsByTagName('tbody')[0];
    tabla.innerHTML = "";

    players.forEach(player => {
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
document.getElementById("addPlayer").addEventListener('click', addPlayer);
// Función para agregar una player a la tabla
async function addPlayer() {
    // const id = players.length + 1;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const telefono = Number(document.getElementById("telefono").value);
    const categoria = Number(document.getElementById("categoria").value);
    // const avatar = `https://i.pravatar.cc/300?img=${id}`;

    // Crear objeto de player
    //  const pp:player = new Player(nombre, apellido, email,        telefono, categoria, avatar);
    const player = { nombre, apellido, email, telefono, categoria }; //, avatar

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
    document.getElementById("formulario").reset();
    // Actualizar la tabla
    consultarPlayers()
    // actualizarTabla();
}