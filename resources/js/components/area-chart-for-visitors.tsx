"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { PageProps as InertiaPageProps } from "@inertiajs/core";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";

interface ChartDataItem {
    date: string;
    [key: string]: number | string;
}
interface Process {
    id: number;
    process_name: string;
    // Include other properties you want to display
}

interface PageProps {
    processes: Process[];
    errors?: any;
    deferred?: Record<string, string[] | undefined>;
}

interface DashboardProps {
    processes: Process[];
}

interface CustomPageProps {
    processes: Process[];
}

interface CustomPageProps extends InertiaPageProps {
    processes: Process[];
    auth: {
        user: any; // Adjust this type based on your user structure
    };
}

interface ProcessedReportItem {
    date: string; // Assuming 'date' is a string, adjust if it's a Date type
    process_name: string;
    total_processed: number;
}

export function VisitorChart() {
    const [chartData1, setChartData] = useState<ChartDataItem[]>([]);
    const [timeRange, setTimeRange] = useState("90d");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { processes } = usePage<CustomPageProps>().props;

    const csrfToken =
        typeof document !== "undefined"
            ? document.head
                  .querySelector('meta[name="csrf-token"]')
                  ?.getAttribute("content")
            : null;

    const chartConfig = Object.fromEntries(
        processes.map((process, index) => {
            const colorVar = `--chart-${index + 1}`;
            return [
                process.process_name,
                {
                    label: process.process_name,
                    color: `hsl(var(${colorVar}))`,
                    // Add these for the legend to use
                    rawColor: `hsl(var(${colorVar}))`,
                    cssVar: colorVar,
                },
            ];
        })
    );

    const filteredData = chartData1.filter((item) => {
        const date = new Date(item.date);
        const today = new Date(); // Get the current date (today)

        let daysToSubtract = 90;
        if (timeRange === "30d") {
            daysToSubtract = 30;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }

        const startDate = new Date(today); // Use today as the reference date
        startDate.setDate(startDate.getDate() - daysToSubtract); // Subtract the days based on the selected time range

        return date >= startDate; // Only include data items within the calculated time range
    });
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

                // Group processedReport by date

                const groupedData: Record<
                    string,
                    Record<string, number>
                > = processedReport.reduce(
                    (
                        acc: Record<string, Record<string, number>>,
                        item: ProcessedReportItem
                    ) => {
                        const { date, process_name, total_processed } = item;

                        // Ensure the date key exists
                        if (!acc[date]) {
                            acc[date] = {};
                        }

                        // Add the total_processed to the specific process on this date
                        if (!acc[date][process_name]) {
                            acc[date][process_name] = 0;
                        }

                        acc[date][process_name] += total_processed;

                        return acc;
                    },
                    {} as Record<string, Record<string, number>> // Initialize the accumulator with the correct type
                );

                // Now we can safely map over groupedData
                const mappedChartData: ChartDataItem[] = Object.entries(
                    groupedData
                ).map(([date, processes]: [string, Record<string, number>]) => {
                    const processNames = Object.keys(processes);

                    // Prepare data for each process on this date
                    const dataItem: ChartDataItem = { date };

                    // Add total_processed for each process to the dataItem
                    processNames.forEach((processName) => {
                        dataItem[processName] = processes[processName];
                    });

                    return dataItem;
                });

                setChartData(mappedChartData);
            })
            .catch((err) => {
                console.error("Error fetching chart data:", err);
                setError("Failed to load chart data");
                setChartData([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Processed Transaction per Services</CardTitle>
                    <CardDescription>
                        Showing total visitors for the last 3 months
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            {Object.entries(chartConfig).map(
                                ([processName, config]) => (
                                    <linearGradient
                                        key={processName}
                                        id={`fill${processName.replace(
                                            /[^a-zA-Z0-9]/g,
                                            "_"
                                        )}`}
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="95%"
                                            stopColor={config.color}
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor={config.color}
                                            stopOpacity={0.1}
                                        />
                                    </linearGradient>
                                )
                            )}
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        {Object.entries(chartConfig).map(
                            ([processName, config], index) => (
                                <Area
                                    key={processName}
                                    dataKey={processName}
                                    type="natural"
                                    fill={`url(#fill${processName.replace(
                                        /[^a-zA-Z0-9]/g,
                                        "_"
                                    )})`} // Reference dynamic gradient ID
                                    stroke={`var(--chart-${index + 1})`} // Ensure the stroke color matches the CSS variable
                                    stackId="a"
                                />
                            )
                        )}
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
