import { existsSync } from 'node:fs';
import path from 'node:path';

// Keep the yearly photo path in data while serving a valid placeholder until it is supplied.
export function publicImage(source: string, fallback: string) {
  if (!source.startsWith('/')) return source;
  return existsSync(path.join(process.cwd(), 'public', source)) ? source : fallback;
}
