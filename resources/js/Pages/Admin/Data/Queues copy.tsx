import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getPaginationRowModel,
    ColumnDef,
    SortingState,
    PaginationState,
    OnChangeFn,
    Updater,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    sorting: SortingState;
    setSorting: (sorting: SortingState) => void;
    pagination: PaginationState;
    setPagination: (pagination: PaginationState) => void;
    pageSizeOptions?: number[];
    className?: string; // Add this line
}

export function DataTable<TData, TValue>({
    columns,
    data,
    sorting,
    setSorting,
    pagination,
    setPagination,
    pageSizeOptions = [10, 25, 50],
}: DataTableProps<TData, TValue>) {
    const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
        setSorting(typeof updater === "function" ? updater(sorting) : updater);
    };

    const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
        setPagination(
            typeof updater === "function" ? updater(pagination) : updater
        );
    };

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            pagination,
        },
        onSortingChange: handleSortingChange,
        onPaginationChange: handlePaginationChange,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        autoResetPageIndex: false,
    });

    const [formData, setFormData] = useState({ name: "", price: "" });
    const [errors, setErrors] = useState({ name: "", price: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ name: "", price: "" });
        setErrors({ name: "", price: "" });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Clear previous errors
        setErrors({ name: "", price: "" });

        const { name, price } = formData;
        let hasError = false;

        // Validate fields
        const newErrors = { name: "", price: "" };
        if (!name) {
            newErrors.name = "Name is required.";
            hasError = true;
        }
        if (!price) {
            newErrors.price = "Price is required.";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
        } else {
            router.post("/products", formData);
            handleCloseModal();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                {/* Your header content if any */}
            </div>

            {/* Scrollable container */}
            <div
                className="rounded-md border overflow-auto"
                style={{ maxHeight: "calc(100vh - 200px)" }}
            >
                <Table className="relative">
                    <TableHeader className="sticky top-0 bg-white dark:bg-gray-950 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between px-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    Showing {table.getRowModel().rows.length} of {data.length}{" "}
                    rows
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                            className="h-8 rounded border border-gray-300 bg-transparent px-2 py-1 text-sm"
                        >
                            {pageSizeOptions.map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Go to previous page</span>
                            {"<"}
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className="sr-only">Go to next page</span>
                            {">"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
