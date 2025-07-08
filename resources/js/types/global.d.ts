import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import { PageProps as AppPageProps } from './';

declare global {
    interface Window {
        axios: AxiosInstance;
                Laravel: {
            userId?: number;
            sessionId?: string;
        };
       Echo: Echo<'reverb'>;   // Better typing possible
        $: any;    // jQuery if you use it
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}

interface LaravelWindow {
  userId: number | string;
  sessionId: string;
  // add other properties you expect here
}


