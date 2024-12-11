
export function GetData(path,token) {
    const dato = fetch(path, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    }).then(respuesta => respuesta.json())
        .then(dato => {
            if (dato) {
                return dato;
            }
        })
    return dato;
}

export function deleteConcreteClient(path,token) {
    const dato = fetch(path, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(respuesta => respuesta.json())
    .then(data =>{
        if(data){
            return true
        }else{
            return false
        }
    })
    return dato;
}

export function getConcreteData(path,token) {
    const dato = fetch(path, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(respuesta => respuesta.json())
    .then(data =>{
        if(data){
            return true
        }else{
            return false
        }
    })
    return dato;
}

export function createData(path,token, json) {
    const dato =fetch(path, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(json),
    }).then(respuesta => respuesta.json())
        .then(dato => {
            if(dato["errors"]){
                return false
            }else{
                return true
            }
        }
    )
    return dato
}

export function updateData(path,token,json) {
    const dato =fetch(path, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(json),
    }).then(respuesta => respuesta.json())
        .then(dato => {
            if(dato){
                return true
            }else{
                return false
            }
        }
    )
    return dato
}

export function createJson(data, columns){
    const json = {};
    columns.forEach((field) => {
        console.log(field)
        if(field ==="street"){
            json["address"]={}
            json["address"][field] = data[field]; 
        }else{
            json[field] = data[field]; 
        } 
    });

    return json
}