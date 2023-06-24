export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      JWT_PRIVATE_KEY: string;
      JWT_PUBLIC_KEY: string;
      NODE_ENV: "test" | "dev" | "prod";
      EMAIL: string;
      PASSWORD: string;
    }
  }
}
