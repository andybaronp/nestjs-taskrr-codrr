declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: number;
    DB_HOST?: string;
    DB_PORT?: number;
    DB_USER?: string;
    DB_PASSWORD?: string;
    DB_NAME?: string;

    //AUTH
    HASH_SALT?: number;
    JWT_SECRET?: string;
  }
}
