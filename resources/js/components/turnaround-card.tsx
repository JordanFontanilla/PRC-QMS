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

export function TurnAroundTimeCard() {
    // Example: static active users count, replace with dynamic data if necessary
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [approximateTime, setApproximateTime] = useState(null); // Static value for now (replace with dynamic data in the future)
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
                setApproximateTime(response.data.chartData)
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
                <CardTitle>Turnaround Time</CardTitle>
                <CardDescription>
                    Approximate processing time of general services.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center text-lg font-semibold">
                    {approximateTime} 
                </div>
            </CardContent>
        </Card>
    );
}
