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

function algoritmoLuhn(numero) {
    let suma = 0;
    let esPar = false;

    
    for (let i = numero.length - 1; i >= 0; i--) {
        let digito = Number(numero[i]);

        if (esPar) {
            digito *= 2;
            if (digito > 9) {
                digito -= 9;
            }
        }

        suma += digito;
        esPar = !esPar;
    }

    
    return suma % 10 === 0;
}


