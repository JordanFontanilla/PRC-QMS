import { ColumnDef } from "@tanstack/react-table";

export type Department = {
    id: string;
    department_name: string; // Renamed to match new column name

};

export const columns: ColumnDef<Department>[] = [
    {
        accessorKey: "id", // Changed to ID
        header: "ID",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "department_name", // Changed to Counter Name
        header: "Department Name",
        cell: (info) => info.getValue(),
    },


];