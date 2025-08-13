# 🚘 Projeto BoilerPlate - Sistema Padrão White Label

Aplicativo feito com **React Native (Expo SDK 53)** usando:

- TypeScript
- Zustand
- Zod
- expo-router
- React Hook Form
- React Query
- Socket.IO
- Styled-components com suporte a tema claro/escuro
- LottieFiles
- Jest + Testing Library
- Múltiplos ambientes (dev/test/prod)
- Mock de rotas para ambiente de testes
- Push Notifications
- Autenticação via API
- Toasts internos (notificações locais)
- react-native-google-places-autocomplete
- react-native-get-random-values (polyfill para crypto)
- Controle único de modais no app
- @expo/vector-icons

---

## 🚨 REGRAS IMPORTANTES - LEIA ANTES DE CONTINUAR

> ⚠️ **ATENÇÃO:** Essas regras são OBRIGATÓRIAS para manter a consistência do projeto:

### VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.

### Estrutura de navegação usando a pasta app

### 📦 Dependências e Imports
- **React Query:** Use `@tanstack/react-query` (NÃO `react-query`)
- **QueryClient:** SEMPRE importe de `@/config/queryClient` - NUNCA crie nova instância
- **Sintaxe Query:** Use `queryClient.invalidateQueries({ queryKey: ['key'] })` (nova sintaxe)
- **Mutations:** Use `isPending` ao invés de `isLoading` para mutations

### 🔌 API e Mocks
- **Estrutura:** Todo endpoint deve ter mock correspondente em `/src/mocks/`
- **Ambiente:** Mocks funcionam apenas com `EXPO_PUBLIC_ENVIRONMENT=test`
- **apiClient:** Sempre usar `api.post()`, `api.get()`, `api.put()`, `api.delete()` do apiClient

### Ícones
- **Expo Vector Icons** De prioridade para usar ícones do expo vector icons

### 🎨 Estilização
- **Tema:** SEMPRE usar `theme.primary[500]` ao invés de cores hardcoded
- **Styled-components:** Usar `styled-components/native` para todos os componentes
- **Responsividade:** Suportar tema claro/escuro automaticamente
- **Theme Types:** Arquivo `src/theme/styled.d.ts` é OBRIGATÓRIO para tipagem do styled-components
- **useTheme:** SEMPRE importar `useTheme` de `@/theme` (não do styled-components)

### 🧪 Testes e Validação
- **Zod:** Toda entrada de dados deve ter schema Zod
- **TypeScript:** Tipagem rigorosa obrigatória
- **Hooks:** Prefixar hooks customizados com `use`
- **Lint:** SEMPRE rodar `npm run lint` antes de commit
- **TypeCheck:** SEMPRE rodar `npm run typecheck` antes de commit
- **Test:** SEMPRE rodar `npm test` para testar projeto completo
- **Test:** SEMPRE rodar `npm run start:test` para testar projeto completo
- **Build:** SEMPRE rodar `npm run build` para validar projeto completo

### 📋 Scripts Disponíveis
- **`npm run lint`** - Executa ESLint com correção automática (apenas src/)
- **`npm run lint:check`** - Verifica ESLint sem correções (apenas src/)
- **`npm run typecheck`** - Verifica tipos TypeScript (ESSENCIAL)
- **`npm run prettier`** - Formata código com Prettier
- **`npm run build`** - Valida projeto (typecheck - mais leve)
- **`npm test`** - Executa testes Jest

### ⚠️ **IMPORTANTE - Configuração Simplificada:**
- **ESLint** configurado apenas para TypeScript básico
- **Sem dependências extras** que conflitam com Expo
- **Scripts focam apenas na pasta src/**
- **Build script prioriza typecheck** (mais importante)

---

> **Dica:** Utilize os checkboxes `[ ]` e `[x]` para acompanhar o progresso do projeto.