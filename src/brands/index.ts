import { env } from '@/config/env';
import * as default2 from './default2';
import * as default1 from './default1';

const brands = {
  default2,
  default1,
};

export const brand = brands[env.EXPO_PUBLIC_BRAND as keyof typeof brands];