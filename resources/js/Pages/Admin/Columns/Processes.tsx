import { ColumnDef } from "@tanstack/react-table";

export type Processes = {
    id: string;
    process_name: string;
    department_name: string;
    created_at?: string;
    updated_at?: string;
};

export const columns: ColumnDef<Processes>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "process_name",
        header: "Process Name",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "department_name",
        header: "Department Name",
        cell: (info) => info.getValue(),
    },
];
