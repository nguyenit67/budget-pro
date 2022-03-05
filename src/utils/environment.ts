export function viteEnv(key: string) {
  try {
    // in vite dev mode
    return import.meta.env[key];
  } catch (error) {
    // with env have Nodejs Process
    return process.env[key];
  }
}
