import '../css/app.css';
import './bootstrap';
import './echo.tsx';
import axios from 'axios';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import AppLayout from "@/Layouts/AppLayout";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ).then((module:any) => {
            const page = module.default;
            // If the page has its own layout, use it. Otherwise use AppLayout.
            page.layout ??= (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
            return module;
        }),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});