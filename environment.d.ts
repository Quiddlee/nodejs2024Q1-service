namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    CRYPT_SALT: string;
    JWT_SECRET_KEY: string;
    JWT_SECRET_REFRESH_KEY: string;
    TOKEN_EXPIRE_TIME: string;
    TOKEN_REFRESH_EXPIRE_TIME: string;
    POSTGRES_USER:string;
    POSTGRES_PASSWORD:string;
    POSTGRES_DB:string;
    POSTGRES_PORT:string;
    DATABASE_URL:string;
  }
}
