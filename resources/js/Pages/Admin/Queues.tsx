import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { columns } from "./Columns/Queues";
import { DataTable } from "./Data/Queues";
import { SortingState, PaginationState } from "@tanstack/react-table";
import Page from "@/Pages/Dashboard";
import { router } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core";

interface Queues {
    id: string;
    token: string;
    process_name: string;
    time_in: string | null;
    time_out: string | null;
    person_type: string;
    status: string;
}

interface Departments {
    id: number;
    department_name: string;
    created_at: string;
    updated_at: string;
}

interface ProcessesForm {
    process_name: string;
    department: string | number;
}

interface ProcessesPageProps {
    processes: Queues[];
    departments: Departments[];
}

export default function CounterPage({
    processes,
    departments,
}: ProcessesPageProps) {
    const { queues } = usePage().props;
    const [data, setData] = useState(queues as Queues[]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState<{
        process_name: string;
        department: string | number;
    }>({
        process_name: "",
        department: "",
    });
    const [editFormData, setEditFormData] = useState<Queues | null>(null);
    const [errors, setErrors] = useState<Partial<ProcessesForm>>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    console.log(queues);
    const validateForm = (): boolean => {
        setErrors({});
        const newErrors: Partial<ProcessesForm> = {};

        if (!formData.process_name)
            newErrors.process_name = "Process name is required";
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

        router.post("/admin/processes/store", formData, {
            preserveScroll: true,
            onSuccess: (page) => {
                // Both reset the form AND update the table data
                setData(page.props.processes as Queues[]);
                setFormData({ process_name: "", department: "" });
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

        router.put(`/admin/processes/${editFormData.id}`, formData, {
            preserveScroll: true,
            onSuccess: (page) => {
                setData(page.props.processes as Queues[]);
                setIsEditModalOpen(false);
                setEditFormData(null);
                setFormData({ process_name: "", department: "" });
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const handleEdit = (process: Queues) => {
        setEditFormData(process);
        setFormData({
            process_name: process.process_name,
            department: process.token,
        });
        setIsEditModalOpen(true);
    };

    // When closing Edit modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditFormData(null);
        setFormData({ process_name: "", department: "" }); // Clear form data
        setErrors({});
    };

    // When closing Add modal
    const closeAddModal = () => {
        setIsModalOpen(false);
        setFormData({ process_name: "", department: "" }); // Clear form data
        setErrors({});
    };

    const callQueue = (id: string) => {
        
        const lastThreeChars = id.slice(-3);

    
        const message = `Now serving queue number ${lastThreeChars} at counter 14.`;

    
        console.log(message);


        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <Page>
            <div className="container mx-auto py-10">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Process Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        + Add New Process
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden p-4">
                    <DataTable
                        columns={[
                            ...columns,
                            {
                                accessorKey: "id", // Make sure this column accesses the `id` from data
                                header: "Actions",
                                cell: ({ row }: any) => (
                                    <>
                                        {/* Hidden queue ID */}
                                        <input
                                            type="hidden"
                                            value={row.original.token}
                                        />
                                        <button
                                            onClick={() =>
                                                callQueue(row.original.token)
                                            } // Using the hidden queue ID
                                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 border border-blue-200 hover:border-blue-300"
                                        >
                                            CALL
                                        </button>
                                    </>
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
                                            errors.process_name
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.process_name}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                process_name: e.target.value,
                                            });
                                            if (errors.process_name)
                                                setErrors({
                                                    ...errors,
                                                    process_name: "",
                                                });
                                        }}
                                        placeholder="Enter process name"
                                        name="process_name"
                                    />
                                    {errors.process_name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.process_name}
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
                                                department: Number(
                                                    e.target.value
                                                ), // Convert the value to number
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
                                                key={dept.id}
                                                value={dept.id}
                                            >
                                                {dept.department_name}
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
                                            errors.process_name
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.process_name}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                process_name: e.target.value,
                                            });
                                            if (errors.process_name)
                                                setErrors({
                                                    ...errors,
                                                    process_name: "",
                                                });
                                        }}
                                        placeholder="Enter counter name"
                                        name="process_name"
                                    />
                                    {errors.process_name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.process_name}
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
                                                key={dept.id}
                                                value={dept.id}
                                            >
                                                {dept.department_name}
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
