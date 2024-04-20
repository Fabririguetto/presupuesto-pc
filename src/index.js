const puerto = require('./src/scraping2');


function llenarTabla() {
    fetch(`http://localhost:${puerto}/Productos`)
        .then(res => res.json())
        .then(productos => {
            const tablaProductos = document.querySelector("#tabla-prod tbody");
            let index = 0; 
            let tipoProducto = '';

            for (const producto of productos) {
                // Determinar el tipo de producto para cada artículo
                if (index % 24 === 0) {
                    index = 1;
                    if (tipoProducto === '') {
                        tipoProducto = 'Procesador';
                    } else if (tipoProducto === 'Procesador') {
                        tipoProducto = 'Placa base';
                    } else if (tipoProducto === 'Placa base') {
                        tipoProducto = 'RAM';
                    } else if (tipoProducto === 'RAM') {
                        tipoProducto = 'RAM2';
                    } else if (tipoProducto === 'RAM2') {
                        tipoProducto = 'Disco';
                    } else if (tipoProducto === 'Disco') {
                        tipoProducto = 'Disco2';
                    } else if (tipoProducto === 'Disco2') {
                        tipoProducto = 'Fuente';
                    } else if (tipoProducto === 'Fuente') {
                        tipoProducto = 'Gabinete';
                    }
                } else {
                    index++;
                }

                // Agregar índice de 1 a 21 y luego repetir
                if (index <= 21) {
                    const tr = `<tr>
                                    <td><input class="checkbox" type="checkbox" data-precio="${producto.precio}"></td>
                                    <td>${index}</td>
                                    <td>${producto.nombreArticulo}</td>
                                    <td>${producto.nombreVendedor}</td>
                                    <td>${producto.precio}</td>
                                    <td>${tipoProducto}</td>
                                    <td>${productotipo.imagenProducto}</td>
                                </tr>`;
                    tablaProductos.innerHTML += tr;
                }
            }

            const checkboxes = document.querySelectorAll('.checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', actualizarTotal);
            });
        })
        .catch(error => {
            console.error('Error al obtener los productos:', error);
        });
}

// Función para actualizar el total cuando cambian los checkboxes
function actualizarTotal() {
    const totalElement = document.getElementById('total');
    const checkboxes = document.querySelectorAll('.checkbox:checked');
    let total = 0;

    checkboxes.forEach(checkbox => {
        const precioString = checkbox.dataset.precio.replace('.', '').replace(',', '.'); // Corregir el formato del precio
        const precio = parseFloat(precioString);
        if (!isNaN(precio)) {
            total += precio;
        }
    });

    totalElement.innerText = `Total: ${formatNumber(total)}`;

    if (checkboxes.length > 7) {
        this.checked = false;
        alert('Solo se pueden seleccionar un máximo de 6 checkboxes.');
    }
}

// Función para dar formato a los números
function formatNumber(number) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(number);
}

// Función para buscar en la tabla
function buscarEnTabla() {
    let filtro = document.getElementById('filtro').value.toUpperCase();
    let tabla = document.getElementById('tabla-prod');
    let filasCuerpo = tabla.querySelectorAll('tbody tr'); // Filas de la tabla con los datos

    // Iterar sobre todas las filas de datos de la tabla
    filasCuerpo.forEach(fila => {
        let celdas = fila.getElementsByTagName('td');
        let encontrado = false;

        // Iterar sobre todas las celdas de la fila
        for (let j = 0; j < celdas.length; j++) {
            let textoCelda = celdas[j].innerText.toUpperCase();
            if (textoCelda.indexOf(filtro) > -1) {
                encontrado = true;
                break;
            }
        }

        // Mostrar u ocultar la fila de datos según el resultado de la búsqueda
        if (encontrado) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}


fetch(`http://localhost:${puerto}/Productos`)
    .then(res => res.json())
    .then(productos => {
        llenarTabla(productos);
    })
    .catch(error => {
        console.error('Error al obtener los productos:', error);
    });

// Agregar un event listener al input de filtro para buscar en la tabla mientras se escribe
document.getElementById('filtro').addEventListener('input', buscarEnTabla);
