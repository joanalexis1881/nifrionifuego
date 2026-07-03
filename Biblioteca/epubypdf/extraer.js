const fs = require('fs');
const path = require('path');

try {
    // Lee exactamente tu archivo con guion medio
    const contenido = fs.readFileSync('manuscrito-limpio.html', 'utf8');
    
    // Busca la estructura de tus capítulos dentro del JavaScript
    const regex = /id:\s*'([^']+)',\s*navLabel:\s*'([^']+)',[\s\S]*?render:\s*\(\s*\)\s*=>\s*`([\s\S]*?)`/g;
    let match;
    let count = 0;
    
    // Crea la carpeta para guardar los pedacitos del libro
    const dir = path.join(__dirname, 'capitulos_epub');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    console.log('🤖 Buscando capítulos dentro de manuscrito-limpio.html...');

    // Procesa y limpia cada capítulo en milisegundos
    while ((match = regex.exec(contenido)) !== null) {
        count++;
        const id = match[1];
        const titulo = match[2];
        const cuerpoHtml = match[3].trim();

        // Le da el formato oficial que exigen los eReaders
        const plantilla = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head>
    <title>${titulo}</title>
</head>
<body>
${cuerpoHtml}
</body>
</html>`;

        // Guarda el archivo numerado
        fs.writeFileSync(path.join(dir, `${count.toString().padStart(2, '0')}_${id}.xhtml`), plantilla, 'utf8');
        console.log(`✅ Extraído con éxito: ${titulo}`);
    }
    
    console.log(`\n🎉 ¡PROCESO TERMINADO! Se han creado ${count} capítulos en la carpeta "capitulos_epub".`);
} catch (e) {
    console.error('❌ Error al procesar:', e.message);
}