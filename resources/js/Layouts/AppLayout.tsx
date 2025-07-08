import { useEffect, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";


export default function AppLayout({ children }: { children: React.ReactNode }) {
   const { auth } = usePage<any>().props;
    const [currentSessionId, setCurrentSessionId] = useState<string | null>(
        null
    );



  console.log('AppLayout rendered on page, auth:', auth);
    useEffect(() => {
        const sessionId = auth?.sessionId || window.Laravel?.sessionId;
        if (sessionId) {
            setCurrentSessionId(sessionId);
        }
    }, [auth?.sessionId]);

    useEffect(() => {
        const userId = auth?.user?.id;
        const sessionId = auth?.sessionId || window.Laravel?.sessionId;

        if (!userId || !sessionId) {
            console.warn("User ID or session ID missing. Echo init skipped.");
            return;
        }

        const channel = window.Echo.private(`user.${userId}.session`);

        channel.listen(
            ".UserSessionChanged",
            (event: { sessionId: string }) => {
                console.log("📡 Session event received:", {
                    current: sessionId,
                    received: event.sessionId,
                });

                if (event.sessionId !== sessionId) {
                    handleSessionConflict();
                }
            }
        );

        channel.error((error: any) => {
            console.error("❌ Echo error:", error);
        });

        return () => {
            channel.stopListening(".UserSessionChanged");
            window.Echo.leave(`user.${userId}.session`);
        };
    }, [auth?.user?.id, auth?.sessionId]);

    const handleSessionConflict = () => {
        Swal.fire({
            icon: "warning",
            title: "Session Conflict",
            text: "Your account was accessed elsewhere",
            showConfirmButton: false,
            timer: 5000,
            willClose: () => {
                router.post(
                    "/logout",
                    {},
                    {
                        onSuccess: () => (window.location.href = "/login"),
                        onError: () => alert("Logout failed"),
                    }
                );
            },
        });
    };

    return <>{children}</>;
}
