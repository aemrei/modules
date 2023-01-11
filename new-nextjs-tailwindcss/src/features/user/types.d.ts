interface User {
  id: string;
  email: string;
}

interface UserState {
  me: User | null;
}
