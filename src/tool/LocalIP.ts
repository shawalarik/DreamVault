import { networkInterfaces } from 'os';
export function getLocalIPUrl(): string | undefined {
    const interfaces = networkInterfaces();
    for (const devName in interfaces) {
        const isFace = interfaces[devName];
        if (isFace) {
            for (let i = 0; i < isFace.length; i++) {
                const alias = isFace[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }
}
