import { ColumnDef } from "@tanstack/react-table";

export type Monitors = {
    id: string;
    monitor_name: string; // Renamed to match new column name
    department: string; // Renamed to match new column name

};

export const columns: ColumnDef<Monitors>[] = [
    {
        accessorKey: "id", // Changed to ID
        header: "ID",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "monitor_name", // Changed to monitor Name
        header: "Department Name",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "department", // Changed to Office
        header: "Department",
        cell: (info) => info.getValue(),
    },

];