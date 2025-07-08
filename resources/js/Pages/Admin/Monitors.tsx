import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { columns } from "../Admin/Columns/Monitors";
import { DataTable } from "../Admin/Data/Monitors";
import { SortingState, PaginationState } from "@tanstack/react-table";
import Page from "@/Pages/Dashboard";
import { router } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core";

interface Monitors {
    id: string;
    monitor_name: string;
    department: string;
}

interface CounterPageProps {
    monitors: Monitors[];
    departments: { value: string; label: string }[];
}

export default function CounterPage({ monitors, departments }: CounterPageProps) {
    const { props } = usePage();
    const [data, setData] = useState<Monitors[]>(monitors ?? []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState<Omit<Monitors, "id">>({
        monitor_name: "",
        department: "",
    });
    const [editFormData, setEditFormData] = useState<Monitors | null>(null);
    const [errors, setErrors] = useState<Partial<Monitors>>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const validateForm = (): boolean => {
        setErrors({});
        const newErrors: Partial<Monitors> = {};

        if (!formData.monitor_name)
            newErrors.monitor_name = "Counter name is required";
        if (!formData.department)
            newErrors.department = "Department is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        return true;
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        router.post("/admin/monitors/store", formData, {
            preserveScroll: true,
            onSuccess: (page) => {
                // Both reset the form AND update the table data
               setData(page.props.monitors as Monitors[]);
                setFormData({ monitor_name: "", department: "" });
                setIsModalOpen(false);
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm() || !editFormData) return;

        router.post(`/admin/monitor/${editFormData.id}/update`, formData, {
            preserveScroll: true,
            onSuccess: (page) => {
               setData(page.props.monitors as Monitors[]);
                setIsEditModalOpen(false);
                setEditFormData(null);
                setFormData({ monitor_name: "", department: "" });
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const handleEdit = (monitor: Monitors) => {
        setEditFormData(monitor);
        setFormData({
            monitor_name: monitor.monitor_name,
            department:monitor.department,
        });
        setIsEditModalOpen(true);
    };

    // When closing Edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditFormData(null);
        setFormData({ monitor_name: "", department: "" }); // Clear form data
        setErrors({});
    };

    // When closing Add modal
    const closeAddModal = () => {
        setIsModalOpen(false);
        setFormData({ monitor_name: "", department: "" }); // Clear form data
        setErrors({});
    };
    return (
        <Page>
            <div className="container mx-auto py-10">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Monitor Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        + Add New Counter
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden p-4">
                    <DataTable
                        columns={[
                            ...columns,
                            {
                                header: "Actions",
                                cell: ({ row }: any) => (
                                    <button
                                        onClick={() => handleEdit(row.original)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                ),
                            },
                        ]}
                        data={data}
                        sorting={sorting}
                        setSorting={setSorting}
                        pagination={pagination}
                        setPagination={setPagination}
                        pageSizeOptions={[10, 25, 50]}
                    />
                </div>

                {/* New Counter Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-xl font-semibold">
                                    Add New Counter
                                </h2>
                                <button
                                    onClick={closeAddModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ×
                                </button>
                            </div>

                            <form
                                onSubmit={handleCreateSubmit}
                                className="p-4 space-y-4"
                            >
                                {/* Counter Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Counter Name *
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.monitor_name
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.monitor_name}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                monitor_name: e.target.value,
                                            });
                                            if (errors.monitor_name)
                                                setErrors({
                                                    ...errors,
                                                    monitor_name: "",
                                                });
                                        }}
                                        placeholder="Enter counter name"
                                        name="monitor_name"
                                    />
                                    {errors.monitor_name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.monitor_name}
                                        </p>
                                    )}
                                </div>

                                {/* Department Select */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Department *
                                    </label>
                                    <select
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.department
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.department}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                department: e.target.value,
                                            });
                                            if (errors.department) {
                                                setErrors({
                                                    ...errors,
                                                    department: "",
                                                });
                                            }
                                        }}
                                        name="department"
                                    >
                                        <option value="">
                                            Select a department
                                        </option>
                                        {departments.map((dept) => (
                                            <option
                                                key={dept.value}
                                                value={dept.value}
                                            >
                                                {dept.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.department && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.department}
                                        </p>
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeAddModal}
                                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Save Counter
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Counter Modal */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-xl font-semibold">
                                    Edit Counter
                                </h2>
                                <button
                                    onClick={closeEditModal}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ×
                                </button>
                            </div>

                            <form
                                onSubmit={handleEditSubmit}
                                className="p-4 space-y-4"
                            >
                                {/* Counter Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Counter Name *
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.monitor_name
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.monitor_name}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                monitor_name: e.target.value,
                                            });
                                            if (errors.monitor_name)
                                                setErrors({
                                                    ...errors,
                                                    monitor_name: "",
                                                });
                                        }}
                                        placeholder="Enter counter name"
                                        name="monitor_name"
                                    />
                                    {errors.monitor_name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.monitor_name}
                                        </p>
                                    )}
                                </div>

                                {/* Department Select */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Department *
                                    </label>
                                    <select
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.department
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.department}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                department: e.target.value,
                                            });
                                            if (errors.department) {
                                                setErrors({
                                                    ...errors,
                                                    department: "",
                                                });
                                            }
                                        }}
                                        name="department"
                                    >
                                        <option value="">
                                            Select a department
                                        </option>
                                        {departments.map((dept) => (
                                            <option
                                                key={dept.value}
                                                value={dept.value}
                                            >
                                                {dept.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.department && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.department}
                                        </p>
                                    )}
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeEditModal}
                                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </Page>
    );
}
