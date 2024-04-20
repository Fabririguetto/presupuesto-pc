import express from 'express';
import puppeteer from 'puppeteer';
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const productos = {
    procesador: [
        { nombre: 'Procesador AMD Ryzen 5 8600G', url: 'https://www.hardgamers.com.ar/search?text=ryzen+5+8600g' },
    ],
    placa: [
        { nombre: 'Placa', url: 'https://www.hardgamers.com.ar/search?text=mother+am5' },
    ],
    memoria: [
        { nombre: 'Memoria Ram', url: 'https://www.hardgamers.com.ar/search?text=RAM+DDR5' },
        { nombre: 'Memoria Ram 2', url: 'https://www.hardgamers.com.ar/search?text=RAM%20DDR5&page=2&limit=21' },
    ],
    disco: [
        { nombre: 'Disco', url: 'https://www.hardgamers.com.ar/search?text=SSD&page=43&limit=21' },
        { nombre: 'Disco 2', url: 'https://www.hardgamers.com.ar/search?text=SSD&page=44&limit=21' },
    ],
    fuente: [
        { nombre: 'Fuente', url: 'https://www.hardgamers.com.ar/search?text=fuente+80%2B' },
    ],
    gabinete: [
        { nombre: 'Gabinete', url: 'https://www.hardgamers.com.ar/search?text=gabinete&page=4&limit=21' },
    ],
};

let datosProductos = null; // Variable para almacenar los datos de productos

app.get('/Productos', async (req, res) => {
    try {
        // Si los datos de productos aún no se han obtenido, se obtienen
        if (!datosProductos) {
            datosProductos = await obtenerDatosProductos(productos);
        }
        console.table(datosProductos);
        res.json(datosProductos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

async function obtenerDatosProductos(productos) {
    const browser = await puppeteer.launch({ headless: true });
    const datos = [];

    try {
        for (const tipoProducto in productos) {
            if (productos.hasOwnProperty(tipoProducto)) {
                const urls = productos[tipoProducto];
                
                for (const producto of urls) {
                    const page = await browser.newPage();
                    await page.goto(producto.url);
                    await page.waitForSelector('.product-description');

                    const datosArticulos = await page.evaluate(() => {
                        const articulos = document.querySelectorAll('.product-description');
                        const datos = [];
                        
                        articulos.forEach(articulo => {
                            const nombreVendedor = articulo.querySelector('.subtitle').textContent.trim();
                            const nombreArticulo = articulo.querySelector('.product-title.line-clamp').textContent.trim();
                            const precioElemento = articulo.querySelector('h2[itemprop="price"]');
                            const precio = precioElemento ? precioElemento.textContent.trim() : 'Precio no disponible';
                            const imagenElemento = articulo.querySelector('img');
                            const imagenProducto = imagenElemento ? imagenElemento.getAttribute('src') : 'URL no disponible';                    
                            datos.push({ nombreArticulo, nombreVendedor, precio, imagenProducto });
                        });
                        
                        return datos;
                    });

                    datos.push(...datosArticulos);
                    await page.close();
                }
            }
        }
    } catch (error) {
        throw error;
    } finally {
        await browser.close();
    }

    return datos;
}

async function iniciarScraping() {
    try {
        // Si los datos de productos aún no se han obtenido, se obtienen
        if (!datosProductos) {
            datosProductos = await obtenerDatosProductos(productos);
            console.table(datosProductos);
        }
    } catch (error) {
        console.error(error);
    }
}

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
