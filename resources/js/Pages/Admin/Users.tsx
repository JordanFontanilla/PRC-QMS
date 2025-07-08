import { useState } from "react";
import { usePage } from "@inertiajs/react";
import { columns } from "./Columns/Users";
import { DataTable } from "./Data/Users";
import { SortingState, PaginationState } from "@tanstack/react-table";
import Page from "@/Pages/Dashboard";
import { router } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core";

interface Users {
    id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    suffix?: string;
    email: string;
    password: any;
    position: any;
    created_at: any;
    user_level: any;
    name: string;
    fullName: string;
}

interface UserForm {
    [key: string]: any;
    first_name: string;
    middle_name?: string;
    last_name: string;
    suffix?: string;
    email: string;
    password?: string;
    user_level_id: any;
}

interface UserLevels {
    id: any;
    user_level_name: any;
}
interface CounterPageProps {
    users: Users[];
    userForm: UserForm[];
    userLevels: UserLevels[];
}

export default function CounterPage({ users, userLevels }: CounterPageProps) {
    const { props } = usePage();
    const [data, setData] = useState<Users[]>(users ?? []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState<UserForm>({
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: "",
        email: "",
        password: "PRCCARWISDOM", // Default password
        user_level_id: "",
    });

    console.log(data);
    const [editFormData, setEditFormData] = useState<Users | null>(null);
    const [errors, setErrors] = useState<Partial<UserForm>>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const validateForm = (): boolean => {
        setErrors({});
        const newErrors: Partial<UserForm> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.first_name) {
            console.log("Missing: first_name");
            newErrors.first_name = "First name is required";
        }

        if (!formData.last_name) {
            console.log("Missing: last_name");
            newErrors.last_name = "Last name is required";
        }

        if (!formData.email) {
            console.log("Missing: email");
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            console.log("Invalid: email format");
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.user_level) {
            console.log("Missing: user_level");
            newErrors.user_level = "User level is required";
        }

        if (Object.keys(newErrors).length > 0) {
            console.log("Validation failed with errors:", newErrors);
            setErrors(newErrors);
            return false;
        }

        console.log("Validation passed");
        return true;
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        console.log("hello");
        e.preventDefault();
        console.log(formData);
        if (!validateForm()) return;

        try {
            router.post(
                "/admin/users/store",
                {
                    ...formData,
                    user_level_id: formData.user_level, // correct key Laravel expects
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                    onSuccess: (page) => {
                        console.log("Post success", page);
                        setData(page.props.users as Users[]);
                        setFormData({
                            first_name: "",
                            middle_name: "",
                            last_name: "",
                            suffix: "",
                            email: "",
                            password: "PRCCARWISDOM",
                            user_level_id: "",
                        });
                        setIsModalOpen(false);
                    },
                    onError: (errors) => {
                        console.error("Post error", errors);
                        setErrors(errors);
                    },
                }
            );
        } catch (err) {
            console.error("Exception in router.post:", err);
        }
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm() || !editFormData) return;

        router.post(
            `/admin/user/${editFormData.id}/update`,
            {
                ...formData,
                user_level_id: formData.user_level, // correct key Laravel expects
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    setData(page.props.counters as Users[]);
                    setIsEditModalOpen(false);
                    setEditFormData(null);
                    setFormData({
                        first_name: "",
                        middle_name: "",
                        last_name: "",
                        suffix: "",
                        email: "",
                        password: "PRCCARWISDOM",
                        user_level_id: "",
                    });
                },
                onError: (errors) => {
                    setErrors(errors);
                },
            }
        );
    };

    const handleEdit = (user: Users) => {
        setEditFormData(user);
        setFormData({
            first_name: user.first_name,
            middle_name: user.middle_name || "",
            last_name: user.last_name,
            suffix: user.suffix || "",
            email: user.email,
            password: user.password,
            user_level_id: user.user_level,
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditFormData(null);
        setFormData({
            first_name: "",
            middle_name: "",
            last_name: "",
            suffix: "",
            email: "",
            password: "PRCCARWISDOM",
            user_level_id: "",
        });
        setErrors({});
    };

    const closeAddModal = () => {
        setIsModalOpen(false);
        setFormData({
            first_name: "",
            middle_name: "",
            last_name: "",
            suffix: "",
            email: "",
            password: "PRCCARWISDOM",
            user_level_id: "",
        });
        setErrors({});
    };

    return (
        <Page>
            <div className="container mx-auto py-10">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        + Add New User
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
                        data={data}
                        sorting={sorting}
                        setSorting={setSorting}
                        pagination={pagination}
                        setPagination={setPagination}
                        pageSizeOptions={[10, 25, 50]}
                        tableTitle="Users"
                    />
                </div>

                {/* New User Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-xl font-semibold">
                                    Add New User
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
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.first_name
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                            value={formData.first_name}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    first_name: e.target.value,
                                                });
                                                if (errors.first_name)
                                                    setErrors({
                                                        ...errors,
                                                        first_name: "",
                                                    });
                                            }}
                                            placeholder="First name"
                                        />
                                        {errors.first_name && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.first_name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.last_name
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                            value={formData.last_name}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    last_name: e.target.value,
                                                });
                                                if (errors.last_name)
                                                    setErrors({
                                                        ...errors,
                                                        last_name: "",
                                                    });
                                            }}
                                            placeholder="Last name"
                                        />
                                        {errors.last_name && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.last_name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            value={formData.middle_name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    middle_name: e.target.value,
                                                })
                                            }
                                            placeholder="Middle name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Suffix
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            value={formData.suffix}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    suffix: e.target.value,
                                                })
                                            }
                                            placeholder="Jr., Sr., III, etc."
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.email
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            });
                                            if (errors.email)
                                                setErrors({
                                                    ...errors,
                                                    email: "",
                                                });
                                        }}
                                        placeholder="Enter email"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* User Level */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        User Level *
                                    </label>
                                    <select
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.user_level
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.user_level}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                user_level: e.target.value,
                                            });
                                            if (errors.user_level) {
                                                setErrors({
                                                    ...errors,
                                                    user_level: "",
                                                });
                                            }
                                        }}
                                    >
                                        <option value="">
                                            Select a user level
                                        </option>
                                        {userLevels.map((userLevel) => (
                                            <option
                                                key={userLevel.id}
                                                value={userLevel.id}
                                            >
                                                {userLevel.user_level_name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_level && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.user_level}
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
                                        Save User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit User Modal */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h2 className="text-xl font-semibold">
                                    Edit User
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
                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.first_name
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                            value={formData.first_name}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    first_name: e.target.value,
                                                });
                                                if (errors.first_name)
                                                    setErrors({
                                                        ...errors,
                                                        first_name: "",
                                                    });
                                            }}
                                        />
                                        {errors.first_name && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.first_name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            className={`w-full px-3 py-2 border rounded-md ${
                                                errors.last_name
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            }`}
                                            value={formData.last_name}
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    last_name: e.target.value,
                                                });
                                                if (errors.last_name)
                                                    setErrors({
                                                        ...errors,
                                                        last_name: "",
                                                    });
                                            }}
                                        />
                                        {errors.last_name && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.last_name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            value={formData.middle_name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    middle_name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Suffix
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            value={formData.suffix}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    suffix: e.target.value,
                                                })
                                            }
                                            placeholder="Jr., Sr., III, etc."
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.email
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.email}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            });
                                            if (errors.email)
                                                setErrors({
                                                    ...errors,
                                                    email: "",
                                                });
                                        }}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* User Level */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        User Level *
                                    </label>
                                    <select
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.user_level
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }`}
                                        value={formData.user_level}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                user_level: e.target.value,
                                            });
                                            if (errors.user_level) {
                                                setErrors({
                                                    ...errors,
                                                    user_level: "",
                                                });
                                            }
                                        }}
                                    >
                                        <option value="">
                                            Select a user level
                                        </option>
                                        {userLevels.map((userLevel) => (
                                            <option
                                                key={userLevel.id}
                                                value={userLevel.id}
                                            >
                                                {userLevel.user_level_name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_level && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.user_level}
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
