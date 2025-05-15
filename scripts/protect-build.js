const fs = require('fs');
const path = require('path');
const { obfuscationOptions, addSelfDestructCode, processDirectory } = require('./protect-code');

// Directorio de build de Astro
const buildDir = path.join(__dirname, '..', 'dist');
const protectedBuildDir = path.join(__dirname, '..', 'protected-dist');

// Procesar el directorio de build
console.log('Protegiendo archivos del build...');
processDirectory(buildDir, protectedBuildDir);

// Reemplazar el directorio original con el protegido
fs.rmSync(buildDir, { recursive: true, force: true });
fs.renameSync(protectedBuildDir, buildDir);

console.log('✅ Build protegido completado. El código ahora está protegido contra robo.');
