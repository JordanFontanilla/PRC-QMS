import { ColumnDef } from "@tanstack/react-table";

export type Users = {
    id: any;
    email: any;
    created_at: any;
    name: any;
};

export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "fullName",
        header: "Name",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "email",
        header: "Email Address",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "created_at",
        header: "Creation Date",
        cell: (info) => {
            const rawValue = info.getValue() as string | number | Date;
            const date = new Date(rawValue);
            return date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        },
    },
];