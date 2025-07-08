
import { ColumnDef } from "@tanstack/react-table";

export type Queues = {
    id: string;
    token: string;
    process_name: string;
    time_in: string | null;
    time_out: string | null;
    person_type: string;
    status: string;
};

export const columns: ColumnDef<Queues>[] = [
    {
        accessorKey: 'token',
        header: 'Token',
        cell: (info) => info.getValue<string>().slice(-3),
    },
    {
        accessorKey: "process_name",
        header: "Service Type",
        cell: (info) => info.getValue<string>(),
    },
    {
        accessorKey: "time_in",
        header: "Time Issued",
        cell: (info) => info.getValue<string | null>(),
    },
    {
        accessorKey: "person_type",
        header: "Category",
        cell: (info) => info.getValue<string>(),
    },
];

export const columnsCalled: ColumnDef<Queues>[] = [
    {
        accessorKey: "token",
        header: "Token",
        cell: (info) => info.getValue<string>().slice(-3),
    },
    {
        accessorKey: "process_name",
        header: "Service Type",
        cell: (info) => info.getValue<string>(),
    },
    {
        accessorKey: "time_in",
        header: "Time Issued",
        cell: (info) => info.getValue<string | null>(),
    },
    {
        accessorKey: "time_out",
        header: "Time Done",
        cell: (info) => info.getValue<string | null>(),
    },
    {
        accessorKey: "person_type",
        header: "Category",
        cell: (info) => info.getValue<string>(),
    },
];