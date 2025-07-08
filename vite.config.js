import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import os from 'os';
import react from '@vitejs/plugin-react'; // import the React plugin
const getLocalIp = () => {
    const networkInterfaces = os.networkInterfaces();
    for (let interfaceName in networkInterfaces) {
        for (let net of networkInterfaces[interfaceName]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return 'localhost';
};

const localIp = getLocalIp();

export default defineConfig({
    server: {
        host: localIp,
        port: 5173,
        hmr: {
            host: localIp,  
        },
        cors: true, // ✅ Allow all origins
    },
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.tsx',
            ],
            refresh: true,
        }),
        react(), // Add React plugin here
    ],
});