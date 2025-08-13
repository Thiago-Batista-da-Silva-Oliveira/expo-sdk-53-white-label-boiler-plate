# 📋 Documentação de Componentes

> Guia completo de todos os componentes disponíveis no sistema, suas props, casos de uso e exemplos.

---

## 🔧 Componentes Base

### Button
**Localização:** `src/components/Button.tsx`  
**Story:** `src/components/Button.stories.tsx`

#### Descrição
Componente de botão reutilizável com suporte a diferentes variantes, estados e tamanhos. Ideal para ações primárias, secundárias e navegação.

#### Props
```typescript
interface ButtonProps {
  title: string;                    // Texto do botão
  onPress: () => void;             // Callback ao pressionar
  loading?: boolean;               // Estado de carregamento
  disabled?: boolean;              // Desabilitar botão
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;               // Estilos customizados
}
```

#### Casos de Uso
- **Primary:** Ações principais (Login, Confirmar, Salvar)
- **Secondary:** Ações secundárias (Cancelar, Voltar)
- **Outline:** Botões sem preenchimento
- **Danger:** Ações destrutivas (Deletar, Excluir)

#### Exemplo
```tsx
<Button
  title="Fazer Login"
  onPress={handleLogin}
  variant="primary"
  size="large"
  loading={isLoading}
/>
```

---

### Input
**Localização:** `src/components/Input.tsx`  
**Story:** `src/components/Input.stories.tsx`

#### Descrição
Campo de entrada de texto com suporte a label, validação, diferentes tipos de teclado e estados de erro.

#### Props
```typescript
interface InputProps extends TextInputProps {
  label?: string;                  // Label do campo
  error?: string;                  // Mensagem de erro
  containerStyle?: any;            // Estilo do container
}
```

#### Casos de Uso
- **Formulários de login** (email, senha)
- **Dados pessoais** (nome, telefone)
- **Endereços e localizações**
- **Comentários e observações** (multiline)

#### Exemplo
```tsx
<Input
  label="E-mail"
  placeholder="Digite seu e-mail"
  keyboardType="email-address"
  autoCapitalize="none"
  error={errors.email}
  value={email}
  onChangeText={setEmail}
/>
```

---

### CustomModal
**Localização:** `src/components/CustomModal.tsx`  
**Story:** `src/components/CustomModal.stories.tsx`

#### Descrição
Modal customizável com animações, controle de overlay e diferentes tipos de apresentação.

#### Props
```typescript
interface CustomModalProps {
  visible: boolean;                // Visibilidade do modal
  onClose: () => void;            // Callback para fechar
  children: React.ReactNode;       // Conteúdo do modal
  animationType?: 'slide' | 'fade' | 'none';
  closeOnOverlayPress?: boolean;   // Fechar ao tocar fora
}
```

#### Casos de Uso
- **Confirmações** (excluir item, sair do app)
- **Informações** (alertas, notificações)
- **Formulários modais** (editar perfil)
- **Visualizações detalhadas**

#### Exemplo
```tsx
<CustomModal
  visible={showModal}
  onClose={() => setShowModal(false)}
  animationType="fade"
>
  <View style={{ padding: 20 }}>
    <Text>Confirma a exclusão?</Text>
    <Button title="Confirmar" onPress={handleDelete} />
  </View>
</CustomModal>
```

---

### CustomDateTimePicker
**Localização:** `src/components/DateTimePicker.tsx`  
**Story:** `src/components/DateTimePicker.stories.tsx`

#### Descrição
Seletor de data e hora com suporte a diferentes modos (data, hora, ambos) e formatação localizada em português.

#### Props
```typescript
interface DateTimePickerProps {
  label: string;                   // Label do campo
  value?: Date;                    // Data selecionada
  onChange: (date: Date) => void;  // Callback de mudança
  placeholder?: string;            // Texto do placeholder
  minimumDate?: Date;              // Data mínima
  maximumDate?: Date;              // Data máxima
  mode?: 'date' | 'time' | 'datetime';
  error?: string;                  // Mensagem de erro
}
```

#### Casos de Uso
- **Agendamentos** (data e hora)
- **Data de nascimento** (apenas data)
- **Horário de funcionamento** (apenas hora)
- **Eventos e compromissos**

#### Exemplo
```tsx
<CustomDateTimePicker
  label="Data do Agendamento"
  value={selectedDate}
  onChange={setSelectedDate}
  mode="datetime"
  minimumDate={new Date()}
  error={errors.date}
/>
```

---

## 🏗️ Componentes Complexos

### GooglePlacesAutocomplete
**Localização:** `src/components/GooglePlacesAutocomplete.tsx`  
**Story:** `src/components/GooglePlacesAutocomplete.stories.tsx`

#### Descrição
Autocomplete de endereços integrado com Google Places API, incluindo botão de favoritos e extração automática de cidades.

#### Props
```typescript
interface GooglePlacesAutocompleteProps {
  onPlaceSelect: (address: string, lat: number, lng: number, city?: string) => void;
  onFavoritesPress: () => void;    // Callback do botão favoritos
  placeholder?: string;            // Placeholder do input
  label?: string;                  // Label do campo
  error?: string;                  // Mensagem de erro
  zIndex?: number;                 // Z-index para sobreposição
  value?: string;                  // Valor atual
  showCurrentLocationText?: boolean; // Mostrar texto de localização atual
}
```

#### Casos de Uso
- **Endereço de origem** em apps de transporte
- **Endereço de destino** em entregas
- **Localização de eventos**
- **Endereços de cadastro**

#### Exemplo
```tsx
<GooglePlacesAutocomplete
  label="De onde você está saindo?"
  onPlaceSelect={(address, lat, lng, city) => {
    setOrigin({ address, coordinates: { lat, lng }, city });
  }}
  onFavoritesPress={() => openFavoritesModal()}
  error={errors.origin}
/>
```

---

### CustomDrawerContent
**Localização:** `src/components/CustomDrawerContent.tsx`  
**Story:** `src/components/CustomDrawerContent.stories.tsx`

#### Descrição
Conteúdo personalizado do menu lateral (drawer) com logo da marca, menu de navegação e opção de logout.

#### Props
```typescript
interface DrawerContentComponentProps {
  state: NavigationState;          // Estado da navegação
  navigation: DrawerNavigationProp; // Prop de navegação
  descriptors: any;                // Descritores das rotas
}
```

#### Casos de Uso
- **Menu de navegação principal**
- **Informações da marca/empresa**
- **Opções de logout**
- **Navegação entre seções do app**

#### Exemplo
```tsx
// Usado automaticamente pelo React Navigation Drawer
<Drawer.Navigator
  drawerContent={(props) => <CustomDrawerContent {...props} />}
>
  <Drawer.Screen name="home" component={HomeScreen} />
</Drawer.Navigator>
```

---

## 📱 Componentes de Sistema

### ModalHost
**Localização:** `src/components/ModalHost.tsx`  
**Story:** `src/components/ModalHost.stories.tsx`

#### Descrição
Gerenciador de modais do sistema com animações suaves e controle centralizado de estado.

#### Props
```typescript
interface ModalHostProps {
  modalId: string;                 // ID único do modal
  children: React.ReactNode;       // Conteúdo do modal
  transparent?: boolean;           // Fundo transparente
  animationType?: 'none' | 'slide' | 'fade';
  closeOnBackdropPress?: boolean;  // Fechar ao tocar fora
}
```

#### Casos de Uso
- **Sistema de modais centralizados**
- **Gerenciamento de estado de modais**
- **Animações consistentes**
- **Controle de sobreposição**

#### Exemplo
```tsx
<ModalHost
  modalId="confirmDelete"
  closeOnBackdropPress={false}
>
  <ConfirmDeleteContent />
</ModalHost>
```

---

### PushNotificationManager
**Localização:** `src/components/PushNotificationManager.tsx`

#### Descrição
Gerenciador de notificações push que configura listeners e exibe notificações locais quando o app está ativo.

#### Props
Nenhuma prop - componente de sistema

#### Casos de Uso
- **Recebimento de notificações push**
- **Exibição de notificações locais**
- **Tratamento de erros de registro**
- **Integração com sistema de notificações**

#### Exemplo
```tsx
// Usado no root do app
function App() {
  return (
    <View>
      <PushNotificationManager />
      <AppContent />
    </View>
  );
}
```

---

### SocketListenerWrapper
**Localização:** `src/components/SocketListenerWrapper.tsx`

#### Descrição
Wrapper que inicializa os listeners padrão do WebSocket. Componente de sistema que não renderiza UI.

#### Props
Nenhuma prop - componente de sistema

#### Casos de Uso
- **Configuração automática de listeners WebSocket**
- **Gerenciamento de conexão em tempo real**
- **Integração com sistema de eventos**

#### Exemplo
```tsx
// Usado no root do app
function App() {
  return (
    <SocketProvider>
      <SocketListenerWrapper />
      <AppContent />
    </SocketProvider>
  );
}
```

---

## 🎨 Padrões de Design

### Cores e Temas
- **Primary:** Cor principal da marca (`theme.primary[500]`)
- **Secondary:** Cor secundária (`theme.secondary[500]`)
- **Background:** Fundo principal (`theme.background`)
- **Surface:** Superfícies elevadas (`theme.surface`)
- **Text:** Texto principal (`theme.text`)
- **Text Secondary:** Texto secundário (`theme.textSecondary`)

### Espaçamentos
- **Pequeno:** 8px
- **Médio:** 16px
- **Grande:** 24px
- **Extra Grande:** 32px

### Tipografia
- **Heading:** 28px, bold
- **Title:** 20px, bold
- **Body:** 16px, regular
- **Caption:** 14px, regular
- **Small:** 12px, regular

### Bordas e Sombras
- **Border Radius:** 8px (padrão), 12px (cards), 20px (especiais)
- **Border Width:** 1px
- **Shadow:** Configurado no tema para cada plataforma

---

## 🚀 Como Usar

### Importação
```typescript
import { Button, Input, CustomModal } from '@/components';
```

### Estilização
```typescript
// Use sempre o tema
const StyledComponent = styled.View`
  background-color: ${({ theme }) => theme.primary[500]};
  color: ${({ theme }) => theme.text};
`;
```

### Validação
```typescript
// Use Zod para validação
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

---

## 📝 Contribuição

### Adicionando Novos Componentes
1. Crie o componente em `src/components/`
2. Adicione tipagem TypeScript completa
3. Crie o arquivo `.stories.tsx`
4. Adicione testes em `__tests__/`
5. Documente neste arquivo
6. Use o tema consistentemente

### Padrões de Código
- **TypeScript rigoroso:** Sempre tipado
- **Styled Components:** Para estilização
- **Props interface:** Sempre definida
- **Tema:** Sempre usar `useTheme()`
- **Acessibilidade:** Considerar sempre

---

> **Nota:** Este é um documento vivo. Mantenha-o atualizado conforme novos componentes são adicionados ou existentes são modificados.