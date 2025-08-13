import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from '@/config/env';
import { sessionMock } from '@/mocks/session';
import { profileMock } from '@/mocks/profile';
import { useAuthStore } from '@/stores/authStore';

export class APIError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'APIError';
  }
}

interface FailedRequestQueue {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

let isRefreshing = false;
let failedRequestsQueue: FailedRequestQueue[] = [];

const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    if (error.response?.status === 401) {
      const errorData = error.response.data as any;
      
      if (errorData?.errorCode === 'session expired') {
        setTimeout(() => {
          useAuthStore.getState().clearAuth();
        }, 3000);
        return Promise.reject(new APIError('Sessão encerrada, faça login novamente.', 401));
      }
      
      if (errorData?.errorCode === 'token expired' && !originalRequest._retry) {
        const refreshToken = useAuthStore.getState().refreshToken;
        
        if (!isRefreshing && refreshToken) {
          isRefreshing = true;
          originalRequest._retry = true;
          
          try {
            const response = await axiosInstance.post('/session/refresh-token', {
              refresh_token: refreshToken,
            });
            
            const { token, refreshToken: newRefreshToken } = response.data;
            const currentUser = useAuthStore.getState().user;
            
            if (currentUser) {
              useAuthStore.getState().setAuth(currentUser, {
                token,
                refreshToken: newRefreshToken,
              });
            }
            
            failedRequestsQueue.forEach((request) => request.onSuccess(token));
            failedRequestsQueue = [];
            
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosInstance(originalRequest);
            
          } catch (refreshError) {
            failedRequestsQueue.forEach((request) => 
              request.onFailure(refreshError as AxiosError)
            );
            failedRequestsQueue = [];
            
            setTimeout(() => {
              useAuthStore.getState().clearAuth();
            }, 3000);
            
            return Promise.reject(
              new APIError('Houve um problema na validação das suas credenciais, você será deslogado.', 401)
            );
          } finally {
            isRefreshing = false;
          }
        }
        
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(axiosInstance(originalRequest));
            },
            onFailure: (error: AxiosError) => {
              reject(error);
            },
          });
        });
      }
      
      setTimeout(() => {
        useAuthStore.getState().clearAuth();
      }, 3000);
      
      return Promise.reject(
        new APIError('Houve um problema na validação das suas credenciais, você será deslogado.', 401)
      );
    }
    
    if (error.message === 'Network Error') {
      return Promise.reject(new APIError('Parece que há um problema de conexão.', 0));
    }
    
    if (error.response?.status && error.response.status >= 500) {
      return Promise.reject(
        new APIError('Houve um problema no servidor, tente novamente mais tarde.', error.response.status)
      );
    }
    
    const message = (error.response?.data as any)?.message || error.message;
    return Promise.reject(
      new APIError(message, error.response?.status || 0)
    );
  }
);

export const api = {
  post: async (url: string, data: any) => {
    if (env.EXPO_PUBLIC_ENVIRONMENT === 'test') {
      if (url === '/session/mobile') return sessionMock.POST(data);
      
      if (url === '/verificationToken/create') {
        return { success: true, message: 'Token registrado com sucesso (mock)' };
      }
      
      throw new Error(`Mock não implementado para ${url}`);
    }

    try {
      const response = await axiosInstance.post(url, data);
      return response.data.payload;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      
      const axiosError = error as AxiosError;
      throw new APIError(
        (axiosError.response?.data as any)?.message || axiosError.message || 'Network Error',
        axiosError.response?.status || 0
      );
    }
  },

  get: async (url: string, token?: string) => {
    if (env.EXPO_PUBLIC_ENVIRONMENT === 'test') {
      if (url === '/me') return profileMock.GET();
      
      throw new Error(`Mock não implementado para GET ${url}`);
    }

    try {
      const config: any = {};
      
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      
      const response = await axiosInstance.get(url, config);
      return response.data.payload;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      
      const axiosError = error as AxiosError;
      throw new APIError(
        (axiosError.response?.data as any)?.message || axiosError.message || 'Network Error',
        axiosError.response?.status || 0
      );
    }
  },

  put: async (url: string, data: any, token?: string) => {
    if (env.EXPO_PUBLIC_ENVIRONMENT === 'test') {
      if (url === '/me') return profileMock.PATCH(data);
      if (url === '/me/password') return profileMock.CHANGE_PASSWORD(data);
      if (url === '/me/avatar') return profileMock.UPDATE_AVATAR(data.imageUri);
            
      throw new Error(`Mock não implementado para PUT ${url}`);
    }

    try {
      const config: any = {};
      
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      
      const response = await axiosInstance.put(url, data, config);
      return response.data.payload;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      
      const axiosError = error as AxiosError;
      throw new APIError(
        (axiosError.response?.data as any)?.message || axiosError.message || 'Network Error',
        axiosError.response?.status || 0
      );
    }
  },

  delete: async (url: string, token?: string) => {
    if (env.EXPO_PUBLIC_ENVIRONMENT === 'test') {
      throw new Error(`Mock não implementado para DELETE ${url}`);
    }

    try {
      const config: any = {};
      
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      
      const response = await axiosInstance.delete(url, config);
      return response.data.payload;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      
      const axiosError = error as AxiosError;
      throw new APIError(
        (axiosError.response?.data as any)?.message || axiosError.message || 'Network Error',
        axiosError.response?.status || 0
      );
    }
  },
};

export { axiosInstance };