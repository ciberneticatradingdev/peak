const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Configuración de la ofuscación
const obfuscationOptions = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: true,
  debugProtectionInterval: true,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: true,
  rotateStringArray: true,
  selfDefending: true,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: false
};

// Función para añadir código de auto-destrucción
function addSelfDestructCode(code, domainWhitelist = ['localhost', 'zoomie.io']) {
  // Código que se auto-destruye si se ejecuta en un dominio no autorizado
  const selfDestructCode = `
    (function() {
      try {
        // Verificar si el dominio está en la lista blanca
        const currentDomain = window.location.hostname;
        const allowedDomains = ${JSON.stringify(domainWhitelist)};
        const isAllowed = allowedDomains.some(domain => 
          currentDomain === domain || currentDomain.endsWith('.' + domain)
        );
        
        // Si no está en la lista blanca, destruir la aplicación
        if (!isAllowed) {
          // Eliminar todos los elementos del DOM
          document.body.innerHTML = '';
          document.head.innerHTML = '';
          
          // Crear mensaje de error
          const errorDiv = document.createElement('div');
          errorDiv.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#f00;color:#fff;display:flex;justify-content:center;align-items:center;font-size:24px;text-align:center;z-index:9999;';
          errorDiv.innerHTML = '<p>Acceso no autorizado detectado.<br>Este código está protegido contra el robo.</p>';
          document.body.appendChild(errorDiv);
          
          // Desactivar todas las funciones
          window.addEventListener = function(){};
          window.removeEventListener = function(){};
          document.addEventListener = function(){};
          document.removeEventListener = function(){};
          
          // Lanzar errores aleatorios para romper cualquier funcionalidad
          setInterval(() => {
            throw new Error('UNAUTHORIZED_ACCESS_DETECTED');
          }, 100);
          
          return false;
        }
        return true;
      } catch (e) {
        console.error('Error en la verificación de seguridad:', e);
        return false;
      }
    })();
  `;
  
  // Insertar el código de auto-destrucción al principio del archivo
  return selfDestructCode + '\n' + code;
}

// Función para procesar un archivo JS
function processJsFile(filePath, outputPath) {
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    const codeWithSelfDestruct = addSelfDestructCode(code);
    const obfuscatedCode = JavaScriptObfuscator.obfuscate(
      codeWithSelfDestruct,
      obfuscationOptions
    ).getObfuscatedCode();
    
    fs.writeFileSync(outputPath, obfuscatedCode);
    console.log(`Archivo protegido: ${outputPath}`);
  } catch (error) {
    console.error(`Error al procesar ${filePath}:`, error);
  }
}

// Función para procesar todos los archivos JS en un directorio
function processDirectory(directory, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      const newOutputDir = path.join(outputDir, file);
      processDirectory(filePath, newOutputDir);
    } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
      const outputPath = path.join(outputDir, file);
      processJsFile(filePath, outputPath);
    } else {
      // Copiar archivos que no son JS
      const outputPath = path.join(outputDir, file);
      fs.copyFileSync(filePath, outputPath);
    }
  });
}

// Exportar funciones y configuraciones para que puedan ser utilizadas por otros scripts
module.exports = {
  obfuscationOptions,
  addSelfDestructCode,
  processJsFile,
  processDirectory
};

console.log('✅ Script de protección de código cargado correctamente.');
console.log('⚠️  IMPORTANTE: Asegúrate de actualizar la lista de dominios permitidos en el script.');
