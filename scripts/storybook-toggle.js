#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.ts');

const appMode = `import 'react-native-get-random-values';
// Para executar o Storybook, comente a linha abaixo e descomente a do Storybook
import 'expo-router/entry';
// import { registerRootComponent } from 'expo';
// import StorybookUIRoot from './Storybook';
// registerRootComponent(StorybookUIRoot);
`;

const storybookMode = `import 'react-native-get-random-values';
// Para executar o Storybook, comente a linha abaixo e descomente a do Storybook
// import 'expo-router/entry';
import { registerRootComponent } from 'expo';
import StorybookUIRoot from './Storybook';
registerRootComponent(StorybookUIRoot);
`;

const mode = process.argv[2];

if (mode === 'storybook') {
  fs.writeFileSync(indexPath, storybookMode);
  console.log('🎨 Storybook ativado! Execute "npm start" para ver os componentes.');
} else if (mode === 'app') {
  fs.writeFileSync(indexPath, appMode);
  console.log('📱 App normal ativado! Execute "npm start" para usar o app.');
} else {
  console.log(`
Uso: node scripts/storybook-toggle.js [modo]

Modos disponíveis:
  storybook  - Ativa o Storybook
  app        - Ativa o app normal

Exemplos:
  node scripts/storybook-toggle.js storybook
  node scripts/storybook-toggle.js app
  `);
}