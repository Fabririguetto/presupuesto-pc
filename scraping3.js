import puppeteer from "puppeteer";

async function obtenerDatosArticulos(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);

    // Esperar a que se carguen los artículos
    await page.waitForSelector('.product-description');

    const datosArticulos = await page.evaluate(() => {
        const articulos = document.querySelectorAll('.product-description');
        const datos = [];
    
        articulos.forEach(articulo => {
            const nombreVendedor = articulo.querySelector('.subtitle').textContent.trim();
            const nombreArticulo = articulo.querySelector('.product-title.line-clamp').textContent.trim(); // Aquí se obtiene el nombre del artículo
            const precioElemento = articulo.querySelector('h2[itemprop="price"]');
            const precio = precioElemento ? precioElemento.textContent.trim() : 'Precio no disponible';
            datos.push({ nombreArticulo, nombreVendedor, precio }); // Se agrega el nombre del artículo al objeto de datos
        });
    
        return datos;
    });

    await browser.close();
    return datosArticulos;
}

// URL de la página que contiene los artículos
const url = 'https://www.hardgamers.com.ar/search?text=gabinete&page=4&limit=21';

obtenerDatosArticulos(url)
    .then(datos => {
        console.log('Datos de los artículos:');
        datos.forEach((articulo, index) => {
            console.log('-----------------------------');
            console.log(`Artículo ${index + 1}:`);
            console.log(`Nombre del vendedor: ${articulo.nombreVendedor}`);
            console.log(`producto: ${articulo.nombreArticulo}`);
            console.log(`Precio: ${articulo.precio}`);
            console.log('-----------------------------');
        });
    })
    .catch(error => console.error('Error:', error));
