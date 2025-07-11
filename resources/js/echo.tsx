import Echo from "laravel-echo";

import Pusher from "pusher-js";
window.Pusher = Pusher;

declare global {
    interface Window {
        Echo: Echo<"reverb">;
        Pusher: typeof Pusher;
    }
}

const echo = new Echo({
    broadcaster: "reverb",
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
});

window.Echo = echo;

export default echo; // ✅ Now this works!
