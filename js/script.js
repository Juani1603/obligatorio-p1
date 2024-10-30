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
        this.usuarioLogeado = null;
        this.usuarios = [
            new Usuario(0, "admin", "administrador1", "Admin1"),
            new Usuario(1, "admin", "administrador2", "Admin2"),
            new Usuario(2, "admin", "administrador3", "Admin3"),
            new Usuario(3, "admin", "administrador4", "Admin4"),
            new Usuario(4, "admin", "administrador5", "Admin5"),
            new Usuario(5, "cliente", "cliente1", "Cliente1"),
            new Usuario(6, "cliente", "cliente2", "Cliente2"),
            new Usuario(7, "cliente", "cliente3", "Cliente3"),
            new Usuario(8, "cliente", "cliente4", "Cliente4"),
            new Usuario(9, "cliente", "cliente5", "Cliente5"),
        ]
        this.destinos = [
            new Destino(0, "Estados Unidos", 25000, "Pais americano", "", "20"),
            new Destino(1, "España", 15000, "Pais europeo", "", "10"),
            new Destino(2, "Alemania", 10000, "Pais europeo", "", "100"),
            new Destino(3, "Argentina", 5000, "Pais sudamericano", "", "50"),
            new Destino(4, "Brasil", 12000, "Pais sudamericano", "", "2"),
            new Destino(5, "Chile", 9000, "Pais sudamericano", "", "47"),
            new Destino(6, "Venezuela", 7000, "Pais sudamericano", "", "99"),
            new Destino(7, "Bolivia", 17000, "Pais sudamericano", "", "23"),
            new Destino(8, "Colombia", 15000, "Pais sudamericano", "", "14"),
            new Destino(9, "China", 30000, "Pais asiatico", "", "77"),
            new Destino(10, "Israel", 45000, "Pais asiatico", "", "9"),
            
        ]
    }
}
let sistema = new Sistema();

ocultarSecciones();
mostrarBotones("invitado");

let botones = document.querySelectorAll(".boton");
for (let i = 0; i < botones.length; i++) {
    const botonHTML = botones[i];
    botonHTML.addEventListener("click", mostrarSeccion);
}

function mostrarBotones(perfil) {
    let botones = document.querySelectorAll(".boton");
    for (let i = 0; i < botones.length; i++) {
        const botonHTML = botones[i];
        botonHTML.style.display = "none";
    }
    let botonesMostrar = document.querySelectorAll("." + perfil)
    for (let i = 0; i < botonesMostrar.length; i++) {
        const botonHTML = botonesMostrar[i];
        botonHTML.style.display = "flex";
    }
}


function mostrarSeccion() {
    let idBoton = this.getAttribute("id");
    if (idBoton !== "btnCerrarSesion") {
        let idSeccion = idBoton.charAt(3).toLowerCase() + idBoton.substring(4)//
        cambiarSeccion(idSeccion);
    }else{
        //cerrar sesión
    }
}

function cambiarSeccion(idSeccionDestino) {
    ocultarSecciones();
    document.querySelector("#" + idSeccionDestino).style.display = "flex";

    //Implementar switch con funciones de listar
}


function ocultarSecciones() {
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        const seccionHTML = secciones[i];
        seccionHTML.style.display = "none";
    }
}

document.querySelector("#btnLogin").addEventListener("click", login);

function login() {
    let user = document.querySelector("#txtUsuarioLogin").value;
    let pass = document.querySelector("#txtPasswordLogin").value;

    for (let i = 0; i < sistema.usuarios.length; i++) {
        const usuario = sistema.usuarios[i];
        if (usuario.nombreUsuario === user && usuario.password === pass) {
            switch(usuario.tipoUsuario) {
                case "admin":
                    ocultarSecciones()
                    mostrarBotones("admin");
                    sistema.usuarioLogeado = usuario;
                    break;
                case "cliente":
                    ocultarSecciones()
                    mostrarBotones("cliente");
                    sistema.usuarioLogeado = usuario;                      
            }
        }
    }
}

function agregarDestinos() {
    let nombre = document.querySelector("#txtDestino").value;
    let precio = Number(document.querySelector("#txtPrecio").value);
    let descripcion = document.querySelector("#txtDescripcion").value;
    let url = document.querySelector("#txtUrl").value;
    let cupos = Number(document.querySelector("#txtCupos").value);

    if (nombre !== "") {
        for (let i = 0; i < nombre.length; i++) {
            const letra = nombre[i];
                if(nombre.charAt(0) !== nombre.charAt(0).toUpperCase() && letra.chatAtCode() <= 65 && letra.charAtCode() >= 122){
                    document.querySelector("#pError").innerHTML = "El campo debe tener únicamente texto, y la primera letra debe ser mayúscula.";
                }
        }
    } else if (precio < 0 || cupos < 0) {
        document.querySelector("#pError").innerHTML = "El número de cupos debe ser un dato numérico positivo.";
    } else {
        sistema.destinos.push(new Destino(nombre, precio, descripcion, url, cupos));
    }
    
}
