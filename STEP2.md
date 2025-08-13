## 🔐 Passo 2 — Tela de Login

### 📄 2.1 — Schema com Zod

- [x] Criar schema:
  ```ts
  import { z } from 'zod';

  export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  ```

---

### 🧾 2.2 — Formulário com React Hook Form

- [x] Criar `LoginScreen.tsx`
- [x] Campos:
  - [x] Email
  - [x] Senha
  - [x] Botão de Login

- [x] Validar com `zodResolver`
- [x] Exibir mensagens de erro inline

---

### 🔐 2.3 — Autenticação

- [x] Usar `useMutation` com API `/session/mobile`
- [x] No `onSuccess`:
  - [x] Salvar token, refreshToken e user no `authStore`
  - [x] Redirecionar para AppNavigator (rotas autenticadas)
- [x] Testar login com mock e com API real

---