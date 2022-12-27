interface Auth {
  token: string;
  user: User;
}

interface AuthState {
  user: User | null;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}
