import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { columns } from "../Admin/Columns/Departments";
import { DataTable } from "../Admin/Data/Departments";
import { SortingState, PaginationState } from "@tanstack/react-table";
import Page from "@/Pages/Dashboard";
import { router } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core";

interface Department {
    id: string;
    department_name: string; // or whatever field names your backend returns
    // other department fields...
}

interface DepartmentPageProps {
    departments: Department[]; // Changed from counters to departments
}
export default function CounterPage({ departments }: DepartmentPageProps) {
    const [data, setData] = useState<Department[]>(departments);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState<Omit<Department, "id">>({
        department_name: "",
    });
    const [editFormData, setEditFormData] = useState<Department | null>(null);
    const [errors, setErrors] = useState<Partial<Department>>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const validateForm = (): boolean => {
        setErrors({});
        const newErrors: Partial<Department> = {};

        if (!formData.department_name)
            newErrors.department_name = "Department name is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        return true;
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        router.post("/admin/departments/store", formData, {
            preserveScroll: true,
            onSuccess: (page) => {
                // Change from counters to departments
                setData(page.props.departments as Department[]);
                setFormData({ department_name: "" });
                setIsModalOpen(false);
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(editFormData);

        if (!editFormData) return;

        router.put(`/admin/departments/${editFormData.id}`, formData, {
            preserveScroll: true,
            onSuccess: (page) => {
                console.log(editFormData);
                setData(page.props.departments as Department[]);
                setIsEditModalOpen(false);
                setEditFormData(null);
                setFormData({ department_name: "" });
            },
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    // Fix: Correctly loads selected department details
    const handleEdit = (department: Department) => {
        setEditFormData(department);
        setFormData({
            department_name: department.department_name,
        });
        setIsEditModalOpen(true);
    };

    // Fix: Properly resets data when closing modal
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditFormData(null);
        setFormData({ department_name: "" });
        setErrors({});
    };

    // When closing Add modal
    const closeAddModal = () => {
        setIsModalOpen(false);
        setFormData({ department_name: "" }); // Clear form data
        setErrors({});
    };
    return (
        <Page>
            <div className="container mx-auto py-10">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">
                        Department Management
                    </h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        + Add New Department
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
                                        className="px-4 py-2 bg-white border border-indigo-100 rounded-lg 
                text-indigo-600 font-medium hover:bg-indigo-50 hover:shadow-sm 
                transition-all duration-200 flex items-center gap-2"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            ></path>
                                        </svg>
                                        Edit
                                    </button>
                                ),
                            },
                        ]}
                        data={data || []}
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
                                    Add New Department
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
                                            errors.department_name
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.department_name}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                department_name: e.target.value,
                                            });
                                            if (errors.department_name)
                                                setErrors({
                                                    ...errors,
                                                    department_name: "",
                                                });
                                        }}
                                        placeholder="Enter counter name"
                                        name="department_name"
                                    />
                                    {errors.department_name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.department_name}
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
                {isEditModalOpen && editFormData && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-xl font-semibold">
                                    Edit Department
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
                                {/* Department Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Department Name *
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.department_name
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.department_name}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                department_name: e.target.value,
                                            });
                                            if (errors.department_name)
                                                setErrors({
                                                    ...errors,
                                                    department_name: "",
                                                });
                                        }}
                                        placeholder="Enter department name"
                                        name="department_name"
                                    />
                                    {errors.department_name && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.department_name}
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
