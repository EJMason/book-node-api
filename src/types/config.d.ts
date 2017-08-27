export interface ConfigOptions {
  nodeEnv: any;
  isProd: string;
  PORT: string | number;
  db: dbTS;
}

interface dbTS {
  url: string;
}
