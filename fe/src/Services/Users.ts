const getUsers = (): Promise<{_name: string}[]> => {
    return fetch('http://localhost:8080/users')
        .then(resp => {
            console.log(resp);
            
            return resp.json()})
}

const addUser = (user: {name: string}): Promise<void> => {
    return fetch('http://localhost:8080/users', {
        method: "POST",
        body: JSON.stringify(user)
    })
        .then(resp => Promise.resolve()); //Para que no me joda con los tipos. En este caso no me importa lo que devuelve la api, por eso le puse void arriba (para que este metodo devuelva una promesa vacia). Entonces si le pongo que devuelva una promesa con algo me jode
}

export {getUsers, addUser}