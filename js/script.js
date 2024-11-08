class Reserva {
    constructor(id, cliente, cantPersonas, metodoPago, destino, estado = "pendiente") {
        this.id = id;
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
let idReserva = 5;
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
            new Cliente(5, "juantriunfo05", "Juan123", 150000, "5462-9964-5792-8533", 455, 0),
            new Cliente(6, "julianschenck10", "Julian123", 15000, "9563-2368-0757-2352", 323, 0),
            new Cliente(7, "lionelmessi10", "Messi123", 15000, "4783-9683-1367-3624", 774, 0),
            new Cliente(8, "cristianoronaldo07", "Ronaldo123", 15000, "6347-0579-4734-8024", 924, 0),
            new Cliente(9, "neymarjunior11", "Neymar123", 150000, "7563-4763-5483-7732", 229, 0),
        ]
        this.destinos = [
            new Destino(0, "Estados Unidos", 10000, "Pais americano", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1920px-Flag_of_the_United_States.svg.png", 20, "Activo"),
            new Destino(1, "Uruguay", 1500, "Pais sudamericano", "https://es.wikipedia.org/wiki/Archivo:Uruguay_River_near_El_Sobrario,_Misiones,_Argentina,_12th._Jan._2011_-_Flickr_-_PhillipC.jpg", 10, "Activo"),
            new Destino(2, "Alemania", 16000, "Pais europeo", "google.com", 100, "Pausado"),
            new Destino(3, "Argentina", 500, "Pais sudamericano", "google.com", 50, "Pausado"),
            new Destino(4, "Brasil", 6200, "Pais sudamericano", "google.com", 2, "Activo"),
            new Destino(5, "Chile", 9000, "Pais sudamericano", "google.com", 47, "Pausado"),
            new Destino(6, "Venezuela", 4000, "Pais sudamericano", "google.com", 99, "Activo"),
            new Destino(7, "Bolivia", 25000, "Pais sudamericano", "google.com", 23, "Activo"),
            new Destino(8, "Colombia", 1000, "Pais sudamericano", "google.com", 140, "Activo"),
            new Destino(9, "China", 30000, "Pais asiatico", "google.com", 77, "Activo"),
        ]
        this.reservasPendientes = [
            new Reserva(0, this.usuarios[5], 10, "millas", this.destinos[1]),
            new Reserva(1, this.usuarios[8], 1, "saldo", this.destinos[0]),
            new Reserva(2, this.usuarios[7], 7, "millas", this.destinos[2]),
            new Reserva(3, this.usuarios[6], 5, "saldo", this.destinos[7]),
            new Reserva(4, this.usuarios[9], 8, "millas", this.destinos[8])
        ];
        this.reservasAprobadas = [];
        this.reservasCanceladas = [];
        this.historialReservas = [];
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

    calcularCuposVendidos(destinoId) {
        let cuposVendidos = 0;
        for (let i = 0; i < this.reservasAprobadas.length; i++) {
            const reserva = this.reservasAprobadas[i];
            if (reserva.destino.id === destinoId) {
                cuposVendidos += reserva.cantPersonas;
            }
        }
        return cuposVendidos;
    }

    calcularGananciaTotal(destinoId) {
        let gananciaTotal = 0;
        for (let i = 0; i < this.reservasAprobadas.length; i++) {
            const reserva = this.reservasAprobadas[i];
            if (reserva.destino.id === destinoId) {
                gananciaTotal += reserva.destino.precio * reserva.cantPersonas;
            }
        }
        return gananciaTotal;
    }

    calcularGanaciaNeta(destinoId) {
        let gananciaNeta = 0;
        for (let i = 0; i < this.reservasAprobadas.length; i++) {
            const reserva = this.reservasAprobadas[i];
            if (reserva.destino.id === destinoId && reserva.metodoPago === "saldo") {
                gananciaNeta += reserva.destino.precio * reserva.cantPersonas;
            }
        }
        return gananciaNeta;
    }

    totalGananciaReservas() {
        let totalGanancia = 0;
        for (let i = 0; i < this.reservasAprobadas.length; i++) {
            const reserva = this.reservasAprobadas[i];
            totalGanancia += reserva.destino.precio * reserva.cantPersonas;
        }
        return totalGanancia;
    }



    procesarReserva(reserva) {
        let cliente = reserva.cliente;
        let destino = reserva.destino;

        if (destino.estado !== "Pausado") {
            if (reserva.estado === "pendiente") {
                let costoTotal = destino.precio * reserva.cantPersonas;

                // Pago solo con millas
                if (reserva.metodoPago === "millas") {
                    if (cliente.millas >= costoTotal) {
                        cliente.millas -= costoTotal;
                        reserva.estado = "aprobada";
                        destino.cupos -= reserva.cantPersonas;

                        if (destino.cupos <= 0) {
                            destino.estado = "Pausado";
                        }

                    } else {
                        //Pago con millas y saldo
                        let saldoRestante = costoTotal - cliente.millas;
                        cliente.millas = 0;

                        if (cliente.saldo >= saldoRestante) {
                            cliente.saldo -= saldoRestante;
                            reserva.estado = "aprobada";
                            destino.cupos -= reserva.cantPersonas;

                            let millasGanadas = Math.floor(saldoRestante / 100);
                            cliente.millas += millasGanadas;

                            if (destino.cupos <= 0) {
                                destino.estado = "Pausado";
                            }
                        } else {
                            reserva.estado = "cancelada";
                        }
                    }
                    //Pago solo con saldo
                } else if (reserva.metodoPago === "saldo") {
                    if (cliente.saldo >= costoTotal) {
                        cliente.saldo -= costoTotal;
                        reserva.estado = "aprobada";
                        destino.cupos -= reserva.cantPersonas;

                        let millasGanadas = Math.floor(costoTotal / 100);
                        cliente.millas += millasGanadas;

                        if (destino.cupos <= 0) {
                            destino.estado = "Pausado";
                        }
                    } else {
                        reserva.estado = "cancelada";
                    }
                }
            }
        } else {
            reserva.estado = "cancelada";
        }
    }

    descuentoFijo(precio, destino) {
        destino.precio = precio * 0.8;
        return destino.precio;
    }

    deshacerDescuento(precio, destino) {
        destino.precio = precio / 0.8;
        return destino.precio;
    }

}

let sistema = new Sistema();

ocultarSecciones();
mostrarBotones("invitado");
cambiarSeccion("seccionInicio");


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
        cambiarSeccion("seccionInicio");
        mostrarBotones("invitado")
        sistema.usuarioLogeado = null;
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
        case "seccionHistorial":
            verHistorial();
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
                    document.querySelector("#h4Bienvenida").innerHTML = `Hola de nuevo administrador.`;
                    document.querySelector("#ulBienvenida").innerHTML = `<li>Para agregar destinos nuevos, puede acceder a la pestaña de "Agregar Destinos".</li><li>No olvide procesar las reservas pendientes en "Listar Reservas".</li><li>Puedes activar o desactivar destinos en el apartado "Gestionar Destinos."`;
                    break;
                case "cliente":
                    document.querySelector("#h4Bienvenida").innerHTML = `¡Bienvenido de nuevo!`;
                    document.querySelector("#ulBienvenida").innerHTML = `<li>Puedes realizar tus reservas y mirar ofertas actuales en la pestaña "Explorar Destinos".</li><li>Saldo disponible: $ ${sistema.usuarioLogeado.saldo}.</li><li>Millas disponibles: ${sistema.usuarioLogeado.millas}.</li>`;
            }
            return;
        } else {
            document.querySelector("#pErrorLogin").innerHTML = "El usuario o la contraseña son incorrectos.";
        }
    }
}

//Funcionalidades ADMIN

document.querySelector("#btnAgregarDestino").addEventListener("click", agregarDestinos);
//Función Agregar Destinos
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

//Limpiar campos cada vez que se pushea un destino
function limpiarCampos() {
    document.querySelector("#txtDestino").value = "";
    document.querySelector("#txtPrecio").value = "";
    document.querySelector("#txtDescripcion").value = "";
    document.querySelector("#txtUrl").value = "";
    document.querySelector("#txtCupos").value = "";
}

//Función Listar Reservas
function listarReservas() {
    document.querySelector("#tblListarPendientes").innerHTML = "";
    //Tabla reservas pendientes
    for (let i = 0; i < sistema.reservasPendientes.length; i++) {
        const reservaPendiente = sistema.reservasPendientes[i];
        document.querySelector("#tblListarPendientes").innerHTML += `
        <tr>
        <td>${reservaPendiente.cliente.nombreUsuario}</td>
        <td>${reservaPendiente.metodoPago}</td>
        <td>${reservaPendiente.cantPersonas}</td>
        <td>${reservaPendiente.destino.nombre}</td>
        <td>$ ${reservaPendiente.destino.precio}</td>
        <td>${reservaPendiente.destino.cupos}</td>
        <td>${(reservaPendiente.estado).toUpperCase()}</td>
        <td><input type="button" value="Procesar Reserva" class="btnReserva hover" data-reserva="${reservaPendiente.id}"/></td>
        </tr>
        `;
    }

    document.querySelector("#tblListarAprobadas").innerHTML = "";
    //Tabla reservas aprobadas
    for (let i = 0; i < sistema.reservasAprobadas.length; i++) {
        const reservaAprobada = sistema.reservasAprobadas[i];
        document.querySelector("#tblListarAprobadas").innerHTML += `
        <tr>
        <td>${reservaAprobada.cliente.nombreUsuario}</td>
        <td>${reservaAprobada.metodoPago}</td>
        <td>${reservaAprobada.cantPersonas}</td>
        <td>${reservaAprobada.destino.nombre}</td>
        <td>$ ${reservaAprobada.destino.precio}</td>
        <td>${reservaAprobada.destino.cupos}</td>
        <td style="color: green;">${(reservaAprobada.estado).toUpperCase()}</td>
        </tr>
        `;
    }

    document.querySelector("#tblListarCanceladas").innerHTML = "";
    //Tabla reservas canceladas
    for (let i = 0; i < sistema.reservasCanceladas.length; i++) {
        const reservaCancelada = sistema.reservasCanceladas[i];
        document.querySelector("#tblListarCanceladas").innerHTML += `
        <tr>
        <td>${reservaCancelada.cliente.nombreUsuario}</td>
        <td>${reservaCancelada.metodoPago}</td>
        <td>${reservaCancelada.cantPersonas}</td>
        <td>${reservaCancelada.destino.nombre}</td>
        <td>$ ${reservaCancelada.destino.precio}</td>
        <td>${reservaCancelada.destino.cupos}</td>
        <td style="color: red;">${(reservaCancelada.estado).toUpperCase()}</td>
        </tr>
        `;
    }

    //Asignación de eventos de click a los botones de reserva
    let botonesReserva = document.querySelectorAll(".btnReserva");
    for (let i = 0; i < botonesReserva.length; i++) {
        botonesReserva[i].addEventListener("click", function () {
            const reservaId = botonesReserva[i].getAttribute("data-reserva");
            validaReservas(reservaId);
        })

    }

}

//Validación para procesar reservas
function validaReservas(reservaId) {
    document.querySelector("#reservaCliente").innerHTML = "";

    let reserva = null;
    let indexReserva = -1;

    for (let i = 0; i < sistema.reservasPendientes.length; i++) {
        const reservaPendiente = sistema.reservasPendientes[i];
        if (reservaPendiente.id === Number(reservaId)) {
            reserva = reservaPendiente;
            indexReserva = i;
            break;
        }
    }

    if (reserva) {
        sistema.procesarReserva(reserva);

        for (let i = 0; i < sistema.historialReservas.length; i++) {
            const reservaExistente = sistema.historialReservas[i];
            if(
                reservaExistente.cliente === reserva.cliente &&
                reservaExistente.cantPersonas === reserva.cantPersonas &&
                reservaExistente.destino === reserva.destino &&
                reservaExistente.metodoPago === reserva.metodoPago
            ) {
                sistema.historialReservas.splice(i, 1);
                break;
            }

        }

        if (reserva.estado === "aprobada") {
            sistema.reservasAprobadas.push(reserva);
            sistema.historialReservas.push(reserva);
            document.querySelector("#reservaCliente").innerHTML = `<h5>Reserva Aprobada</h5>
            <ul><li>Cliente: ${reserva.cliente.nombreUsuario}</li><li>Saldo restante: $ ${reserva.cliente.saldo}</li><li> Millas restantes: ${reserva.cliente.millas}</li></ul>`;
            document.querySelector("#reservaCliente").style.backgroundColor = "rgb(199, 253, 199)";
            document.querySelector("#reservaCliente").style.border = "2px solid #b2e4e3";
        } else if (reserva.estado === "cancelada") {
            sistema.reservasCanceladas.push(reserva);
            sistema.historialReservas.push(reserva);
            document.querySelector("#reservaCliente").innerHTML = `<h5 style="color: red;">Reserva Cancelada</h5>`;
            document.querySelector("#reservaCliente").style.backgroundColor = "#fafafa";
            document.querySelector("#reservaCliente").style.border = "none";
        }

        if (indexReserva !== -1) {
            sistema.reservasPendientes.splice(indexReserva, 1);
        }
    }
    listarReservas();
}


//Función Gestionar Destinos
function gestionarDestinos() {

    document.querySelector("#tblDestinos").innerHTML = "";

    for (let i = 0; i < sistema.destinos.length; i++) {
        const destino = sistema.destinos[i];

        document.querySelector("#tblDestinos").innerHTML += `<tr>
                      <td> ${destino.nombre}</td>
                      <td class="precioDescuento" data-idprecio="${destino.id}">$ ${destino.precio}</td>
                      <td><p>${destino.descripcion}</p></td>
                      <td><img src="${destino.url}" alt="prueba"></td>
                      <td class="cupos"><span>${destino.cupos}</span><input type="number" value="" class="inpCupos" data-id="${destino.id}"></td>
                      <td><input type="checkbox" name="" id="" class="checkbox" data-id="${destino.id}"></td>
                      <td style="color: ${destino.estado === "Activo" ? "green" : "grey"};" data-estadoid="${destino.id}" class="estadoDestino">
                      ${destino.estado}
                      </td>
                      <td><input type="button" value="Activar" class="btnActivar" data-id="${destino.id}" data-estado="Activo"/></td><br>
                      <td><input type="button" value="Pausar" class="btnPausar" data-id="${destino.id}" data-estado="Pausado"/></td>
                    </tr>`;
    }
    iniciarBotonesEstado();

    //Agregar evento de focus a cada input de cupos
    let inputs = document.querySelectorAll(".inpCupos");
    let cuposCeldas = document.querySelectorAll(".cupos");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("focus", function () {
            agregarBoton(cuposCeldas[i], sistema.destinos[i].id, inputs[i]);
        });
    }


    //Asignarle evento de click a cada checkbox
    let checkboxes = document.querySelectorAll(".checkbox");
    for (let i = 0; i < checkboxes.length; i++) {
        const destino = sistema.destinos[i];
        checkboxes[i].checked = destino.enDescuento || false;
        checkboxes[i].addEventListener("change", function () {
            const id = this.getAttribute("data-id");
            aplicarDescuento(destino.precio, id, this.checked);
        })
    }

    //Asignarle evento de click a botones "Activar" y "Pausar"
    let botonesEstado = document.querySelectorAll(".btnActivar, .btnPausar");

    for (let i = 0; i < botonesEstado.length; i++) {
        botonesEstado[i].addEventListener("click", function () {
            let idDestino = botonesEstado[i].getAttribute("data-id");
            let nuevoEstado = botonesEstado[i].getAttribute("data-estado");

            cambiarEstado(idDestino, nuevoEstado);
        })
    }
}
//Aplicar descuento con checkbox
function aplicarDescuento(precioDestino, idDestino, checkeado) {
    let precio = obtenerElemento(sistema.destinos, "precio", precioDestino);
    let destino = obtenerElemento(sistema.destinos, "id", Number(idDestino));
    let destinoNombre = precio.nombre;
    let precioCelda = document.querySelector(`.precioDescuento[data-idprecio="${idDestino}"]`);
    let precioOriginal = Number(precioDestino);

    if (checkeado) {
        destino.enDescuento = true;
        sistema.descuentoFijo(precioOriginal, destino);
        document.querySelector("#pErrorGestionar").innerHTML = `El destino: ${destinoNombre} ahora está en oferta.`;
        precioCelda.innerHTML = `$ ${sistema.descuentoFijo(precioOriginal, destino).toFixed(0)}`;
    } else {
        destino.enDescuento = false;
        sistema.deshacerDescuento(precioOriginal, destino);
        document.querySelector("#pErrorGestionar").innerHTML = `El destino: ${destinoNombre} ya no está en oferta.`;
        precioCelda.innerHTML = `$ ${sistema.deshacerDescuento(precioOriginal, destino).toFixed(0)}`;
    }
}

//Agregar botón a la celda seleccionada
function agregarBoton(cuposCelda, idDestino) {
    cuposCelda.innerHTML += `<br><input type="button" value="+ Agregar cupos" class="btnAgregarCupos"></td>`;

    let botonCupos = cuposCelda.querySelector(".btnAgregarCupos");
    botonCupos.addEventListener("click", function () {
        agregarCupos(idDestino);
    })
}

//Función Agregar Cupos
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

//Cambiar estado de destinos
function cambiarEstado(idDestino, nuevoEstado) {
    let destino = obtenerElemento(sistema.destinos, "id", Number(idDestino));

    if (destino) {
        destino.estado = nuevoEstado;

        let estadoDestino = document.querySelector(`.estadoDestino[data-estadoid="${idDestino}"]`);

        if (nuevoEstado === "Activo" && destino.cupos === 0) {
            document.querySelector("#pErrorGestionar").innerHTML = "Error, debe introducir cupos antes de activar este destino.";
            return;
        }

        estadoDestino.innerHTML = nuevoEstado;
        estadoDestino.style.color = nuevoEstado === "Activo" ? "green" : "gray";
    }

    let btnActivar = document.querySelector(`.btnActivar[data-id="${idDestino}"]`);
    let btnPausar = document.querySelector(`.btnPausar[data-id="${idDestino}"]`);


    if (btnActivar && btnPausar) {
        if (nuevoEstado === "Activo") {
            btnActivar.disabled = true;
            btnPausar.disabled = false;
            document.querySelector("#pErrorGestionar").innerHTML = `Se activó el destino: ${destino.nombre} satisfactoriamente.`;
        } else if (nuevoEstado === "Pausado") {
            btnActivar.disabled = false;
            btnPausar.disabled = true;
            document.querySelector("#pErrorGestionar").innerHTML = `Se pausó el destino: ${destino.nombre} satisfactoriamente.`;
        }
    }
}


//Funcion para inicializar el estado de los botones al cargar la sección
function iniciarBotonesEstado() {
    for (let i = 0; i < sistema.destinos.length; i++) {
        const destino = sistema.destinos[i];
        let btnActivar = document.querySelector(`.btnActivar[data-id="${destino.id}"]`);
        let btnPausar = document.querySelector(`.btnPausar[data-id="${destino.id}"]`);

        if (btnActivar && btnPausar) {
            if (destino.estado === "Activo") {
                btnActivar.disabled = true;
                btnPausar.disabled = false;
            } else if (destino.estado === "Pausado") {
                btnActivar.disabled = false;
                btnPausar.disabled = true;
            }
        }
    }
}


//Funcion de listar el informe de ganancias
function informeGanancias() {
    document.querySelector("#totalVentas").innerHTML = `$ ${sistema.totalGananciaReservas()}`;
    document.querySelector("#tblInforme").innerHTML = "";

    for (let i = 0; i < sistema.reservasAprobadas.length; i++) {
        const reserva = sistema.reservasAprobadas[i];
        const destino = reserva.destino;

        let totalCuposVendidos = sistema.calcularCuposVendidos(destino.id);
        let gananciaTotal = sistema.calcularGananciaTotal(destino.id);
        let gananciaNeta = sistema.calcularGanaciaNeta(destino.id);

        let destinoYaMostrado = false;

        for (let j = 0; j < i; j++) {
            const reservaAnterior = sistema.reservasAprobadas[j];
            if (reservaAnterior.destino.nombre === destino.nombre) {
                destinoYaMostrado = true;
                break;
            }

        }

        if (totalCuposVendidos > 0 && !destinoYaMostrado) {
            document.querySelector("#tblInforme").innerHTML += `
                    <tr>
                      <td>${destino.nombre}</td>
                      <td>${totalCuposVendidos}</td>  
                      <td>$ ${gananciaTotal}</td>  
                      <td>$ ${gananciaNeta}</td>  
                      <td style="color: green;">${reserva.estado}</td>  
                    </tr>
    `;
        }
    }
}

//Funcionalidades CLIENTE
//Función Explorar Destinos
function explorarDestinos() {
    document.querySelector("#tblExplorar").innerHTML = "";

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

    //Asignar evento de click a botones de reservar
    let botonesReservar = document.querySelectorAll(".btnReservar");
    for (let i = 0; i < botonesReservar.length; i++) {
        const boton = botonesReservar[i];
        boton.addEventListener("click", function () {
            const destinoId = boton.getAttribute("data-id");
            clickReserva(destinoId);
        });
    }
}
//Funcion de hacer click en reservar destino
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
        <div data-destinoid="${destinoSeleccionado.id}">
        <img src="${destinoSeleccionado.url}" width="200">
        <h2>${destinoSeleccionado.nombre}</h2><br>
        <h4>$ ${destinoSeleccionado.precio} / persona</h4><br>
        </div>
        `;
    }
}

document.querySelector("#btnRealizarReserva").addEventListener("click", realizarReserva);

//Función Reservar
function realizarReserva() {
    let cantPersonas = Number(document.querySelector("#txtPersonas").value);
    let metodoPago = document.querySelector("#slcPago").value;
    let destinoId = Number(document.querySelector("#detalleDestino div").getAttribute("data-destinoid"));

    if (metodoPago !== "" && cantPersonas > 0) {
        let destinoSeleccionado = null;
        for (let i = 0; i < sistema.destinos.length; i++) {
            const destino = sistema.destinos[i];
            if (destino.id === destinoId) {
                destinoSeleccionado = destino;
                break;
            }
        }

        if (destinoSeleccionado) {
            const nuevaReserva = new Reserva(idReserva++, sistema.usuarioLogeado, cantPersonas, metodoPago, destinoSeleccionado, "pendiente");

            sistema.reservasPendientes.push(nuevaReserva);
            sistema.historialReservas.push(nuevaReserva);

            document.querySelector("#msjExplorar").innerHTML = "Reserva procesada exitosamente. Esperando confirmación de administrador.";

            cambiarSeccion("seccionExplorar");
        }
    }
}

//Función Ver Historial
function verHistorial() {
    document.querySelector("#tblHistorial").innerHTML = "";
    let montoTotal = 0;

    for (let i = 0; i < sistema.historialReservas.length; i++) {
        const reserva = sistema.historialReservas[i];
        montoTotal = reserva.destino.precio * reserva.cantPersonas;
        document.querySelector("#tblHistorial").innerHTML += `
        <tr>
        <td>${reserva.destino.nombre}</td>
        <td>${reserva.cantPersonas}</td>
        <td>${montoTotal}</td>
        <td style="color: ${reserva.estado === "aprobada" ? "green" : "red"};">${reserva.estado}</td>
        <td><input type="button" value="Cancelar" class="btnCancelar" data-reservaid="${reserva.id}"</td>
        </tr>
        `;
    }

    let botonesCancelar = document.querySelectorAll(".btnCancelar");

    for (let i = 0; i < botonesCancelar.length; i++) {
        botonesCancelar[i].addEventListener("focus", function () {
            const id = this.getAttribute("data-reservaid");
            cancelarReserva(id);
        });
    }
}

//Función Cancelar Reserva
function cancelarReserva(reservaId) {
    for (let i = 0; i < sistema.historialReservas.length; i++) {
        const reserva = sistema.historialReservas[i];;

        if (reserva.id === Number(reservaId) && reserva.estado === "pendiente") {
            sistema.historialReservas.splice(i, 1);

            for (let j = 0; j < sistema.reservasPendientes.length; j++) {
                const reservaPendiente = sistema.reservasPendientes[j];
                if(reservaPendiente.id === reserva.id) {
                    sistema.reservasPendientes.splice(j, 1);
                    document.querySelector("#msjErrorReservas").innerHTML = `La reserva para el destino: ${reserva.destino.nombre} fue cancelada exitosamente.`;
                    break;
                }
            }
        } else {
            document.querySelector("#msjErrorReservas").innerHTML = "Error, esta reserva ya fué procesada y no puede ser cancelada.";
        }
    }
    verHistorial();
}