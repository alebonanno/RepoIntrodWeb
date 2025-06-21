
 export async function login(usuarioParam,contrasenaParam){ /*Manejo la funcion como exportación para que login la importe, La función es asincrona porque 
    vamos a utilizar el fetch para poder renderizar el codigo html mientras tenemos la promesa de la respuesta del fetch */
    try{
        const response = await fetch('https://dummyjson.com/auth/login',{/*response guarda lo que le conteste el fetch en la lectura del json*/
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: usuarioParam,
                password: contrasenaParam
                
            })

        });
        if(!response.ok){
            console.error('Creenciales incorrectas');
            return false;
        }
        const data = await response.json();
        console.log(data);
        return data;
       
    } catch (error){
        console.error('Error en la solicitud');
        return false;
    }
 }