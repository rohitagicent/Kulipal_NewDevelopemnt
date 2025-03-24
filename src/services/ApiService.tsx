import axios, {AxiosInstance} from 'axios';
import {Response} from './Response';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ApiEndpoint {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
}

export class ApiService {
  private readonly axiosInstance: AxiosInstance;
  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }
  private async getAuthKey(): Promise<string | null> {
    try {
      const authKey = await AsyncStorage.getItem('authKey');
      return authKey ? JSON.parse(authKey) : null;
    } catch (error) {
      return null;
    }
  }
  public async request<T>(
    endpoint: ApiEndpoint,
    requestData?: any,
  ): Promise<Response<T>> {
    const {url, method} = endpoint;
    try {
      const authKey = await this.getAuthKey();
      const response = await this.axiosInstance.request<T>({
        url,
        method,
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${authKey}`,
        },
      });

      return {isSuccessful: true, body: response.data};
    } catch (error) {
      if (axios.isAxiosError({error})) {
        if (error.response) {
          return {
            isSuccessful: false,
            errorBody: {
              statusCode: error.response.status,
              message: error.response.data.message,
            },
          };
        }
        if (error.request) {
          return {
            isSuccessful: false,
            errorBody: {
              statusCode: error.request.status,
              message: error.response.data.message,
            },
          };
        }
        return {
          isSuccessful: false,
          errorBody: {statusCode: 0, message: error.response.data.message},
        };
      }
      return {
        isSuccessful: false,
        errorBody: {statusCode: 300, message: error.response.data.message},
      };
    }
  }

  public async get<T>(url: string): Promise<Response<T>> {
    return this.request<T>({url, method: 'get'});
  }

  public async post<T>(url: string, data: any): Promise<Response<T>> {
    return this.request<T>({url, method: 'post'}, data);
  }

  public async put<T>(url: string, data: any): Promise<Response<T>> {
    return this.request<T>({url, method: 'put'}, data);
  }

  public async delete<T>(url: string): Promise<Response<T>> {
    return this.request<T>({url, method: 'delete'});
  }
}
