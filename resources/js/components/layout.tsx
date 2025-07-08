import React from "react";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";

const layout = ({children}:{children:React.ReactNode}) => {
    return (
        <SidebarProvider>
            <AppSidebar>
                <main>
                    {children}
                </main>
            </AppSidebar>
        </SidebarProvider>
    )
}

export default layout;