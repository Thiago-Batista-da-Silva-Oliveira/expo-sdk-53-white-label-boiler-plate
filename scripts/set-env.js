const fs = require('fs');
const path = require('path');

const env = process.argv[2];
if (!env) {
  console.error('❌ Ambiente não especificado. Use: test, development ou production');
  process.exit(1);
}

const envFiles = {
  test: '.env.test',
  development: '.env.development',
  production: '.env.production'
};

const sourceFile = envFiles[env];
if (!sourceFile) {
  console.error('❌ Ambiente inválido. Use: test, development ou production');
  process.exit(1);
}

const sourcePath = path.join(__dirname, '..', sourceFile);
const targetPath = path.join(__dirname, '..', '.env.development');

if (!fs.existsSync(sourcePath)) {
  console.error(`❌ Arquivo ${sourceFile} não encontrado`);
  process.exit(1);
}

try {
  const content = fs.readFileSync(sourcePath, 'utf8');
  fs.writeFileSync(targetPath, content);
  console.log(`✅ Ambiente configurado para: ${env.toUpperCase()}`);
  console.log(`📁 Copiado: ${sourceFile} → .env.development`);
} catch (error) {
  console.error('❌ Erro ao configurar ambiente:', error.message);
  process.exit(1);
}