import { resolve, } from 'path';

export const ROOT_PATH = resolve('./');
export const SRC_DIR = resolve(ROOT_PATH, 'src');
export const APP_PATH = resolve(SRC_DIR, 'index');

export const PATHS = {
  src: SRC_DIR,
  dist: resolve(ROOT_PATH, 'dist'),
  config: resolve(ROOT_PATH, 'config'),
  app:  resolve(ROOT_PATH, 'index'),

};
