import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { VisitorChart } from "@/components/area-chart-for-visitors";
import { VisitorPerMonthBarGraph } from "@/components/visitor-per-month";
import { ActiveUserCard } from "@/components/active-user-card";
import { TurnAroundTimeCard } from "@/components/turnaround-card";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { router, usePage } from "@inertiajs/react";

export default function Page({ children }: { children?: React.ReactNode }) {
    const { url } = usePage();

    useEffect(() => {
        // ✅ Correct: Only `only` or `except` are valid
        router.reload({ only: ["csrf_token"] });
        console.log('helooo csrf')
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Queueing Management System - PRC CAR
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children || (
                        <>
                            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4">
                                <div className="basis-[calc(50%-0.5rem)] sm:basis-[calc(25%-1rem)]">
                                    <VisitorPerMonthBarGraph />
                                </div>
                                <div className="basis-[calc(50%-0.5rem)] sm:basis-[calc(25%-1rem)]">
                                    <ActiveUserCard />
                                </div>
                                <div className="basis-[calc(50%-0.5rem)] sm:basis-[calc(25%-1rem)]">
                                    <TurnAroundTimeCard />
                                </div>
                                <div className="basis-[calc(50%-0.5rem)] sm:basis-[calc(25%-1rem)]">
                                    {/* Optional: Add content or remove if not needed */}
                                </div>
                            </div>
                            <div>
                                <VisitorChart></VisitorChart>
                            </div>
                        </>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
