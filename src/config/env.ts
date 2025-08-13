import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_SOCKET_URL: z.string().url(),
  EXPO_PUBLIC_ENVIRONMENT: z.enum(['development', 'test', 'production']),
  EXPO_PUBLIC_GOOGLE_MAPS_KEY: z.string(),
  EXPO_PUBLIC_BRAND: z.enum(['default1', 'default2'])
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Erro ao validar variáveis de ambiente', parsed.error.format());
  throw new Error('Variáveis de ambiente inválidas.');
}

export const env = parsed.data;