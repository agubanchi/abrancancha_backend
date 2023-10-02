// export class ConnectionError extends Error {
//     contructor(message) {
//         super(message)
//         this.name = 'ConnectionError'
//     }
// }
// export class ValidationError extends Error {
//     contructor(message) {
//         super(message)
//         this.name = 'ValidationError'
//     }
//     getFielName(){}//-para manejar los errores con mas detalle
// }

const createErrorFactory = (name) => {
    class BusinessError extends Error {
        contructor(message) {
            super(message)
            this.name = name
            // this.stack=""//-se podriaborrar la pila para ocultarla
        }
    }
}
//-----------------------------------------------------------------------------
export const ConnectionError = createErrorFactory("ConnectionError")
export const ValidationPlayerError = createErrorFactory("ValidationPlayerError")