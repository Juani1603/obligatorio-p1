//ARREGLAR PROPIEDADES DE CLASE
//IMPLEMENTAR DATA-ID EN EL FOR LOOP

class Reserva {
    constructor(cantPersonas, metodoPago) {
        this.cantPersonas = cantPersonas;
        this.metodoPago = metodoPago;
    }
}

class Destino {
    constructor(id, nombre, precio, descripcion, url, cupos, estado) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion
        this.url = url;
        this.cupos = cupos;
        this.estado = estado;
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

class Admin extends Usuario {
    constructor(id, nombreUsuario, password) {
        super(id, nombreUsuario, password);
    }
}

class Cliente extends Usuario {
    constructor(id, nombreUsuario, password, saldo, tarjeta, cvc, millas) {
        super(id, nombreUsuario, password);
        this.saldo = saldo;
        this.tarjeta = tarjeta;
        this.cvc = cvc;
        this.millas = millas;
    }
}


let idDestino = 11;

class Sistema {
    constructor() {
        this.usuarioLogeado = null;
        this.usuarios = [
            new Admin(0, "admin", "administrador1", "Admin1"),
            new Admin(1, "admin", "administrador2", "Admin2",),
            new Admin(2, "admin", "administrador3", "Admin3"),
            new Admin(3, "admin", "administrador4", "Admin4",),
            new Admin(4, "admin", "administrador5", "Admin5",),
            new Cliente(5, "cliente", "cliente1", "Cliente1", 15000, "1111-2222-3333-4444", 455, 0),
            new Cliente(6, "cliente", "cliente2", "Cliente2", 15000, "1234-4321-433-422", 323, 0),
            new Cliente(7, "cliente", "cliente3", "Cliente3", 15000, "4231-532-8638-9740", 444, 0),
            new Cliente(8, "cliente", "cliente4", "Cliente4", 15000, "0023-2315-5734-5734", 999, 0),
            new Cliente(9, "cliente", "cliente5", "Cliente5", 15000, "8493-4763-5483-8473", 747, 0),
        ]
        this.destinos = [
            new Destino(0, "Estados Unidos", 25000, "Pais americano", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png", 20, "Activo"),
            new Destino(1, "España", 15000, "Pais europeo", "google.com", 10, "Activo"),
            new Destino(2, "Alemania", 10000, "Pais europeo", "google.com", 100, "Pausado"),
            new Destino(3, "Argentina", 5000, "Pais sudamericano", "google.com", 50, "Pausado"),
            new Destino(4, "Brasil", 12000, "Pais sudamericano", "google.com", 2, "Activo"),
            new Destino(5, "Chile", 9000, "Pais sudamericano", "google.com", 47, "Pausado"),
            new Destino(6, "Venezuela", 7000, "Pais sudamericano", "google.com", 99, "Activo"),
            new Destino(7, "Bolivia", 17000, "Pais sudamericano", "google.com", 23, "Activo"),
            new Destino(8, "Colombia", 15000, "Pais sudamericano", "google.com", 14, "Activo"),
            new Destino(9, "China", 30000, "Pais asiatico", "google.com", 77, "Activo"),
            new Destino(10, "Israel", 45000, "Pais asiatico", "google.com", 9, "Activo"),
        ]
    }

    aumentarCupos(id, cupos) {
        let destinoEncontrado = null;
        for (let i = 0; i < this.destinos.length; i++) {
            const destino = this.destinos[i];
            if (destino.id === id) {
                destinoEncontrado = destino;
                break;
            }
        }
        if (destinoEncontrado) {
            destinoEncontrado.cupos += cupos;
        }
    }
}
let sistema = new Sistema();

ocultarSecciones();
mostrarBotones("invitado");
cambiarSeccion("seccionGestionar");

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
    } else {
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
        console.log(usuario);
        console.log("usuario.nombreUsuario",usuario.nombreUsuario);
        console.log(usuario.password);
        
        
        if (usuario.nombreUsuario === user && usuario.password === pass) {
            
            
            switch (usuario.tipoUsuario) {
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

document.querySelector("#btnAgregarDestino").addEventListener("click", agregarDestinos);

function agregarDestinos() {
    let nombre = document.querySelector("#txtDestino").value;
    let precio = Number(document.querySelector("#txtPrecio").value);
    let descripcion = document.querySelector("#txtDescripcion").value;
    let url = document.querySelector("#txtUrl").value;
    let cupos = Number(document.querySelector("#txtCupos").value);

    //Validación de nombre y campos vacíos
    if (nombre !== "" && descripcion !== "" && url !== "") {
        if (nombre.charAt(0) !== nombre.charAt(0).toUpperCase()) {
            document.querySelector("#pErrorAgregar").innerHTML = "La primera letra debe ser mayúscula.";
            return;
        } else {
            for (let i = 0; i < nombre.length; i++) {
                const letra = nombre[i];
                if (letra.charCodeAt() <= 65 && letra.charCodeAt() >= 122) {
                    document.querySelector("#pErrorAgregar").innerHTML = "El texto debe tener solo letras.";
                    return;
                }
            }
        }
    } else {
        document.querySelector("#pErrorAgregar").innerHTML = "Todos los campos son obligatorios.";
        return;
    }

    //Validación precios y cupos
    if (precio <= 0 || cupos <= 0) {
        document.querySelector("#pErrorAgregar").innerHTML = "El número de cupos debe ser un dato numérico positivo.";
        return;
    }

    //Verificar si existe el nombre del destino
    if (!obtenerElemento(sistema.destinos, "nombre", nombre)) {
        sistema.destinos.push(new Destino(idDestino++, nombre, precio, descripcion, url, cupos, "Activo"));
        document.querySelector("#pErrorAgregar").innerHTML = "¡Destino agregado exitosamente!";
        limpiarCampos();
    } else {
        document.querySelector("#pErrorAgregar").innerHTML = "Error, el destino ya existe.";
    }
}

function limpiarCampos() {
    document.querySelector("#txtDestino").value = "";
    document.querySelector("#txtPrecio").value = "";
    document.querySelector("#txtDescripcion").value = "";
    document.querySelector("#txtUrl").value = "";
    document.querySelector("#txtCupos").value = "";
}

function listarReservas() {
    //en stand by

}
document.querySelector("#btnMostrar").addEventListener("click", gestionarDestinos);

function gestionarDestinos() {

    document.querySelector("#tblDestinos").innerHTML = "";

    for (let i = 0; i < sistema.destinos.length; i++) {
        const destino = sistema.destinos[i];
        let color = ""
        switch (destino.estado) {
            case "Activo":
                color = "green";
                break;
            case "Pausado":
                color = "gray";
                break;
        }
        document.querySelector("#tblDestinos").innerHTML += `<tr>
                      <td> ${destino.nombre}</td>
                      <td>${destino.precio}</td>
                      <td><p>${destino.descripcion}</p></td>
                      <td><img src="${destino.url}" alt="prueba"></td>
                      <td class="cupos"><span>${destino.cupos}</span><input type="text" value="" class="inpCupos" data-id="destino.id"></td>
                      <td><input type="checkbox" name="" id=""></td>
                      <td style="color: ${color};">${destino.estado}</td>
                      <td><input type="button" value="Acción" /></td>
                    </tr>`;
    }


    //Agregar evento de focus a cada input de cupos
    let inputs = document.querySelectorAll(".inpCupos");
    let cuposCeldas = document.querySelectorAll(".cupos");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("focus", function () {
            agregarBoton(cuposCeldas[i], sistema.destinos[i].id, inputs[i]);
        });
    }

    function agregarBoton(cuposCelda, idDestino, inputCupos) {
        cuposCelda.innerHTML += `<br><input type="button" value="+ Agregar cupos" class="btnAgregarCupos"></td>`;

        let botonCupos = cuposCelda.querySelector(".btnAgregarCupos:last-child");
        botonCupos.addEventListener("click", function () {
            agregarCupos(idDestino, inputCupos);
        })
    }
}


function agregarCupos(idDestino, inputCupos) {
    let cupos = Number(inputCupos.value);
    let destino = obtenerElemento(sistema.destinos, "id", idDestino);


    if (cupos <= 0) {
        document.querySelector("#pErrorGestionar").innerHTML = "El campo de cupos debe ser un valor numérico positivo.";
        return;
    }

    sistema.aumentarCupos(destino.id, cupos);
    document.querySelector("#pErrorGestionar").innerHTML = "Cupos agregados exitosamente.";
}   