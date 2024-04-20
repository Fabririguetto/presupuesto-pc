import { ConsoleMessage } from "puppeteer";

const urlsComponentes = {
    procesador: [
        { nombre: 'Compra Gamer', url: 'https://compragamer.com/producto/Procesador_AMD_Ryzen_5_8600G_5_0GHz_AM5_15206', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38449_Procesador_AMD_Ryzen_5_8600G_5.0GHz_AM5_f1bd9500-grn.jpg' },
        { nombre: 'Maximus', url: 'https://www.maximus.com.ar/Producto/Micro-AMD-Ryzen-5-8600G-50-Ghz-AM5/ITEM=13444/maximus.aspx?PN=100-100001237BOX', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38449_Procesador_AMD_Ryzen_5_8600G_5.0GHz_AM5_f1bd9500-grn.jpg' },
        { nombre: 'Mexx', url: 'https://www.mexx.com.ar/productos-rubro/procesadores/46865-procesador-amd-ryzen-5-8600g-5.3-ghz-am5.html', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38449_Procesador_AMD_Ryzen_5_8600G_5.0GHz_AM5_f1bd9500-grn.jpg' },
        { nombre: 'Slot-one', url: 'https://www.slot-one.com.ar/productos/microprocesador-amd-ryzen-5-8600g-c-video-con-cooler-am5/#product-gallery', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38449_Procesador_AMD_Ryzen_5_8600G_5.0GHz_AM5_f1bd9500-grn.jpg' },
        { nombre: 'FullHard', url: 'https://www.fullh4rd.com.ar/prod/27045/micro-amd-ryzen-5-8600g-c-video-c-cooler-am5', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38449_Procesador_AMD_Ryzen_5_8600G_5.0GHz_AM5_f1bd9500-grn.jpg' },
        { nombre: 'HardCORE Rosario', url: 'https://hardcorecomputacion.com.ar/producto/micro-amd-ryzen-5-8600g-am5/', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38449_Procesador_AMD_Ryzen_5_8600G_5.0GHz_AM5_f1bd9500-grn.jpg' },
        { nombre: 'HyperGaming', url: 'https://www.hypergaming.com.ar/procesadores/amd/procesador-amd-ryzen-5-8600g-am5-124720.html', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38449_Procesador_AMD_Ryzen_5_8600G_5.0GHz_AM5_f1bd9500-grn.jpg' },
        { nombre: 'Venex', url: 'https://www.venex.com.ar/componentes-de-pc/microprocesadores/microprocesador-cpu-amd-ryzen-5-8600g-6-12-5ghz-am5.html', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38449_Procesador_AMD_Ryzen_5_8600G_5.0GHz_AM5_f1bd9500-grn.jpg' },
    ],
    placa: [
        { nombre: 'Compra Gamer', url: 'https://compragamer.com/producto/Mother_Asrock_A620M_HDV_M_2_AM5_DDR5_14719', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_37034_Mother_Asrock_A620M-HDV_M.2__AM5_DDR5_b2ac9cd4-grn.jpg' },
        { nombre: 'Maximus', url: 'https://www.maximus.com.ar/Producto/Motherboard-MSI-A620M-E-PRO-DDR5-AM5/ITEM=13585/maximus.aspx?PN=911-7E28-001', imagen: 'https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/911-7E28-001_800.jpg' },
        { nombre: 'Mexx', url: 'https://www.mexx.com.ar/productos-rubro/motherboards/46348-motherboard-am5-msi-pro-a620m-e.html', imagen: 'https://mexx-img-2019.s3.amazonaws.com/46348_1.jpeg' },
        { nombre: 'Slot-one', url: 'https://www.slot-one.com.ar/productos/motherboard-gigabyte-b650m-k-1-0-copia/', imagen: 'https://acdn.mitiendanube.com/stores/001/018/096/products/1024-21-c583be2b5664ad5a7916951418782602-480-0.webp' },
        { nombre: 'FullHard', url: 'https://www.fullh4rd.com.ar/prod/26527/mother-msi-pro-a620m-e-ddr5-am5', imagen: 'https://www.fullh4rd.com.ar/img/productos/2/mother-msi-pro-a620me-ddr5-am5-0.jpg' },
        { nombre: 'HardCORE Rosario', url: 'https://hardcorecomputacion.com.ar/producto/mother-asrock-a620m-hdv-am5/', imagen: 'https://i0.wp.com/hardcorecomputacion.com.ar/wp-content/uploads/2023/09/A620M-HDVM.2L2.jpg?resize=500%2C500&ssl=1' },
        { nombre: 'HyperGaming', url: 'https://www.hypergaming.com.ar/motherboards/mother-amd/mother-pro-a620m-e-msi-am5-124602.html', imagen: 'https://app.contabilium.com/files/explorer/7026/Productos-Servicios/concepto-11985557.jpg' },
        { nombre: 'Venex', url: 'https://www.venex.com.ar/motherboards/amd/motherboard-msi-pro-b650m-a-wifi-am5.html', imagen: 'https://www.venex.com.ar/products_images/1688653514_b650-m-a-3.png' },
    ],
    memoria: [
        { nombre: 'Compra Gamer', url: 'https://compragamer.com/producto/Memoria_Team_DDR5_16GB_5600MHz_Elite_Plus_CL46_Black_15515', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_39215_Memoria_Team_DDR5_16GB_5600MHz_Elite_Plus_CL46_Black_2748ce97-grn.jpg' },
        { nombre: 'Maximus', url: 'https://www.maximus.com.ar/Producto/Memoria-Ram-Patriot-Venom-16GB-2x8GB-5200-Mhz-DDR5/ITEM=13584/maximus.aspx?PN=PVV516G520C36K', imagen: 'https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/PVV516G520C36K_800.jpg' },
        { nombre: 'Mexx', url: 'https://www.mexx.com.ar/productos-rubro/memorias-ram/47103-memoria-ram-ddr5-16gb-4800-mhz-crucial.html', imagen: 'https://mexx-img-2019.s3.amazonaws.com/Memoria-Ram-DDR5-16Gb-4800-Mhz-CruciaL_47103_1.jpeg' },
        { nombre: 'Slot-one', url: 'https://www.slot-one.com.ar/productos/memoria-crucial-8gb-ddr5-4800mhz-udimm/', imagen: 'https://acdn.mitiendanube.com/stores/001/018/096/products/crucial_ct8g48c40u5_8gb_ddr5_4800mhz_cl40_16673381-ca728af2b232f34b7916658602230225-480-0.webp' },
        { nombre: 'FullHard', url: 'https://www.fullh4rd.com.ar/prod/21365/memoria-16gb-ddr5-4800-kingston-fury-beast-black', imagen: 'https://www.fullh4rd.com.ar/img/productos/4/memoria-16gb-ddr5-4800-kingston-fury-beast-black-0.jpg' },
        { nombre: 'HardCORE Rosario', url: 'https://hardcorecomputacion.com.ar/producto/memoria-kingston-fury-beast-16gb-ddr5-4800mhz/', imagen: 'https://i0.wp.com/hardcorecomputacion.com.ar/wp-content/uploads/2022/01/KF548C38BB-16.jpg?w=377&ssl=1' },
        { nombre: 'HyperGaming', url: 'https://www.hypergaming.com.ar/memorias-ram/memoria-pc/memoria-8gb-4800mhz-ddr5-udimm-crucial-124710.html', imagen: 'https://app.contabilium.com/files/explorer/7026/Productos-Servicios/concepto-12822299.jpg' },
        { nombre: 'Venex', url: 'https://www.venex.com.ar/memorias-ram/pc-de-escritorio/memoria-ram-pny-ddr5-16gb-4800mhz-performance.html', imagen: 'https://www.venex.com.ar/products_images/1686840349_pny-1.png' },
    ],
    disco: [
        { nombre: 'Compra Gamer', url: 'https://compragamer.com/producto/Disco_Solido_SSD_Team_1TB_GX2_530MB_s_10112', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_18749_Disco_Solido_SSD_Team_1TB_GX2_530MB_s_7d116a15-grn.jpg' },
        { nombre: 'Maximus', url: 'https://www.maximus.com.ar/Producto/Disco-Solido-SSD-960GB-Lexar-NQ100-SATA-III/ITEM=12713/maximus.aspx?PN=LNQ100X960G-RNNNU', imagen: 'https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/LNQ100X960G-RNNNU_800.jpg' },
        { nombre: 'Mexx', url: 'https://www.mexx.com.ar/productos-rubro/almacenamiento/41247-disco-solido-ssd-1tb-pny-sc900.html', imagen: 'https://mexx-img-2019.s3.amazonaws.com/ssd-sata_41247_1.jpeg' },
        { nombre: 'Slot-one', url: 'https://www.slot-one.com.ar/productos/disco-solido-ssd-crucial-1tb-bx500/', imagen: 'https://acdn.mitiendanube.com/stores/001/018/096/products/crucial-ssd-1000gb-bx500-ct1000bx500ssd1-1-398cf64b7c7bb2eb1317126139740203-480-0.webp' },
        { nombre: 'FullHard', url: 'https://www.fullh4rd.com.ar/prod/26455/hd-ssd-960gb-acer-sa100-sata-iii-25-simil-1tb', imagen: 'https://www.fullh4rd.com.ar/img/productos/12/hd-ssd-960gb-acer-sa100-sata-iii-25-simil-1tb-0.jpg' },
        { nombre: 'HardCORE Rosario', url: 'https://hardcorecomputacion.com.ar/producto/disco-ssd-acer-sa100-960gb-sata/', imagen: 'https://i0.wp.com/hardcorecomputacion.com.ar/wp-content/uploads/2023/09/960gbacer.jpg?resize=500%2C500&ssl=1' },
        { nombre: 'HyperGaming', url: 'https://www.hypergaming.com.ar/almacenamiento/disco-ssd/disco-ssd-960gb-sata-markvision-bulk-121781.html', imagen: 'https://app.contabilium.com/files/explorer/7026/Productos-Servicios/concepto-8660029.jpg' },
        { nombre: 'Venex', url: 'https://www.venex.com.ar/discos-solidos-ssd/disco-solido-1tb-hikvision-e100-sata.html', imagen: 'https://www.venex.com.ar/products_images/1690388507_e100-1.png' },
    ],
    fuente: [
        { nombre: 'Compra Gamer', url: 'https://compragamer.com/producto/Fuente_Antec_550W_80_Plus_Bronze_CSK550_15110', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38277_Fuente_Antec_550W_80_Plus_Bronze_CSK550_67f87193-grn.jpg' },
        { nombre: 'Maximus', url: 'https://www.maximus.com.ar/Producto/Fuente-550W-Aureox-ARXGU-80-PLUS-Bronze/ITEM=7188/maximus.aspx?PN=ARXGU-80PBZ-550W', imagen: 'https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/ARXGU-80PBZ-550W_800.jpg' },
        { nombre: 'Mexx', url: 'https://www.mexx.com.ar/productos-rubro/fuentes-de-poder/46335-fuente-gamemax-vp-500-500w-80-plus-bronze-rgb.html', imagen: 'https://mexx-img-2019.s3.amazonaws.com/46335_7.jpeg' },
        { nombre: 'Slot-one', url: 'https://www.slot-one.com.ar/productos/fuente-sentey-500w-80-plus-bronze-hbp500-gs/', imagen: 'https://acdn.mitiendanube.com/stores/001/018/096/products/thumb_500x5001-b44465ef82ae47514316348450959723-480-0.webp' },
        { nombre: 'FullHard', url: 'https://www.fullh4rd.com.ar/prod/26891/fuente-500w-sentey-hbp500-gs-80-plus-bronze', imagen: 'https://www.fullh4rd.com.ar/img/productos/26/fuente-500w-sentey-hbp500gs-80-plus-bronze-0.jpg' },
        { nombre: 'HardCORE Rosario', url: 'https://hardcorecomputacion.com.ar/producto/fuente-gigabyte-gp-p550b-550w-80bronce/', imagen: 'https://i0.wp.com/hardcorecomputacion.com.ar/wp-content/uploads/2020/12/1000-9.jpg?resize=500%2C500&ssl=1' },
        { nombre: 'HyperGaming', url: 'https://www.hypergaming.com.ar/fuentes/todo-en-fuentes/fuente-550w-80+-bronze-aureox-120989.html', imagen: 'https://app.contabilium.com/files/explorer/7026/Productos-Servicios/concepto-4164542.jpg' },
        { nombre: 'Venex', url: 'https://www.venex.com.ar/componentes-de-pc/fuentes/fuente-redragon-500w-80--bronze.html', imagen: 'https://www.venex.com.ar/products_images/1596553646_ps0016.png' },
    ],
    gabinete: [
        { nombre: 'Compra Gamer', url: 'https://compragamer.com/producto/Gabinete_Kolink_Inspire_X1_Vidrio_Templado_1x120mm_ARGB_11411', imagen: 'https://imagenes.compragamer.com/productos/compragamer_Imganen_general_24223_Gabinete_Kolink_Inspire_X1_Vidrio_Templado_1x120mm_ARGB_1d63e581-grn.jpg' },
        { nombre: 'Maximus', url: 'https://www.maximus.com.ar/Producto/Gabinete-Xigmatek-Vortex-Fixed-RGB-Rainbow-Fan/ITEM=7806/maximus.aspx?PN=EN-46171', imagen: 'https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/EN-46171_800.jpg' },
        { nombre: 'Mexx', url: 'https://www.mexx.com.ar/productos-rubro/gabinetes/45851-gabinete-mid-tower-gamemax-shine-argb-1-fan.html', imagen: 'https://mexx-img-2019.s3.amazonaws.com/Gabinete-Mid-Tower-Gamemax-Shine-Argb-1-Fan_45851_1.jpeg' },
        { nombre: 'Slot-one', url: 'https://www.slot-one.com.ar/productos/gabinete-magnumtech-436b-fan-blue-led/', imagen: 'https://acdn.mitiendanube.com/stores/001/018/096/products/gabinete-magnum-tech-mt-436b1-17f467a60a5009ff6616015839291657-480-0.webp' },
        { nombre: 'FullHard', url: 'https://www.fullh4rd.com.ar/prod/27213/gabinete-c-fuente-600w-aconcawa-ultimate-gaming-rgb', imagen: 'https://www.fullh4rd.com.ar/img/productos/6/gabinete-cfuente-600w-aconcawa-ultimate-gaming-rgb-0.jpg' },
        { nombre: 'HardCORE Rosario', url: 'https://hardcorecomputacion.com.ar/producto/gabinete-corsair-spec-delta-rgb-glass/', imagen: 'https://i0.wp.com/hardcorecomputacion.com.ar/wp-content/uploads/2020/08/CC-9011166-WW-Gallery-SPEC-DELTA-01.jpg?resize=500%2C500&ssl=1' },
        { nombre: 'HyperGaming', url: 'https://www.hypergaming.com.ar/gabinetes/todo-en-gabinetes/gabinete-infinity-tg-mesh-frgb-xigmatek-122138.html', imagen: 'https://app.contabilium.com/files/explorer/7026/Productos-Servicios/concepto-9778226.png' },
        { nombre: 'Venex', url: 'https://www.venex.com.ar/componentes-de-pc/gabinetes/gabinete-gamemax-h601-br-negro---rojo.html', imagen: 'https://www.venex.com.ar/products_images/1593812595_1544519706.png' },
    ],
};

async function cargarComponentes() {
    try {
        const selectoresComponentes = Object.keys(urlsComponentes);
        for (const componente of selectoresComponentes) {
            const selectComponente = document.getElementById(componente);
            for (const proveedor of urlsComponentes[componente]) {
                const opcion = document.createElement('option');
                opcion.value = proveedor.url;
                opcion.textContent = proveedor.nombre;
                selectComponente.appendChild(opcion);
            }
            // Agregar evento 'change' a cada select
            selectComponente.addEventListener('change', function() {
                mostrarImagen('procesador');
            });
            selectComponente.addEventListener('change', function() {
                mostrarImagen('placa');
            });
            selectComponente.addEventListener('change', function() {
                mostrarImagen('memoria');
            });
            selectComponente.addEventListener('change', function() {
                mostrarImagen('disco');
            });
            selectComponente.addEventListener('change', function() {
                mostrarImagen('fuente');
            });
            selectComponente.addEventListener('change', function() {
                mostrarImagen('gabinete');
            });        }
    } catch (error) {
        console.error('Error al cargar los componentes:', error);
    }
}

function mostrarImagen(componente) {
    // Obtener el div de la imagen del componente
    const imgComponente = document.getElementById('img' + componente);

    // Obtener el valor seleccionado en el select del componente
    const selectComponente = document.getElementById(componente);
    const proveedorSeleccionado = selectComponente.value;

    // Buscar el proveedor seleccionado en los datos de URL
    const proveedor = urlsComponentes[componente].find(p => p.url === proveedorSeleccionado);

    // Crear un elemento img
    const imagen = document.createElement('img');

    if (proveedor) {
        // Asignar la URL de la imagen al atributo src del elemento img
        imagen.src = proveedor.imagen;

        // Modificar el tamaño de la imagen
        imagen.style.width = '100%'; // Ancho deseado
        imagen.style.height = 'auto'; // Altura se ajustará automáticamente para mantener la proporción

        // Limpiar el contenido anterior del div de la imagen del componente
        imgComponente.innerHTML = '';

        // Agregar la imagen al div de la imagen del componente
        imgComponente.appendChild(imagen);
    } else {
        // Limpiar el contenido anterior del div de la imagen del componente
        imgComponente.innerHTML = '';

        // Agregar la imagen al div de la imagen del componente
        imgComponente.appendChild(imagen);
    }
}

function calcularTotal() {
    let total = 0;
    const selectoresComponentes = Object.keys(urlsComponentes);
    selectoresComponentes.forEach(selector => {
        const selectComponente = document.getElementById(selector);
        const precio = selectComponente.value !== '0' ? 100 : 0; // Aquí deberías obtener el precio desde la URL seleccionada
        total += parseInt(precio);
    });

    document.getElementById('total').innerText = total;

    // Mostrar la imagen de verificación si el total es mayor que cero
    const totalImage = document.getElementById('totalImage');
    if (total > 0) {
        totalImage.style.display = 'inline-block';
    } else {
        totalImage.style.display = 'none';
    }
}

cargarComponentes();
