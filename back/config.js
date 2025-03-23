/* Aquí está la vulnerabilidad.
La SECRET_KEY con la que estamos encriptando el JWT no es lo suficientemente segura.
(Además está hardcodeada en el código por motivos didácticos, debería de estar en 
un fichero .env, por ejemplo.)
*/
module.exports = {
    SECRET_KEY: 'flik.me.3'
};