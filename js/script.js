//RESOLVER FUNCION DE ACTIVAR Y DESACTIVAR DESTINOS
//RESOLVER CHECKBOX DE DESCUENTO
//AJUSTAR FOR LOOP EN EXPLORAR DESTINOS()

class Reserva {
    constructor(cliente, cantPersonas, metodoPago, destino, estado = "pendiente") {
        this.cliente = cliente;
        this.cantPersonas = cantPersonas;
        this.metodoPago = metodoPago;
        this.destino = destino;
        this.estado = estado;
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
        super(id, "admin", nombreUsuario, password);
    }
}

class Cliente extends Usuario {
    constructor(id, nombreUsuario, password, saldo, tarjeta, cvc, millas) {
        super(id, "cliente", nombreUsuario, password);
        this.saldo = saldo;
        this.tarjeta = tarjeta;
        this.cvc = cvc;
        this.millas = millas;
    }
}

let idDestino = 11;

let idUsuario = 10;

class Sistema {
    constructor() {
        this.usuarioLogeado = null;
        this.usuarios = [
            new Admin(0, "administrador1", "Admin1"),
            new Admin(1, "administrador2", "Admin2",),
            new Admin(2, "administrador3", "Admin3"),
            new Admin(3, "administrador4", "Admin4",),
            new Admin(4, "administrador5", "Admin5",),
            new Cliente(5, "cliente1", "Cliente1", 15000, "1111-2222-3333-4444", 455, 0),
            new Cliente(6, "cliente2", "Cliente2", 15000, "1234-4321-433-422", 323, 0),
            new Cliente(7, "cliente3", "Cliente3", 15000, "4231-532-8638-9740", 444, 0),
            new Cliente(8, "cliente4", "Cliente4", 15000, "0023-2315-5734-5734", 999, 0),
            new Cliente(9, "cliente5", "Cliente5", 15000, "8493-4763-5483-8473", 747, 0),
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
        this.reservasPendientes = [
            new Reserva(this.usuarios[5], 2, "millas", this.destinos[1]),            
            new Reserva(this.usuarios[8], 1, "saldo", this.destinos[0]),  
        ];
        this.reservas = [];
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

    totalGananciaReservas() {
        let totalAcumulado = 0;

        for (let i = 0; i < this.reservas.length; i++) {
            const reserva = this.reservas[i];
            totalAcumulado += reserva.destino.precio * reserva.cantPersonas;
        }
        return totalAcumulado;
    }

    procesarReserva() {
        for (let i = 0; i < this.reservas.length; i++) {
            const reserva = this.reservas[i];
            let cliente = reserva.cliente;
            let destino = reserva.destino;

            if (reserva.estado === "pendiente") {
                let costoTotal = destino.precio * reserva.cantPersonas;

                //Pago solo con millas
                if (reserva.metodoPago === "millas") {
                    if (cliente.millas >= costoTotal) {
                        cliente.millas -= costoTotal;
                        reserva.estado = "aprobada";
                        destino.cupos -= reserva.cantPersonas;

                        if (destino.cupos <= 0) {
                            destino.estado = "pausado";
                        }
                        // Pago con saldo y millas
                    } else {
                        let saldoRestante = costoTotal - cliente.millas;
                        cliente.millas = 0;

                        if (cliente.saldo >= saldoRestante) {
                            cliente.saldo -= saldoRestante;
                            reserva.estado = "aprobada";
                            destino.cupos -= reserva.cantPersonas;

                            if (destino.cupos <= 0) {
                                destino.estado = "pausado";
                            }
                        } else {
                            reserva.estado = "cancelada";
                        }
                    }
                    // Pago solo con saldo
                } else if (reserva.metodoPago === "saldo") {

                    if (cliente.saldo >= saldoRestante) {
                        cliente.saldo -= saldoRestante;
                        reserva.estado = "aprobada";
                        destino.cupos -= reserva.cantPersonas;

                        if (destino.cupos <= 0) {
                            destino.estado = "pausado";
                        }
                    } else {
                        reserva.estado = "cancelada";
                    }
                }
            }
        }
    }

}
let sistema = new Sistema();

ocultarSecciones();
mostrarBotones("invitado");
cambiarSeccion("seccionListar")


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

    switch (idSeccionDestino) {
        case "seccionGestionar":
            gestionarDestinos();
            break;
        case "seccionExplorar":
            explorarDestinos();
            break;
        case "seccionGanancias":
            informeGanancias();
            break;
        case "seccionListar":
            listarReservas();
            break;    
    }
}


function ocultarSecciones() {
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        const seccionHTML = secciones[i];
        seccionHTML.style.display = "none";
    }
}

document.querySelector("#btnRegistrarse").addEventListener("click", registrarse);

function registrarse() {
    let nombre = document.querySelector("#txtNombre").value;
    let apellido = document.querySelector("#txtApellido").value;
    let nombreUsuario = document.querySelector("#txtUsuario").value;
    let password = document.querySelector("#txtPassword").value;
    let tarjeta = document.querySelector("#txtTarjeta").value;
    let cvc = Number(document.querySelector("#txtCvc").value);

    if (nombre !== "" & apellido !== "" && nombreUsuario !== "" && password !== "" && tarjeta !== "") {
        if (obtenerElemento(sistema.usuarios, "nombreUsuario", nombreUsuario)) {
            document.querySelector("#pErrorRegistro").innerHTML = "El usuario ya está registrado.";
            return;
        }
    } else {
        document.querySelector("#pErrorRegistro").innerHTML = "Todos los campos son obligatorios";
    }

    if (password.length < 5) {
        document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe tener al menos una mayúscula.";
        return;
    }

    let tieneMayus = false;
    let tieneMinus = false;
    let tieneNum = false;

    for (let i = 0; i < password.length; i++) {
        const letra = password[i];

        if (letra.charCodeAt() >= 65 && letra.charCodeAt() <= 90) {
            tieneMayus = true;
        } else if (letra.charCodeAt() >= 97 && letra.charCodeAt() <= 121) {
            tieneMinus = true;
        } else if (letra.charCodeAt() >= 48 && letra.charCodeAt() <= 57) {
            tieneNum = true;
        }

        if (tieneMayus && tieneMinus && tieneNum) {
            break;
        }
    }

    if (!tieneMayus || !tieneMinus || !tieneNum) {
        document.querySelector("#pErrorRegistro").innerHTML = "La contraseña debe contener al menos una mayúscula, una minúscula y un número.";
    }

    if (!algoritmoLuhn(tarjeta)) {
        document.querySelector("#pErrorRegistro").innerHTML = "Número de tarjeta inválido.";
        return;
    } else if (isNaN(cvc) || cvc.toString().length !== 3) {
        document.querySelector("#pErrorRegistro").innerHTML = "CVC inválido.";
        return;
    } else {
        sistema.usuarios.push(new Cliente(idUsuario++, nombreUsuario, password, 15000, tarjeta, cvc, 0));
        document.querySelector("#pErrorRegistro").innerHTML = "Usuario registrado correctamente";
        mostrarBotones("invitado")
        return;
    }
}



document.querySelector("#btnLogin").addEventListener("click", login);

function login() {
    let user = document.querySelector("#txtUsuarioLogin").value;
    let pass = document.querySelector("#txtPasswordLogin").value;

    for (let i = 0; i < sistema.usuarios.length; i++) {
        const usuario = sistema.usuarios[i];
        if (usuario.nombreUsuario === user && usuario.password === pass) {
            ocultarSecciones();
            mostrarBotones(usuario.tipoUsuario);
            sistema.usuarioLogeado = usuario;
            document.querySelector("#msjLogin").innerHTML = `Bienvenido, ${sistema.usuarioLogeado.nombreUsuario}`;
            cambiarSeccion("seccionBienvenida");

            switch (sistema.usuarioLogeado.tipoUsuario) {
                case "admin":
                    document.querySelector("#pBienvenida").innerHTML = `Bienvenido de nuevo administrador. Para agregar destinos nuevos, puede acceder a la pestaña de "Agregar Destinos".<br>No olvide procesar las reservas pendientes en "Listar Reservas".`;
                    break;
                case "cliente":
                    document.querySelector("#pBienvenida").innerHTML = `¡Bienvenido de nuevo! Puedes realizar tus reservas y mirar ofertas actuales en la pestaña "Explorar Destinos".<br>Saldo disponible: $ ${sistema.usuarioLogeado.saldo}.<br>Millas disponibles: ${sistema.usuarioLogeado.millas}.`;
            }
            return;
        } else {
            document.querySelector("#pErrorLogin").innerHTML = "El usuario o la contraseña son incorrectos.";
        }
    }
}

//Funcionalidades ADMIN

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
    document.querySelector("#tblListar").innerHTML = "";

    for (let i = 0; i < sistema.reservasPendientes.length; i++) {
        const reservaPendiente = sistema.reservasPendientes[i];
        document.querySelector("#tblListar").innerHTML += `
        <tr>
        <td>${reservaPendiente.cliente.nombreUsuario}</td>
        <td>${reservaPendiente.metodoPago}</td>
        <td>${reservaPendiente.cantPersonas}</td>
        <td>${reservaPendiente.destino.nombre}</td>
        <td>${reservaPendiente.destino.precio}</td>
        <td>${reservaPendiente.destino.cupos}</td>
        <td>${reservaPendiente.estado}</td>
        </tr>
        `;
    }
}

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
                      <td class="precioDescuento" data-precio="${destino.precio}">$ ${destino.precio}</td>
                      <td><p>${destino.descripcion}</p></td>
                      <td><img src="${destino.url}" alt="prueba"></td>
                      <td class="cupos"><span>${destino.cupos}</span><input type="number" value="" class="inpCupos" data-id="${destino.id}"></td>
                      <td><input type="checkbox" name="" id="" class="checkbox" data-id="${destino.id}"></td>
                      <td style="color: ${color};" class="estadoDestino">${destino.estado}</td>
                      <td><input type="button" value="Activar" class="btnActivar" /></td><br>
                      <td><input type="button" value="Pausar" class="btnPausar" /></td>
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

    function agregarBoton(cuposCelda, idDestino) {
        cuposCelda.innerHTML += `<br><input type="button" value="+ Agregar cupos" class="btnAgregarCupos"></td>`;

        let botonCupos = cuposCelda.querySelector(".btnAgregarCupos");
        botonCupos.addEventListener("click", function () {
            agregarCupos(idDestino);
        })
    }
}


function agregarCupos(idDestino) {
    let cupos = Number(document.querySelector(`.inpCupos[data-id="${idDestino}"]`).value);
    let destino = obtenerElemento(sistema.destinos, "id", idDestino);

    if (isNaN(cupos) || cupos <= 0) {
        document.querySelector("#pErrorGestionar").innerHTML = "El campo de cupos debe ser un valor numérico positivo.";
        return;
    }

    if (destino) {
        sistema.aumentarCupos(destino.id, cupos);
        document.querySelector("#pErrorGestionar").innerHTML = "Cupos agregados exitosamente.";

        let celdas = document.querySelectorAll("td");
        for (let i = 0; i < celdas.length; i++) {
            const celda = celdas[i];
            if (celda.querySelector(`.inpCupos[data-id="${idDestino}"]`)) {
                celda.querySelector("span").innerHTML = destino.cupos;
                document.querySelector(`.inpCupos[data-id="${idDestino}"]`).value = "";
                break;
            }
        }
    }
}

//EN STANDBY HASTA EL MIERCOLES
function aplicarDescuento(idDestino, precio) {
    let checkbox = document.querySelector(`.checkbox[data-id="${idDestino}"]`);
    let precioCelda = document.querySelector(`.precioDescuento[data-precio="${precio}"]`);
    let precioOriginal = Number(precioCelda.getAttribute("data-precio"));
    let precioDescuento = 0;

    if (checkbox.checked) {
        precioDescuento = precioOriginal * 0.8;
        precioCelda.innerHTML = precioDescuento;
    }
}

let checkboxes = document.querySelectorAll(".checkbox");
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", function () {
        aplicarDescuento(this.getAttribute("data-id"), this.getAttribute("data-precio"));
    })

}


/* document.querySelector(".btnActivar").addEventListener("click", cambiarEstado);
document.querySelector(".btnPausar").addEventListener("click", cambiarEstado);

function cambiarEstado() {
    let estado = document.querySelector(".estadoDestino");

    switch(estado){
        case "Activo":
            document.querySelector(".estadoDestino").innerHTML = "Pausado";
            break;
        case "Pausado":
            document.querySelector(".estadoDestino").innerHTML = "Activo";
            break;            
    }
}
 */

function informeGanancias() {
    document.querySelector("#totalVentas").innerHTML = `$ ${sistema.totalGananciaReservas()}`;
    document.querySelector("#tblInforme").innerHTML = "";

    for (let i = 0; i < sistema.destinos.length; i++) {
        const destino = sistema.destinos[i];
        document.querySelector("#tblInforme").innerHTML += `
                    <tr>
                      <td> ${destino.nombre}</td>
                      <td>${destino.cupos}</td>  
                    </tr>
    `;
    }

}

//Funcionalidades CLIENTE

function explorarDestinos() {

    document.querySelector("#tblDestinos").innerHTML = "";
    for (let i = 0; i < sistema.destinos.length; i++) {
        const destino = sistema.destinos[i];

        if (destino.estado === "Activo") {
            document.querySelector("#tblExplorar").innerHTML += `<tr>
                      <td>${destino.nombre}</td>
                      <td><p>${destino.descripcion}</p></td>
                      <td>$ ${destino.precio}</td>
                      <td>---</td>
                      <td><img src="${destino.url}" alt="prueba"></td>
                      <td><input type="button" value="Reservar" class="btnReservar hover" data-id="${destino.id}"></td>
                    </tr>`;
        }
    }


    let botonesReservar = document.querySelectorAll(".btnReservar");
    for (let i = 0; i < botonesReservar.length; i++) {
        const boton = botonesReservar[i];
        boton.addEventListener("click", function () {
            const destinoId = boton.getAttribute("data-id");
            clickReserva(destinoId);
        });


    }
}

function clickReserva(destinoId) {
    let destinoSeleccionado = null
    for (let i = 0; i < sistema.destinos.length; i++) {
        const destino = sistema.destinos[i];
        if (destino.id == destinoId) {
            destinoSeleccionado = destino;
            break;
        }
    }

    if (destinoSeleccionado) {
        cambiarSeccion("seccionReservar")
        document.querySelector("#detalleDestino").innerHTML = `
        <img src="${destinoSeleccionado.url}" width="200">
        <h2>${destinoSeleccionado.nombre}</h2><br>
        <h4>$ ${destinoSeleccionado.precio} / persona</h4><br>
        `;

    }
}


