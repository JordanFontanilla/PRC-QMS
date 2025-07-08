import { ColumnDef } from "@tanstack/react-table";

export type Counters = {
    id: string;
    counter_name: string;
    process_name: string;
    floor_assignment: string;
};

export const columns: ColumnDef<Counters>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "counter_name",
        header: "Counter Name",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "user_name",
        header: "User",
        cell: (info) => {
            const value = info.getValue() as string | null | undefined;
            const displayText = value ?? "UNOCCUPIED"; // handles null/undefined
            const isOccupied =
                displayText !== "Not occupied" && displayText !== "UNOCCUPIED";

            return (
                <span
                    className={
                        isOccupied
                            ? "text-green-600 font-semibold"
                            : "text-gray-400"
                    }
                >
                    {displayText}
                </span>
            );
        },
    },
    {
        accessorKey: "floor_assignment",
        header: "Floor",
        cell: (info) => {
            const floor = info.getValue() as string | null;
            return (
                <span className="text-blue-600 font-medium">
                    {floor ?? "Not assigned"}
                </span>
            );
        },
    },  
];
