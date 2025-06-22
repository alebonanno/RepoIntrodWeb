/*Esta función login() se encarga de autenticar a un usuario enviando sus credenciales (usuarioParam y contrasenaParam) a una API de autenticación
 (https://dummyjson.com/auth/login). Si las credenciales son correctas, devuelve los datos del usuario; si son incorrectas, devuelve false.*/

 export async function login(usuarioParam,contrasenaParam){ /*Manejo la funcion como exportación para que login la importe, La función se  
    declara como asincrona porque vamos a utilizar el fetch para poder renderizar el codigo html 
    mientras tenemos la promesa de la respuesta del fetch */
    try{ 
        const response = await fetch('https://dummyjson.com/auth/login',{/*response guarda lo que le conteste el fetch en la lectura del json*/
            method : 'POST',  //Se usa el método POST porque se están enviando datos al servidor.

            headers : {     //Se configuran los headers para indicar que el contenido es JSON.
                'Content-Type' : 'application/json'
            }, //Se envían los datos (usuarioParam y contrasenaParam) en el cuerpo (body) de la solicitud, 
            body: JSON.stringify({      //convirtiéndolos en JSON con JSON.stringify().
                username: usuarioParam,
                password: contrasenaParam
            })

        });
        if(!response.ok){   //Si el servidor responde con un error (por ejemplo, credenciales incorrectas), 
                            // se muestra un mensaje en la consola y se devuelve false.
            console.error('Creenciales incorrectas');
            return false;
        }
        const data = await response.json(); //Se convierte la respuesta en JSON con await response.json().
        console.log(data);                  //Se muestra en la consola los datos para depuración.
        return data;      //Se devuelve data, que contiene los datos del usuario si la autenticación fue exitosa.

       
    } catch (error){    //Si ocurre un error en la solicitud (por ejemplo, problemas de conexión), se captura en el catch.
        console.error('Error en la solicitud');//Se muestra un mensaje de error en la consola.
        return false;   //Se devuelve false para indicar que la autenticación falló.

    }
 }