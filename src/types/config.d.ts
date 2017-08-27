// Type definitions for my/*

declare module 'my';
export interface ConfigOptions {
  nodeEnv: any;
  isProd: string;
  PORT: string | number;
  db: dbTS;
}

interface dbTS {
  url: string;
}
