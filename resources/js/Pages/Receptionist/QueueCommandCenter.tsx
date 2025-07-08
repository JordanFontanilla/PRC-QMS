import Page from "@/Pages/Dashboard";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePage } from "@inertiajs/react";
import { columns, columnsCalled } from "../Admin/Columns/Queues";
import { DataTable } from "../Admin/Data/Queues";
import { SortingState, PaginationState } from "@tanstack/react-table";
import { router } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core";
import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AxiosError } from "axios";

interface Queues {
    id: string;
    token: string;
    process_name: string;
    time_in: string | null;
    time_out: string | null;
    person_type: string;
    status: string;
}

interface Counter {
    id: number;
    counter_name: string;
    is_active: any;
    user_id: any;
}

interface Process {
    id: string;
    process_name: string;
}

interface SelectedCounter {
    id: number;
    counter_name: string;
    is_active: any;
    user_id: any;
}

interface PagePropsExtended extends PageProps {
    queues: Queues[];
    calledQueue: Queues[];
    latestQueue: Queues | null;
    serving: any; // Replace 'any' with proper type if known
    processes: Process[];
    counters: Counter[];
    selectedCounter: SelectedCounter;
}

export default function CommandCenter() {
    const { props } = usePage<PagePropsExtended>();
    const {
        queues,
        calledQueue,
        latestQueue,
        serving,
        processes,
        selectedCounter,
    } = props;

    const [endorsementType, setEndorsementType] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState<Queues[]>(queues);
    const [dataCalledQueue, setDataCalledQueue] =
        useState<Queues[]>(calledQueue);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [waitingPagination, setWaitingPagination] = useState<PaginationState>(
        {
            pageIndex: 0,
            pageSize: 10,
        }
    );
    const [donePagination, setDonePagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { auth, counters } = usePage().props as {
        auth?: { user: { id: number } };
        counters?: Array<{
            id: number;
            user_id: number;
            is_active: number;
            counter_name: any;
        }>;
    };

    // Guard clauses to ensure the data is available before proceeding
    if (!auth || !counters) {
        return <div>Loading...</div>; // Or render an error message
    }

    useEffect(() => {
        setLocalCounters(props.counters);
    }, [props.counters]);

    // Now it's safe to use `auth` and `counters`
    const userCounter = counters.find(
        (c) => c.user_id === auth.user.id && c.is_active === 1
    );
    // Set the initial state for the current counter, or default to an empty string
    const [currentCounter, setCurrentCounter] = useState<number | null>(
        selectedCounter?.id || null
    );

    const [localCounters, setLocalCounters] = useState(counters);

    const [callTrigger, setCallTrigger] = useState(0);

    const [currentProcess, setCurrentProcess] = useState("");
    const [currentQueueId, setCurrentQueueId] = useState("");
    const [latestQueueId, setLatestQueueId] = useState<number | null>(null);
    const isFetching = useRef(false);
    const [latestQueueToken, setLatestQueueToken] = useState<string | null>(
        null
    );
    const [latestQueueServiceType, setLatestQueueServiceType] = useState<
        string | null
    >(null);
    const [latestQueuetimeIssued, setLatestQueueTimeIssued] = useState<
        string | null
    >(null);
    const [latestQueueCategory, setLatestQueueCategory] = useState<
        string | null
    >(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [endorsementModalOpen, setEndorsementModalOpen] = useState(false);
    const [isConfirmModalOpenForNext, setIsConfirmModalOpenForNext] =
        useState(false);
    // Generic confirm modal
    const openConfirmModalNext = () => setIsConfirmModalOpenForNext(true);
    const closeConfirmModalNext = () => setIsConfirmModalOpenForNext(false);

    const openConfirmModal = () => setIsConfirmModalOpen(true);
    const closeConfirmModal = () => setIsConfirmModalOpen(false);

    // Next button confirm modal
    const openEndorsementModal = () => setEndorsementModalOpen(true);
    const closeEndorsementModal = () => setEndorsementModalOpen(false);

    const handleConfirmMessage = () => {
        closeConfirmModal();
        updateQueue();
    };

    const fetchData = useCallback(
        async (processName: any, counterName: any) => {
            try {
                const response = await axios.get(
                    "/receptionist/queueCommandCenter/fetchQueue",
                    {
                        params: {
                            // This adds query parameters to the URL
                            process_name: processName,
                            counter_name: counterName,
                        },
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                        },
                    }
                );

                if (response.data.currentlyServing) {
                    setLatestQueueId(response.data.currentlyServing.id);
                    setLatestQueueToken(response.data.currentlyServing.token);
                    setLatestQueueServiceType(
                        response.data.currentlyServing.process_name
                    );
                    setLatestQueueTimeIssued(
                        response.data.currentlyServing.time_in
                    );
                    setLatestQueueCategory(
                        response.data.currentlyServing.person_type
                    );

                    console.log(response.data.currentlyServing);
                } else {
                    setLatestQueueId(null);
                    setLatestQueueToken(null);
                    setLatestQueueServiceType(null);
                    setLatestQueueTimeIssued(null);
                    setLatestQueueCategory(null);
                }

                setData(response.data.queues);
                setDataCalledQueue(response.data.queuesDone);
            } catch (error) {
                // Type assertion to AxiosError
                if (error instanceof AxiosError) {
                    if (error.response) {
                        console.error("Backend Error:", error.response.data);
                    } else {
                        console.error("Axios Error:", error.message);
                    }
                } else {
                    console.error("Unexpected Error:", error);
                }
            } finally {
                isFetching.current = false;
            }
        },
        [currentCounter]
    );
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
    const updateCounterStatus = useCallback(
        async (counterId: any) => {
            try {
                const response = await axios.get(
                    "/receptionist/queueCommandCenter/updateCounter",
                    {
                        params: {
                            // This adds query parameters to the URL
                            counter_name: counterId,
                        },
                    }
                );

                setLocalCounters(response.data.counters);
                console.log(response.data.counters);
            } catch (error) {
                // Type assertion to AxiosError
                if (error instanceof AxiosError) {
                    if (error.response) {
                        console.error("Backend Error:", error.response.data);
                    } else {
                        console.error("Axios Error:", error.message);
                    }
                } else {
                    console.error("Unexpected Error:", error);
                }
            } finally {
                isFetching.current = false;
            }
        },
        [currentCounter]
    );

    useEffect(() => {
        const channel = window.Echo.channel("updateCounterStatus");

        const handler = (event: any) => {
            axios
                .get("/receptionist/queueCommandCenter/fetchCounter")
                .then((response) => {
                    setLocalCounters(response.data.counters);
                })
                .catch((error) => {
                    setErrors(
                        error.response?.data || { general: "An error occurred" }
                    );
                });
        };

        // Correct event name: must be prefixed with a dot and match the PHP event class name
        channel.listen(".App\\Events\\UpdateCounterStatus", handler);

        return () => {
            // Clean up the listener on unmount
            channel.stopListening(".App\\Events\\UpdateCounterStatus", handler);
            window.Echo.leave("updateCounterStatus");
        };
    }, []);

    useEffect(() => {
        // Reset both paginations to page 1
        setWaitingPagination((prev) => ({
            ...prev,
            pageIndex: 0, // Page 1 (0-indexed)
        }));

        setDonePagination((prev) => ({
            ...prev,
            pageIndex: 0, // Page 1 (0-indexed)
        }));

        // Only fetch data if BOTH values are set

        updateCounterStatus(currentCounter);
        console.log("useEffect");
        fetchData(currentProcess, currentCounter);
    }, [currentCounter, currentProcess]);

    useEffect(() => {
        const channel = window.Echo.channel("updateQueueTable");

        const handler = (event: any) => {
            console.log("ecentListener UpdateQueueTable");
            fetchData(currentProcess, currentCounter);
        };

        channel.listen("UpdateQueueTable", handler);

        return () => {
            channel.stopListening("UpdateQueueTable", handler);
            window.Echo.leave("updateQueueTable");
        };
    }, [currentProcess, currentCounter]);

    const handleEndorsementSubmit = () => {
        // Validate fields
        if (!latestQueueToken || !endorsementType) {
            setError("Please fill in all required fields");
            return;
        }
        axios
            .post(
                `/admin/queueTickets/update`,
                {
                    token: currentQueueId,
                    counter: currentCounter,
                    process_name: currentProcess,
                    transfer_process: endorsementType,
                },
                {}
            )
            .then((response) => {
                console.log("Full response:", response);
                console.log("Response data:", response.data);
                console.log("Status code:", response.status);
                fetchData(currentProcess, currentCounter);
            })
            .catch((error) => {
                console.error("Error details:", {
                    message: error.message,
                    response: error.response,
                    request: error.request,
                });
            });
        // Close modal and reset
        setEndorsementModalOpen(false);
        setEndorsementType("");
        setError("");
    };

    const handleConfirmMessageForNext = () => {
        axios
            .post(
                `/admin/queueTickets/update`,
                {
                    token: currentQueueId,
                    counter: currentCounter,
                    process_name: currentProcess,
                    next: true,
                },
                {}
            )
            .then((response) => {
                console.log("Full response:", response);
                console.log("Response data:", response.data);
                console.log("Status code:", response.status);
                fetchData(currentProcess, currentCounter);
            })
            .catch((error) => {
                console.error("Error details:", {
                    message: error.message,
                    response: error.response,
                    request: error.request,
                });
            });
        closeConfirmModalNext();
    };

    const updateQueue = () => {
        axios
            .post(
                `/admin/queueTickets/update`,
                {
                    token: currentQueueId,
                    counter: currentCounter,
                    process_name: currentProcess,
                },
                {}
            )
            .then((response) => {
                console.log("Full response:", response);
                console.log("Response data:", response.data);
                console.log("Status code:", response.status);
                console.log("UpdateQueue");
            })
            .catch((error) => {
                console.error("Error details:", {
                    message: error.message,
                    response: error.response,
                    request: error.request,
                });
            });
    };

    const displayAndCallQueueToken = (id: any, count: any) => {
        console.log("hello it DisplayAndCallQueueToken");
        axios
            .post(
                `/admin/queueTickets/displayQueue`,
                {
                    token: id,
                    count: count,
                    counter: currentCounter,
                    process_name: currentProcess,
                },
                {}
            )
            .then((response) => {})
            .catch((error) => {
                console.log("Error fetching ticket:", error);
            });
    };

    const callQueue = (id: string, count: any) => {
        const lastThreeChars = id.slice(-3);
        setCurrentQueueId(id);

        var message = "";
        if (count == 1) {
            displayAndCallQueueToken(id, count);
            return;
        }
        if (count == 2) {
            displayAndCallQueueToken(id, count);
            return;
        }
        if (count == 3) {
            openConfirmModal();
            return;
        }
        if (count == 4) {
            openEndorsementModal();
            return;
        }
        if (count == 5) {
            openConfirmModalNext();
            return;
        }
    };

    return (
        <Page>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full">
                {/* Row 1 */}
                <Card className="col-span-2 row-span-4 overflow-hidden p-0 m-0 min-w-[300px]">
                    <CardContent className="p-0 m-0 max-h-[500px] overflow-y-auto">
                        {!currentCounter || !currentProcess ? (
                            <div className="flex items-center justify-center h-full min-h-[300px]">
                                <div className="text-center p-4">
                                    <p className="text-gray-500 text-lg">
                                        Please select a counter and process
                                        first
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <DataTable
                                columns={[
                                    ...columns,
                                    {
                                        accessorKey: "id",
                                        header: "Actions",
                                        cell: ({ row }: any) => (
                                            <div className="flex flex-col space-y-2 w-full">
                                                <input
                                                    type="hidden"
                                                    value={row.original.token}
                                                />
                                                <div className="grid grid-cols-3 gap-2 w-full">
                                                    {/* Call Button */}
                                                    <button
                                                        className={`py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center ${
                                                            latestQueueToken
                                                                ? "bg-gray-400 cursor-not-allowed"
                                                                : "bg-blue-600 text-white hover:bg-blue-700"
                                                        }`}
                                                        onClick={() =>
                                                            !latestQueueToken &&
                                                            callQueue(
                                                                row.original
                                                                    .token,
                                                                1
                                                            )
                                                        }
                                                        disabled={
                                                            !!latestQueueToken
                                                        }
                                                    >
                                                        <span>Call</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ),
                                    },
                                ]}
                                data={data}
                                sorting={sorting}
                                setSorting={setSorting}
                                pagination={waitingPagination}
                                setPagination={setWaitingPagination}
                                pageSizeOptions={[10, 25, 50]}
                                tableTitle={`QUEUE TABLE (WAITING) - Counter ${currentCounter}`}
                                countText={String(data.length)}
                            />
                        )}
                    </CardContent>
                </Card>

                <Card className="min-w-[300px] col-span-1 row-span-4 p-4 bg-white shadow-lg rounded-lg flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold">
                            Latest Queue
                        </CardTitle>
                    </CardHeader>

                    {/* Card Content: Display Latest Queue Info */}
                    <CardContent className="flex-1">
                        <div className="space-y-4">
                            {latestQueueToken && currentProcess ? (
                                <>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">
                                            Queue ID:
                                        </span>
                                        <span className="font-semibold text-blue-600">
                                            {latestQueueToken}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">
                                            Service Type:
                                        </span>
                                        <span className="font-semibold text-gray-800">
                                            {latestQueueServiceType || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">
                                            Time Issued:
                                        </span>
                                        <span className="font-semibold text-gray-800">
                                            {latestQueuetimeIssued || "N/A"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">
                                            Category:
                                        </span>
                                        <span className="font-semibold text-gray-800">
                                            {latestQueueCategory || "N/A"}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-gray-500 py-8">
                                    <p>
                                        {currentCounter && currentProcess
                                            ? "No queue available for selected counter/process"
                                            : "Please select both a counter and process first"}
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>

                    {/* Card Footer: Command Buttons - Only show if there's a queue */}
                    {latestQueueToken && currentProcess && (
                        <div className="mt-auto pt-4">
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                <button
                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-sm sm:text-base"
                                    onClick={() =>
                                        callQueue(latestQueueToken, 1)
                                    }
                                >
                                    Call
                                </button>
                                <button
                                    className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700 transition duration-300 text-sm sm:text-base"
                                    onClick={() =>
                                        callQueue(latestQueueToken, 2)
                                    }
                                >
                                    Again
                                </button>
                                <button
                                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 text-sm sm:text-base"
                                    onClick={() =>
                                        callQueue(latestQueueToken, 3)
                                    }
                                >
                                    Last
                                </button>
                                <button
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 text-sm sm:text-base"
                                    onClick={() =>
                                        callQueue(latestQueueToken, 4)
                                    }
                                >
                                    Transfer
                                </button>
                                <button
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 text-sm sm:text-base"
                                    onClick={() =>
                                        callQueue(latestQueueToken, 5)
                                    }
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </Card>

                <Card className="min-w-[300px] col-span-1 row-span-4 p-4 bg-white shadow-lg rounded-lg flex flex-col">
                    <CardContent className="flex-1 p-6">
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                    Counter Control
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Setup your counter
                                </p>
                            </div>

                            <div className="animate-fade-in">
                                {/* Select Options */}
                                <div className="space-y-4">
                                    {/* Monitor Select */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Counter
                                        </label>
                                        <select
                                            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            value={currentCounter ?? ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setCurrentCounter(
                                                    value ? Number(value) : null
                                                );
                                            }}
                                        >
                                            <option value="" disabled>
                                                Please select a counter
                                            </option>
                                            {localCounters.map((num) => (
                                                <option
                                                    key={num.id}
                                                    value={num.id}
                                                    disabled={
                                                        num.is_active != 0
                                                    }
                                                    className={`${
                                                        num.is_active != 0 &&
                                                        num.user_id !==
                                                            auth.user.id
                                                            ? "text-gray-400"
                                                            : ""
                                                    }`}
                                                >
                                                    {num.counter_name}
                                                    {num.is_active != 0 &&
                                                    num.user_id !== auth.user.id
                                                        ? " (In Use)"
                                                        : num.user_id ===
                                                          auth.user.id
                                                        ? " (Yours)"
                                                        : ""}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Process Select */}
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Process
                                        </label>
                                        <select
                                            className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                            value={currentProcess} // This controls the selected option
                                            onChange={(e) =>
                                                setCurrentProcess(
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="" disabled>
                                                Please select a process
                                            </option>
                                            {processes.map((num) => (
                                                <option
                                                    key={num.id}
                                                    value={num.id}
                                                    className="hover:bg-blue-50 dark:hover:bg-gray-700"
                                                >
                                                    {num.process_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Row 2 */}
                <Card className="min-w-[300px] col-span-2 row-span-4 overflow-hidden p-0 m-0">
                    <CardContent className="p-0 m-0 max-h-[500px] overflow-y-auto">
                        {!currentCounter || !currentProcess ? (
                            <div className="flex items-center justify-center h-full min-h-[300px]">
                                <div className="text-center p-4">
                                    <p className="text-gray-500 text-lg">
                                        Please select a counter and process
                                        first
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <DataTable
                                columns={[...columnsCalled]}
                                data={dataCalledQueue}
                                sorting={sorting}
                                setSorting={setSorting}
                                pagination={donePagination}
                                setPagination={setDonePagination}
                                pageSizeOptions={[10, 25, 50]}
                                tableTitle={"QUEUE TABLE (DONE)"}
                                countText={String(dataCalledQueue.length)}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
            {isConfirmModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Confirm Last Call
                        </h2>
                        <p className="mb-4">
                            Are you sure you want to call this for the last
                            time?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeConfirmModal}
                                className="px-4 py-2 bg-gray-200 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmMessage}
                                className="px-4 py-2 bg-green-600 text-white rounded-md"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isConfirmModalOpenForNext && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Confirm Last Call
                        </h2>
                        <p className="mb-4">
                            Are you sure you want to call this for the last
                            time?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeConfirmModalNext}
                                className="px-4 py-2 bg-gray-200 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmMessageForNext}
                                className="px-4 py-2 bg-green-600 text-white rounded-md"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {endorsementModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Endorsement Details
                        </h2>

                        {/* Input Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Endorsement Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 cursor-not-allowed"
                                    placeholder="No queue selected"
                                    readOnly
                                    value={latestQueueToken || ""}
                                />
                                {latestQueueToken && (
                                    <button
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        onClick={() =>
                                            navigator.clipboard.writeText(
                                                latestQueueToken
                                            )
                                        }
                                        title="Copy to clipboard"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Select Field - Endorsement Type */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Endorsement Type*
                            </label>
                            <select
                                className={`w-full p-2 border ${
                                    !endorsementType
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md focus:ring-blue-500 focus:border-blue-500`}
                                value={endorsementType}
                                onChange={(e) => {
                                    setEndorsementType(e.target.value);
                                    setError(""); // Clear error when user selects something
                                }}
                            >
                                <option value="">
                                    Select endorsement type
                                </option>
                                {processes.map((process) => (
                                    <option key={process.id} value={process.id}>
                                        {process.process_name}
                                    </option>
                                ))}
                            </select>
                            {!endorsementType && (
                                <p className="mt-1 text-sm text-red-600">
                                    Please select an endorsement type
                                </p>
                            )}
                        </div>

                        {/* General Error Message */}
                        {error && (
                            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setEndorsementModalOpen(false);
                                    setError("");
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEndorsementSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Page>
    );
}
