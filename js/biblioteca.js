function obtenerElemento(arr, prop, valor){
    let objElemento = null;
    for (let i = 0; i < arr.length; i++) {
        const elemento = arr[i];
        if(elemento[prop] === valor){
            objElemento = elemento;
            break;
        }
    }
    return objElemento;
}

