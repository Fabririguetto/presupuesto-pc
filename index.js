let port = 3000;
function llenarTabla() {
    fetch(`http://localhost:${port}/Productos`)
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
                                    <td><img>${producto.urlProducto}</img></td>
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

function cargarProveedores() {
    fetch(`http://localhost:${port}/Productos`)
        .then(res => res.json())
        .then(productos => {
            const selectProveedores = document.getElementById('proveedores');
            
            // Limpiar opciones existentes en el select
            selectProveedores.innerHTML = '';

            // Agregar la opción por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccionar proveedor';
            selectProveedores.appendChild(defaultOption);

            // Utilizar un conjunto para almacenar los nombres de los proveedores
            const nombresProveedores = new Set();

            // Agregar cada proveedor como una opción en el select, evitando repeticiones
            productos.forEach(producto => {
                // Verificar si el nombre del proveedor ya ha sido agregado
                if (!nombresProveedores.has(producto.nombreVendedor)) {
                    nombresProveedores.add(producto.nombreVendedor);

                    const option = document.createElement('option');
                    option.value = ''; // No estoy seguro qué valor asignar aquí, depende de cómo vayas a utilizar el ID del proveedor
                    option.textContent = producto.nombreVendedor; // Asigna el nombre del proveedor como texto de la opción
                    selectProveedores.appendChild(option);
                }
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


function filtrarPorArticulo() {
    const filtro = document.getElementById('filtro').value.trim().toUpperCase();
    const filtroProveedor = document.getElementById('proveedores').value.trim().toUpperCase();
    const tabla = document.getElementById('tabla-prod');
    const filasCuerpo = tabla.querySelectorAll('tbody tr'); // Filas de la tabla con los datos

    // Iterar sobre todas las filas de datos de la tabla
    filasCuerpo.forEach(fila => {
        let celdas = fila.querySelectorAll('td:nth-child(3), td:nth-child(4), td:nth-child(6)'); // Obtener celdas de campos específicos
        let textoFila = '';

        // Concatenar el texto de las celdas de los campos específicos
        celdas.forEach(celda => {
            textoFila += celda.innerText.trim().toUpperCase() + ' ';
        });

        // Ocultar la fila si no coincide con el filtro de texto o el filtro de proveedor
        if (textoFila.includes(filtro) && (filtroProveedor === '' || textoFila.includes(filtroProveedor))) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}


function filtrarPorProveedor() {
    const filtro = document.getElementById('proveedores').value.trim();
    const tabla = document.getElementById('tabla-prod');
    const filasCuerpo = tabla.querySelectorAll('tbody tr'); 

    // Iterar sobre todas las filas de datos de la tabla
    filasCuerpo.forEach(fila => {
        let celdas = fila.querySelectorAll('td:nth-child(4)'); // Obtener celdas de campos específicos
        let textoFila = '';

        // Concatenar el texto de las celdas de los campos específicos
        celdas.forEach(celda => {
            textoFila += celda.innerText.trim().toUpperCase() + ' ';
        });

        // Ocultar la fila si no coincide con el filtro de texto o el filtro de proveedor
        if (textoFila.includes(filtro) && (filtroProveedor === '' || textoFila.includes(filtroProveedor))) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}

// Llamar a la función para cargar los proveedores al cargar la página
cargarProveedores();

document.getElementById('filtro').addEventListener('input', filtrarPorArticulo);
document.getElementById('proveedores').addEventListener('change', filtrarPorProveedor);

fetch(`http://localhost:${port}/Productos`)
    .then(res => res.json())
    .then(productos => {
        llenarTabla(productos);
    })
    .catch(error => {
        console.error('Error al obtener los productos:', error);
    });


document.getElementById('deseleccionar').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    document.getElementById('total').innerText = "Total: $0,00";
});
