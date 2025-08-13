## ✅ Passo 1 — Setup de Configurações Iniciais

> Leia com atenção antes de executar qualquer outro passo.

### 📁 1.1 — Inicialização do Projeto

- [x] Criar projeto com Expo:
  ```bash
  npx create-expo-app@latest passenger-app -t expo-template-blank-typescript
  ```

- [x] Instalar dependências:
  ```bash
  expo install react-native-maps expo-location expo-notifications
  npm install zustand zod @hookform/resolvers react-hook-form react-query socket.io-client styled-components
  npm install --save-dev jest @testing-library/react-native @testing-library/jest-native babel-jest @types/jest
  npm install lottie-react-native
  npm install react-native-google-places-autocomplete react-native-get-random-values
  ```

- [x] Configurar polyfill crypto no `index.ts`:
  ```ts
  import 'react-native-get-random-values'; // DEVE ser a primeira importação
  import { registerRootComponent } from 'expo';
  ```

- [x] Criar estrutura de pastas:
  ```
  /src
    /api
    /config
    /context
    /features
    /hooks
    /mocks
    /navigation
    /screens
    /stores
    /theme
    /types
    /utils
    /components
  ```

---

### ⚙️ 1.2 — Configuração de Variáveis de Ambiente

- [x] Criar arquivos `.env.development`, `.env.test`, `.env.production`
- [x] Exemplo de conteúdo:
  ```env
  EXPO_PUBLIC_API_URL=https://api.seuservidor.com
  EXPO_PUBLIC_SOCKET_URL=https://socket.seuservidor.com
  EXPO_PUBLIC_ENVIRONMENT=development
  EXPO_PUBLIC_GOOGLE_MAPS_KEY=SUA_CHAVE
  ```

- [x] Criar `src/config/env.ts`:
  ```ts
  import { z } from 'zod';

  const envSchema = z.object({
    EXPO_PUBLIC_API_URL: z.string().url(),
    EXPO_PUBLIC_SOCKET_URL: z.string().url(),
    EXPO_PUBLIC_ENVIRONMENT: z.enum(['development', 'test', 'production']),
    EXPO_PUBLIC_GOOGLE_MAPS_KEY: z.string()
  });

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Erro ao validar variáveis de ambiente', parsed.error.format());
    throw new Error('Variáveis de ambiente inválidas.');
  }

  export const env = parsed.data;
  ```

---

### 🎨 1.3 — Styled Components com Tema Light/Dark

- [x] Criar `src/theme/light.ts` e `dark.ts`:
  ```ts
  export const lightTheme = {
    background: '#ffffff',
    text: '#222222',
    primary: {
      100: '#E3F2FD',
      300: '#64B5F6',
      500: '#2196F3',
      700: '#1976D2'
    },
  };
  ```

- [x] Criar `ThemeProvider` usando `styled-components/native`
- [x] Usar `useColorScheme()` para alternância
- [x] Sempre usar: `background: theme.primary[300]` em vez de `"red"`

---

### 🧪 1.4 — Configuração de Testes

- [x] Adicionar no `package.json`:
  ```json
  "jest": {
    "preset": "jest-expo",
    "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]
  }
  ```

- [x] Criar teste dummy em `__tests__/App.test.tsx`

---

### 🧱 1.5 — Zustand Stores

- [x] Criar `authStore` para login/token
- [x] Criar `socketStore` para conexão do socket
- [x] Criar `mapStore` para localização, modo satélite, etc

---

### 📡 1.6 — React Query

- [x] Criar `QueryClientProvider` global
- [x] Configurar mutations/queries com tipagem
- [x] Criar `src/api/apiClient.ts` para redirecionamento entre mocks e API real

> ⚠️ **IMPORTANTE:** 
> - React Query agora é **@tanstack/react-query** (não mais 'react-query')
> - O queryClient deve ser importado de `@/config/queryClient`
> - Use `queryClient.invalidateQueries({ queryKey: ['key'] })` (nova sintaxe)
> - Sempre importe o queryClient das configurações, nunca crie uma nova instância

  ```ts
  import { env } from '@/config/env';
  import { sessionMock } from '@/mocks/session';

  export const api = {
    post: async (url: string, data: any) => {
      if (env.EXPO_PUBLIC_ENVIRONMENT === 'test') {
        if (url === '/session/mobile') return sessionMock.POST(data);
      }

      const res = await fetch(`${env.EXPO_PUBLIC_API_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      return res.json();
    },
  };
  ```

---

### 🧪 1.7 — Mocks de API

- [x] Criar `src/mocks/session.ts`:
  ```ts
  export const sessionMock = {
    POST: async (data) => ({
      token: 'fake-token',
      refreshToken: 'fake-refresh',
      user: { id: 1, name: 'Usuário Fictício' }
    }),
  };
  ```

---

### 🔌 1.8 — Socket.IO

- [x] Criar `src/config/socket.ts`:
  ```ts
  import { io } from 'socket.io-client';
  import { env } from '@/config/env';

  export const socket = io(env.EXPO_PUBLIC_SOCKET_URL, {
    transports: ['websocket'],
  });
  ```

- [x] Criar `SocketContext` + `useSocket` para uso global

---

### 📲 1.9 — Push Notifications

- [x] Usar `expo-notifications`
- [x] Criar função `setupNotifications()`:
  - Solicita permissão
  - Retorna token
  - Salva token no Zustand/back-end

---

### 💬 1.10 — Toast / Notificações Internas do Sistema

- [x] Criar `NotificationContext` em `src/context/NotificationContext.tsx`
- [x] Criar hook `useNotification()` para disparar toasts personalizados
- [x] Usar `react-native-toast-message` ou similar
- [ ] Exemplo de uso:
  ```ts
  const { notify } = useNotification();
  notify.success("Login realizado com sucesso!");
  notify.error("Erro ao buscar dados.");
  ```

---

### 🧭 1.11 — Navegação e Rotas (Autenticadas vs Não-Autenticadas)

- [x] Usar `@react-navigation/native` com `@react-navigation/native-stack`
- [x] Criar estrutura:
  ```
  /src/navigation
    - AuthNavigator.tsx (login)
    - AppNavigator.tsx (rotas autenticadas)
    - RootNavigator.tsx (decide qual usar)
  ```

- [x] Somente a tela de **Login** é pública por enquanto
- [x] Após login, redirecionar para rotas autenticadas

---

### 🚫 1.12 — Controle de Modal Único

> Evitar abrir múltiplos modais simultaneamente — isso **quebra no iOS**.

- [x] Criar `ModalManagerContext`
- [x] Fornecer função `openModal(id)` que fecha qualquer outro antes
- [ ] Exemplo:
  ```ts
  const { openModal } = useModalManager();
  openModal('avaliarCorrida'); // fecha qualquer outro antes
  ```

- [x] Centralizar os modais em um único lugar (componente global `ModalHost`)
- [x] Cada modal deve ter `id` único e respeitar o estado global de exibição

---
