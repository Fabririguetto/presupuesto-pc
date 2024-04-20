import puppeteer from "puppeteer";
import { createInterface } from 'readline';

const productos = {
    procesador: [
        { nombre: 'CompraGamer', url: 'https://compragamer.com/producto/Procesador_AMD_Ryzen_5_8600G_5_0GHz_AM5_15206', selector: '.precio-especial' },
        { nombre: 'Maximus', url: 'https://www.maximus.com.ar/Producto/PC-Oficina-Intel-Celeron-G5905-RAM-8GB-SSD-240GB-WIFI/ITEM=13575/maximus.aspx?PN=PC-Armada-Baja-3332', selector: '#final-price' },
        { nombre: 'Mexx', url: 'https://www.mexx.com.ar/productos-rubro/procesadores/46865-procesador-amd-ryzen-5-8600g-5.3-ghz-am5.html', selector: '.main-price > b:nth-child(2)' },
        { nombre: 'slot-one', url: 'https://www.slot-one.com.ar/productos/microprocesador-amd-ryzen-5-8600g-c-video-con-cooler-am5/#product-gallery', selector: '#precioEfectivoLeren' },
        { nombre: 'fullh4rd', url: 'https://www.fullh4rd.com.ar/prod/27045/micro-amd-ryzen-5-8600g-c-video-c-cooler-am5', selector: '.price-num' },
        { nombre: 'hardcorecomputacion', url: 'https://hardcorecomputacion.com.ar/producto/micro-amd-ryzen-5-8600g-am5/', selector: '.price.product-page-price .woocommerce-Price-amount.amount bdi'},
        { nombre: 'hypergaming', url: 'https://www.hypergaming.com.ar/procesadores/amd/procesador-amd-ryzen-5-8600g-am5-124720.html', selector: '.precio' },
        { nombre: 'venex', url: 'https://www.venex.com.ar/componentes-de-pc/microprocesadores/microprocesador-cpu-amd-ryzen-5-8600g-6-12-5ghz-am5.html', selector: '.price-content-product' },
    ],
    placa: [
        { nombre: 'CompraGamer', url:    'https://compragamer.com/producto/Mother_Asrock_A620M_HDV_M_2_AM5_DDR5_14719', selector: '.precio-especial' },
        { nombre: 'Maximus', url: 'https://www.maximus.com.ar/Producto/Motherboard-MSI-A620M-E-PRO-DDR5-AM5/ITEM=13585/maximus.aspx?PN=911-7E28-001', selector: '#final-price' },
        { nombre: 'Mexx', url: 'https://www.mexx.com.ar/productos-rubro/motherboards/46348-motherboard-am5-msi-pro-a620m-e.html', selector: '.main-price > b:nth-child(2)' },
        { nombre: 'slot-one', url: 'https://www.slot-one.com.ar/productos/motherboard-gigabyte-b650m-k-1-0-copia/', selector: '#precioEfectivoLeren' },
        { nombre: 'fullh4rd', url: 'https://www.fullh4rd.com.ar/prod/26527/mother-msi-pro-a620m-e-ddr5-am5', selector: '.price-num' },
        { nombre: 'hardcorecomputacion', url: 'https://hardcorecomputacion.com.ar/producto/mother-asrock-a620m-hdv-am5/', selector: '.price.product-page-price .woocommerce-Price-amount.amount bdi'},
        { nombre: 'hypergaming', url: 'https://www.hypergaming.com.ar/motherboards/mother-amd/mother-pro-a620m-e-msi-am5-124602.html', selector: '.precio' },
        { nombre: 'venex', url: 'https://www.venex.com.ar/motherboards/amd/motherboard-msi-pro-b650m-a-wifi-am5.html', selector: '.price-content-product' },
    ],
    memoria: [
        { nombre: 'CompraGamer', url: 'https://compragamer.com/producto/Memoria_Team_DDR5_16GB_5600MHz_Elite_Plus_CL46_Black_15515', selector: '.precio-especial' },
        { nombre: 'Maximus', url: 'https://www.maximus.com.ar/Producto/Memoria-Ram-Patriot-Venom-16GB-2x8GB-5200-Mhz-DDR5/ITEM=13584/maximus.aspx?PN=PVV516G520C36K', selector: '#final-price' },
        { nombre: 'Mexx', url: 'https://www.mexx.com.ar/productos-rubro/memorias-ram/47103-memoria-ram-ddr5-16gb-4800-mhz-crucial.html', selector: '.main-price > b:nth-child(2)' },
        { nombre: 'Slot-one', url: 'https://www.slot-one.com.ar/productos/memoria-crucial-8gb-ddr5-4800mhz-udimm/', selector: '#precioEfectivoLeren' },
        { nombre: 'FullHard', url: 'https://www.fullh4rd.com.ar/prod/21365/memoria-16gb-ddr5-4800-kingston-fury-beast-black', selector: '.price-num' },
        { nombre: 'HardCORE Rosario', url: 'https://hardcorecomputacion.com.ar/producto/memoria-kingston-fury-beast-16gb-ddr5-4800mhz/', selector: '.price.product-page-price .woocommerce-Price-amount.amount bdi'},
        { nombre: 'HyperGaming', url: 'https://www.hypergaming.com.ar/memorias-ram/memoria-pc/memoria-8gb-4800mhz-ddr5-udimm-crucial-124710.html', selector: '.precio' },
        { nombre: 'Venex', url: 'https://www.venex.com.ar/memorias-ram/pc-de-escritorio/memoria-ram-pny-ddr5-16gb-4800mhz-performance.html', selector: '.price-content-product' },
    ],
    
    disco: [
        { nombre: 'CompraGamer', url: 'https://compragamer.com/producto/Disco_Solido_SSD_Team_1TB_GX2_530MB_s_10112', selector: '.precio-especial' },
        { nombre: 'Maximus', url: 'https://www.maximus.com.ar/Producto/Disco-Solido-SSD-960GB-Lexar-NQ100-SATA-III/ITEM=12713/maximus.aspx?PN=LNQ100X960G-RNNNU', selector: '#final-price' },
        { nombre: 'Mexx', url: 'https://www.mexx.com.ar/productos-rubro/almacenamiento/41247-disco-solido-ssd-1tb-pny-sc900.html', selector: '.main-price > b:nth-child(2)' },
        { nombre: 'Slot-one', url: 'https://www.slot-one.com.ar/productos/disco-solido-ssd-crucial-1tb-bx500/', selector: '#precioEfectivoLeren' },
        { nombre: 'FullHard', url: 'https://www.fullh4rd.com.ar/prod/26455/hd-ssd-960gb-acer-sa100-sata-iii-25-simil-1tb', selector: '.price-num' },
        { nombre: 'HardCORE Rosario', url: 'https://hardcorecomputacion.com.ar/producto/disco-ssd-acer-sa100-960gb-sata/', selector: '.price.product-page-price .woocommerce-Price-amount.amount bdi' },
        { nombre: 'HyperGaming', url: 'https://www.hypergaming.com.ar/almacenamiento/disco-ssd/disco-ssd-960gb-sata-markvision-bulk-121781.html', selector: '.precio' },
        { nombre: 'Venex', url: 'https://www.venex.com.ar/discos-solidos-ssd/disco-solido-1tb-hikvision-e100-sata.html', selector: '.price-content-product' },
    ],
    
    fuente: [
        { nombre: 'CompraGamer', url: 'https://compragamer.com/producto/Fuente_Antec_550W_80_Plus_Bronze_CSK550_15110', selector: '.precio-especial' },
        { nombre: 'Maximus', url: 'https://www.maximus.com.ar/Producto/Fuente-550W-Aureox-ARXGU-80-PLUS-Bronze/ITEM=7188/maximus.aspx?PN=ARXGU-80PBZ-550W', selector: '#final-price' },
        { nombre: 'Mexx', url: 'https://www.mexx.com.ar/productos-rubro/fuentes-de-poder/46335-fuente-gamemax-vp-500-500w-80-plus-bronze-rgb.html', selector: '.main-price > b:nth-child(2)' },
        { nombre: 'Slot-one', url: 'https://www.slot-one.com.ar/productos/fuente-sentey-500w-80-plus-bronze-hbp500-gs/', selector: '#precioEfectivoLeren' },
        { nombre: 'FullHard', url: 'https://www.fullh4rd.com.ar/prod/26891/fuente-500w-sentey-hbp500-gs-80-plus-bronze', selector: '.price-num' },
        { nombre: 'HardCORE Rosario', url: 'https://hardcorecomputacion.com.ar/producto/fuente-gigabyte-gp-p550b-550w-80bronce/', selector: '.price.product-page-price .woocommerce-Price-amount.amount bdi' },
        { nombre: 'HyperGaming', url: 'https://www.hypergaming.com.ar/fuentes/todo-en-fuentes/fuente-550w-80+-bronze-aureox-120989.html', selector: '.precio' },
        { nombre: 'Venex', url: 'https://www.venex.com.ar/componentes-de-pc/fuentes/fuente-redragon-500w-80--bronze.html', selector: '.price-content-product' },
    ],
    
    gabinete: [
        { nombre: 'CompraGamer', url: 'https://compragamer.com/producto/Gabinete_Kolink_Inspire_X1_Vidrio_Templado_1x120mm_ARGB_11411', selector: '.precio-especial' },
        { nombre: 'Maximus', url: 'https://www.maximus.com.ar/Producto/Gabinete-Xigmatek-Vortex-Fixed-RGB-Rainbow-Fan/ITEM=7806/maximus.aspx?PN=EN-46171', selector: '#final-price' },
        { nombre: 'Mexx', url: 'https://www.mexx.com.ar/productos-rubro/gabinetes/45851-gabinete-mid-tower-gamemax-shine-argb-1-fan.html', selector: '.main-price > b:nth-child(2)' },
        { nombre: 'Slot-one', url: 'https://www.slot-one.com.ar/productos/gabinete-magnumtech-436b-fan-blue-led/', selector: '#precioEfectivoLeren' },
        { nombre: 'FullHard', url: 'https://www.fullh4rd.com.ar/prod/27213/gabinete-c-fuente-600w-aconcawa-ultimate-gaming-rgb', selector: '.price-num' },
        { nombre: 'HardCORE Rosario', url: 'https://hardcorecomputacion.com.ar/producto/gabinete-corsair-spec-delta-rgb-glass/', selector: '.price.product-page-price .woocommerce-Price-amount.amount bdi' },
        { nombre: 'HyperGaming', url: 'https://www.hypergaming.com.ar/gabinetes/todo-en-gabinetes/gabinete-infinity-tg-mesh-frgb-xigmatek-122138.html', selector: '.precio' },
        { nombre: 'Venex', url: 'https://www.venex.com.ar/componentes-de-pc/gabinetes/gabinete-gamemax-h601-br-negro---rojo.html', selector: '.price-content-product' },
    ],
};

async function getResult(nombre, url, selector) {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();

    await page.goto(url);

    const result = await page.evaluate((selector) => {
        const element = document.querySelector(selector);

        if (element) {
            const precioTexto = element.textContent.trim();
            // No eliminar el símbolo "$" del texto
            const precio = precioTexto.trim();
            return {
                precio
            };
        } else { 
            return {
                error: 'Elemento no encontrado'
            };
        }
    }, selector);

    await browser.close();
    return result;
}


async function obtenerResultados(urls) {
    for (const sitio of urls) {
        const { nombre, url, selector } = sitio;
        const precio = await getResult(nombre, url, selector);
        console.log(`${nombre}: ${precio.precio}`);
    }
}

async function obtenerResultadosParaTipo(tipo) {
    const urls = productos[tipo.toLowerCase()];
    if (!urls) {
        throw new Error('Tipo de producto no válido');
    }
    
    return obtenerResultados(urls);
}

async function mostrarPreciosTodosProductos() {
    try {
        const tiposProductos = Object.keys(productos);

        console.log('Precios de todos los productos:');
        for (const tipo of tiposProductos) {
            const urls = productos[tipo];
            console.log(`--- ${tipo.toUpperCase()} ---`);
            await obtenerResultados(urls);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Solicitar al usuario el tipo de producto
const readline = createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Ingrese el tipo de producto (procesador, placa, memoria, disco, fuente, gabinete), o presione Enter para mostrar todos: ', async tipoProducto => {
    try {
        if (tipoProducto.trim() === '') {
            await mostrarPreciosTodosProductos();
        } else {
            const resultados = await obtenerResultadosParaTipo(tipoProducto);
            console.log('Resultados obtenidos:', resultados);
        }
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        readline.close();
    }
});