import { ValidationPlayerError } from "class-validator"
// import { ConnectionError,ValidationError } from "./errors"
import { ConnectionError } from "./errors"
//-----------------------------------------------------------------------------
// export const validatePlayer = ({ nombre, apellido, email, telefono, categoria }) => {
//     if (!nombre) throw new ValidationError('nombre is required')
//     if (!apellido) throw new ValidationError('apellido is required')
//     if (!email) throw new ValidationError('email is required')
//     if (!telefono) throw new ValidationError('telefono is required')
//     if (!categoria) throw new ValidationError('categoria is required')
// }

// const validateUser = ({ name, age, email } = {}) => {
//     if (!name) throw new ValidationError('name is required')
//     if (!age) throw new ValidationError('age is required')
//     if (!email) throw new ValidationError('email is required')

//     try {
//         // mongodb.connect()
//     } catch (error) {
//         throw new ConnectionError('database is not available')
//         // sendBeaconError(error)
//     }
// }


// //------------ https://www.youtube.com/watch?v=OhE-mEt37iA
// // import { validations } from "./validations.js"
// const name = "alguien"
// const age = 30
// const email = ""
// //-diccionario
// export const ERRORS_HANDLING = {
//     ConnectionError: ({ name, age, email }) => { setTimeout(() => { validateUser({ name, age, email }) }) },
//     ValidationPlayerError: (msg) => { showUIError(msg) }
// }
//-----------------------------------------------------------------------------
// try {
//     validateUser({ name, age, email })
// } catch (e) {
//     const handler = ERRORS_HANDLING[e.name]
//     handler ? handler({ name, age, email }) : defaultHandler({ name, age, email })

//     if (e instanceof ConnectionError) {
//         //retry after a ffew seconds
//         setTimeout(() => { validateUser({ name, age, email }) })
//     }
//     if (e instanceof ValidationError) {
//         //showUIModalValidation()        
//     }
// }

//-----------------------------------------------------------------------------
export function validatePlayer({ nombre, apellido, email, telefono, categoria }) {
    let soloLetrasRegex = /^[A-Za-z]+$/;
    // let soloEmailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let soloEmailRegex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    const errorMessage = '';
    if (nombre === '')
        errorMessage += 'El nombre no puede estar vacio.\n';
    else if (!soloLetrasRegex.test(nombre))
        errorMessage += 'El nombre solo acepta caracteres alfabeticos.\n';

    if (apellido === '')
        errorMessage += 'El apellido no puede estar vacio.\n';
    else if (!soloLetrasRegex.test(apellido))
        errorMessage += 'El apellido solo acepta caracteres alfabeticos.\n';

    if (email === '')
        errorMessage += 'El email no puede estar vacio.\n';
    else if (!soloEmailRegex.test(email))
        errorMessage += 'No es un email válido.\n';

    if (telefono === 0)
        errorMessage += 'El telefono no puede estar vacio.\n';
    else if (isNaN(telefono))
        errorMessage += 'El telefono solo acepta numeros.\n';

    if (categoria === 0)
        errorMessage += 'La categoria no puede estar vacia.\n';
    else if (isNaN(categoria))
        errorMessage += 'La categoria solo acepta numeros.\n';

    if (errorMessage !== '') {
        errorMessage = 'Corregir los siguientes Errores: \n' + errorMessage;
        throw new ValidationPlayerError(errorMessage)
    }
}