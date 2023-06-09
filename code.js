

const obtenerSueldo = (parrafo) => {
    const textoSueldo = parrafo.match(/Sueldo: [A-Za-z]+\s*([0-9]+)/);
    if (textoSueldo) {
        return parseInt(textoSueldo[1]);
    }
    return 0;
};

const ordenarParrafos = () => {
    const formDataSection = document.getElementById('form-data');
    const parrafos = Array.from(formDataSection.getElementsByTagName('p'));

    parrafos.sort((a, b) => {
        const sueldoA = obtenerSueldo(a.textContent);
        const sueldoB = obtenerSueldo(b.textContent);
        return sueldoB - sueldoA;
    });

    for (let i = 0; i < parrafos.length; i++) {
        formDataSection.appendChild(parrafos[i]);
    }
};

function validar(n, e, s) {
    let expRegNombre = /^[A-Z][a-zA-Z]*$/;
    let expRegEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let errorNombre = document.getElementById('error-nombre');
    let errorEmail = document.getElementById('error-email');
    let errorSueldo = document.getElementById('error-sueldo');

    if (!expRegNombre.test(n)) {
        errorNombre.textContent = 'El nombre debe comenzar con una letra mayúscula';
        return false;
    } else {
        errorNombre.textContent = '';
    }

    if (!expRegEmail.test(e)) {
        errorEmail.textContent = 'Ingrese con una dirección de correo electrónico válida';
        return false;
    } else {
        errorEmail.textContent = '';
    }

    if (parseInt(s) < 100000) {
        errorSueldo.textContent = 'Ingrese un valor mayor a $100000';
        return false;
    } else {
        errorSueldo.textContent = '';
    }

    return true;
};

const funcionClick = () => {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    const sueldo = document.getElementById('sueldo').value;
    const moneda = document.getElementById('moneda').value;
    const mensaje = document.getElementById('textarea').value;



    function calcularMoneda(m, s) {
        let USD;
        let ARS;
        let EUR;
        if (m === 'ARS') {
            USD = s / 243;
            EUR = s / 262;
            return `- USD: ${Math.round(USD)} - EUR: ${Math.round(EUR)}`;
        } else {
            return '';
        }
    };

    const formDataSection = document.getElementById('form-data');

    if (nombre === '' || email === '' || asunto === '' || sueldo === '' || moneda === '' || mensaje === '') {
        let errorFormVacio = document.getElementById('error-form-vacio');
        errorFormVacio.textContent = 'Por favor complete todos los campos';

    } else if (!validar(nombre, email, sueldo)) {
        return;
    } else {
        const nuevoParrafo = document.createElement('p');
        nuevoParrafo.setAttribute('id', 'p-data');
        nuevoParrafo.setAttribute('class', 'card');
        const textParrafo = document.createTextNode(`Nombre: ${nombre} | Email: ${email} | Asunto: ${asunto} | Sueldo: ${moneda} ${sueldo} ${calcularMoneda(moneda, sueldo)} | Mensaje: ${mensaje}`);
        nuevoParrafo.appendChild(textParrafo);

        formDataSection.appendChild(nuevoParrafo);
        ordenarParrafos();

        document.getElementById('cont-form').reset();
        let errorFormVacio = document.getElementById('error-form-vacio');
        errorFormVacio.textContent = '';
    }

};

// boton enviar
const submit = document.getElementById('submit');

submit.addEventListener('click', funcionClick);







