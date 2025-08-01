export type AuthProviderProps = {
  children: React.ReactNode;
};

export interface FormData {
    email: string;
    firstName: string;
    lastName: string;
};

export interface CookieValues {
  token?: 'string'
};