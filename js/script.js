class Reserva {
    constructor(cantPersonas, metodoPago) {
        this.cantPersonas = cantPersonas;
        this.metodoPago = metodoPago;
    }
}

class Destino {
    constructor(id, nombre, precio, descripcion, url, cupos) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion
        this.url = url;
        this.cupos = cupos;
    }
}

let idUsuario = 0;

class Usuario {
    constructor(id, tipoUsuario, nombreUsuario, password) {
        this.id = id;
        this.tipoUsuario = tipoUsuario;
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }
}

class Sistema {
    constructor() {
        this.usuarios = [
            new Usuario(0, "Admin", "Administrador", "admin123"),
        ]
    }
}
let sistema = new Sistema();

ocultarSecciones();

for (let i = 0; i < sistema.usuarios.length; i++) {
    if (!hayClientesRegistrados()) {
        document.querySelector("#register").style.display = "flex";
    } else {
        document.querySelector("#login").style.display = "flex";
    }
}

function hayClientesRegistrados() {
    if (sistema.usuarios.length > 1) {
        return true;
    }
    return false;
}

function ocultarSecciones() {
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        const seccionHTML = secciones[i];
        seccionHTML.style.display = "none";
    }
}

