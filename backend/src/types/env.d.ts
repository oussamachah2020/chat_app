declare global {
  namespace NodeJs {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: number;
      JWT_PRIVATE_KEY: string;
      JWT_PUBLIC_KEY: string;
    }
  }
}
export {};
