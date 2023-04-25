import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";
import $api from "../http";

class AuthService {

    public async registration(nickName: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/registration', {
            nickName,
            email,
            password
        })
    }
    
    public async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/auth/login', {
            email,
            password
        })
    }

    public async logout(): Promise<void> {
        return $api.post('/auth/logout')
    }

}

export default new AuthService();