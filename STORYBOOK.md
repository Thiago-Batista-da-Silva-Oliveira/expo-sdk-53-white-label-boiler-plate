# 📚 Storybook - Documentação de Componentes

Este projeto inclui uma configuração completa do Storybook para React Native, fornecendo documentação interativa e visual de todos os componentes do sistema.

## 🚀 Como Executar o Storybook

### Instalação das Dependências
```bash
npm install
```

### Executar o Storybook
Para executar o Storybook, você tem duas opções:

#### Opção 1: Usando os comandos automatizados (Recomendado)
```bash
# Executar Storybook
npm run storybook

# Voltar ao app normal
npm run storybook:app
```

#### Opção 2: Modificação manual
1. **Edite o arquivo `index.ts`**
2. **Comente o Expo Router e descomente o Storybook:**
```typescript
import 'react-native-get-random-values';
// Para executar o Storybook, comente a linha abaixo e descomente a do Storybook
// import 'expo-router/entry';
import { registerRootComponent } from 'expo';
import StorybookUIRoot from './Storybook';
registerRootComponent(StorybookUIRoot);
```

3. **Execute o aplicativo:**
```bash
npm start
```

## 📱 Componentes Documentados

### 🔧 Componentes Base
- **Button** - Botões com diferentes variantes (primary, secondary, outline, danger)
- **Input** - Campos de entrada com validação e estilos
- **CustomModal** - Modais customizáveis com animações
- **DateTimePicker** - Seletor de data e hora

### 🏗️ Componentes Complexos
- **GooglePlacesAutocomplete** - Autocomplete de endereços (com mock)
- **CustomDrawerContent** - Conteúdo do menu lateral personalizado

### 📱 Componentes de Sistema
- **ModalHost** - Gerenciador de modais do sistema
- **PushNotificationManager** - Gerenciador de notificações push
- **SocketListenerWrapper** - Wrapper para listeners de WebSocket

## 🎨 Funcionalidades do Storybook

### Controles Interativos
- **Props Dinâmicas:** Teste diferentes valores de props em tempo real
- **Ações:** Visualize callbacks e eventos dos componentes
- **Estados:** Veja como componentes reagem a diferentes estados

### Exemplos por Componente
Cada componente inclui múltiplas variações:
- **Estados padrão e especiais** (loading, erro, sucesso)
- **Diferentes tamanhos** (small, medium, large)
- **Variantes visuais** (primary, secondary, outline)
- **Casos de uso reais**

### Temas
- **Tema Claro:** Configuração padrão do aplicativo
- **Tema Escuro:** Variações para modo escuro
- **Marcas:** Demonstração com diferentes configurações de marca

## 📱 **Interface do Storybook**

Quando executar o Storybook, você verá uma interface personalizada com:

### 📚 **Tela Principal**
- **Header azul** com título "Storybook Components"
- **Scroll vertical** através das seções de componentes
- **Design limpo e organizado** seguindo o design system

### 🔘 **Seção de Botões**
- **Linha 1:** Primary e Secondary
- **Linha 2:** Outline e Danger  
- **Linha 3:** Loading e Disabled
- **Linha 4:** Small e Large
- **Todos funcionais** e responsivos ao toque

### 📝 **Seção de Inputs**
- **Input básico** com label "Nome"
- **Input de e-mail** com teclado específico
- **Input de senha** com texto oculto
- **Input multiline** para comentários longos
- **Input com erro** demonstrando validação

### 📅 **Seção DateTimePicker**
- **Data de nascimento** - Seletor apenas de data
- **Horário** - Seletor apenas de hora  
- **Data e hora** - Seletor completo
- **Todos interativos** com formatação brasileira

### 🪟 **Seção de Modais**
- **Botão "Abrir Modal"** para demonstração
- **Modal customizável** com animação fade
- **Conteúdo de exemplo** e botão fechar
- **Funcionalidade completa** de overlay

### 🎨 **Rodapé**
- **Fundo escuro** com informações do Storybook
- **Texto explicativo** sobre a funcionalidade

## 🛠️ Estrutura dos Stories

### Localização
Todos os stories estão localizados em:
```
src/components/[Componente].stories.tsx
```

### Estrutura Padrão
```typescript
import type { Meta, StoryObj } from '@storybook/react-native';
import { ComponentName } from './ComponentName';

const ComponentMeta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  argTypes: {
    // Definição dos controles
  },
};

export default ComponentMeta;

// Stories individuais
export const Default: Story = {
  args: {
    // Props padrão
  },
};
```

## 📝 Como Adicionar Novos Stories

1. **Crie o arquivo de story:**
```bash
touch src/components/NovoComponente.stories.tsx
```

2. **Configure a estrutura básica:**
```typescript
import type { Meta, StoryObj } from '@storybook/react-native';
import { NovoComponente } from './NovoComponente';

const NovoComponenteMeta: Meta<typeof NovoComponente> = {
  title: 'Components/NovoComponente',
  component: NovoComponente,
  argTypes: {
    // Configure os controles aqui
  },
};

export default NovoComponenteMeta;
type Story = StoryObj<typeof NovoComponenteMeta>;

export const Default: Story = {
  args: {
    // Props padrão
  },
};
```

3. **Adicione variações do componente**
4. **Configure controles para props importantes**
5. **Inclua casos de uso reais**

## 🔧 Configurações

### Arquivos de Configuração
- **`.storybook/main.ts`** - Configuração principal do Storybook
- **`.storybook/preview.tsx`** - Decoradores globais e configurações de tema
- **`Storybook.tsx`** - Ponto de entrada para o Storybook

### Temas e Providers
O Storybook está configurado com:
- **ThemeProvider** - Aplicação global do tema
- **Mocks** - Configurações de ambiente para componentes
- **Decoradores** - Wrappers globais para todos os stories

## 📚 Benefícios

### Para Desenvolvedores
- **Desenvolvimento Isolado:** Teste componentes sem dependências
- **Debug Visual:** Identifique problemas visuais rapidamente
- **Documentação Viva:** Mantenha docs sempre atualizadas

### Para Designers
- **Review Visual:** Veja todos os estados dos componentes
- **Consistência:** Garanta que componentes seguem o design system
- **Feedback:** Teste variações antes da implementação

### Para a Equipe
- **Comunicação:** Linguagem comum sobre componentes
- **Onboarding:** Novos membros entendem componentes rapidamente
- **Quality Assurance:** Teste manual de todos os estados

## 🚨 Notas Importantes

- **React Native Only:** Esta configuração é específica para React Native
- **Mocks:** Componentes que dependem de APIs externas usam mocks
- **Performance:** Para melhor performance, use o Storybook apenas para desenvolvimento
- **Hot Reload:** Mudanças nos stories são refletidas automaticamente

## 📞 Suporte

Se encontrar problemas com o Storybook:
1. Verifique se todas as dependências estão instaladas
2. Confirme que está usando a versão correta do React Native
3. Verifique os mocks de componentes externos
4. Consulte a documentação oficial do Storybook para React Native