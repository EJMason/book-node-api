// Type definitions for my.config

declare module 'my.config';

export var nodeEnv: any;
export var isProd: string;
export var PORT: string | number;
export var db: dbTS;

interface dbTS {
  url: string;
}
