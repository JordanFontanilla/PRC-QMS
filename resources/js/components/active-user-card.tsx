"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export function ActiveUserCard() {
    // Example: static active users count, replace with dynamic data if necessary
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeUsers, setActiveUsers] = useState<number | null>(null);
    const csrfToken =
        typeof document !== "undefined"
            ? document.head
                  .querySelector('meta[name="csrf-token"]')
                  ?.getAttribute("content")
            : null;

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios
            .get(`/receptionist/queueCommandCenter/fetchQueueHistory`, {
                headers: { "X-CSRF-TOKEN": csrfToken || "" },
            })
            .then((response) => {
                const rawData = response.data;
                const processedReport = rawData.processedReport;
                console.log(response.data)
                setActiveUsers(10);
            })
            .catch((err) => {
                console.error("Error fetching chart data:", err);
            })
            .finally(() => setLoading(false));
    }, []);
    return (
        <Card className="w-full h-full">
            {" "}
            {/* Adjust the height here */}
            <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>
                    Current active users on the platform.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center text-lg font-semibold">
                    {activeUsers} Active Users
                </div>
            </CardContent>
        </Card>
    );
}
