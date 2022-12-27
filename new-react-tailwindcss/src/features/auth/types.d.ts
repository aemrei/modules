interface AuthState {
  token: string | null;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  error?: string;
}
