import Page from "@/Pages/Dashboard";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core";
import { useState } from "react";
import { router } from "@inertiajs/react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
const csrfToken = document.head
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");
interface Process {
    id: string;
    process_name: string;
}

interface ServiceAssignmentsProps extends PageProps {
    processes: Process[];
    errors?: {
        [key: string]: string;
    };
}

export default function ServiceCards() {
    // Get processes from Inertia
    const { processes } = usePage<ServiceAssignmentsProps>().props;
    const [priorityType, setPriorityType] = useState<string>("Regular");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmPrintOpen, setIsConfirmPrintOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [ticketNumber, setTicketNumber] = useState("");
    const [timeIssued, setTimeIssued] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [serviceTypeId, setServiceTypeId] = useState("");
    const [serviceInstitutionName, setServiceInstitutionName] = useState("");
    const [ticketTypeText, setTicketTypeText] = useState("");
    const [waitingMessage, setWaitingMessage] = useState("");
    const [printButtonText, setPrintButtonText] = useState("");
    const [closeButtonText, setCloseButtonText] = useState("");
    const openConfirmationModal = () => {
        setIsConfirmPrintOpen(true);
    };

    const closeConfirmationModal = () => {
        setIsConfirmPrintOpen(false);
    };

    const closeQueueTicketModel = () => {
        setIsModalOpen(false);
    };

    const handleConfirmPrint = () => {
        
        console.log("Printing ticket:", ticketNumber);
        closeConfirmationModal(); 
        console.log("asdasdasdas" + serviceTypeId);
        axios
            .post(
                "/receptionist/serviceAssignments/store",
                {
                    token: ticketNumber, 
                    time_in: timeIssued, 
                    service_type: serviceTypeId, 
                    person_type: priorityType,
                },
                {
                    headers: {
                        "X-CSRF-TOKEN": csrfToken || "", 
                    },  
                }
            )
            .then((response) => {
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error("Error fetching ticket:", error);
            });
    };

    const handleQueueTicketModal = (process: any, e: React.MouseEvent) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        console.log("Selected Process ID:", process.id);
        const updateTime = () => {
            const now = new Date();
            setTimeIssued(now.toLocaleTimeString());
        };
        const now = new Date();
        const ticketNumber = `T-${now.getFullYear()}-${String(
            now.getMonth() + 1
        ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(
            now.getHours()
        ).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;

        // Format the current date
        const currentDate = now.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
        });

        // Set all the state values

        setPriorityType("Regular");
        setModalTitle("Queue Ticket");
        setServiceInstitutionName("PRC-CAR SERVICE");
        updateTime();
        setServiceType(process.process_name);
        setTicketTypeText("Queue Ticket");
        setWaitingMessage("Please wait for your number to be called");
        setPrintButtonText("Print Ticket");
        setCloseButtonText("Close");
        setServiceTypeId(process.id);
        // If you need to fetch additional data from the server
        axios
            .get("/receptionist/generateQueueTicket")
            .then((response) => {
                console.log("Ticket:", response.data);
                setTicketNumber(response.data.ticket);

                setCurrentDate(currentDate);
                setIsModalOpen(true);
            })
            .catch((error) => {
                console.error("Error fetching ticket:", error);
            });
    };

    return (
        <Page>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {processes.map((process) => (
                    <button
                        key={process.id}
                        type="button"
                        onClick={(e) => handleQueueTicketModal(process, e)}
                        className="block w-full p-6 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors text-center"
                    >
                        <h3 className="text-lg font-medium text-gray-900">
                            {process.process_name}
                        </h3>
                        <div className="mt-4">
                            <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                Get Ticket
                            </span>
                        </div>
                    </button>
                ))}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">
                                {modalTitle}
                            </h2>
                            <button
                                onClick={closeQueueTicketModel}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Priority Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Priority Type *
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={priorityType}
                                    onChange={(e) =>
                                        setPriorityType(e.target.value)
                                    }
                                >
                                    <option value="Regular">Regular</option>
                                    <option value="PWD">
                                        Person-with-disabilities (PWD)
                                    </option>
                                    <option value="Senior">
                                        Senior Citizen
                                    </option>
                                    <option value="Pregnant/Nursing">
                                        Pregnant Woman/Nursing Woman
                                    </option>
                                </select>
                            </div>

                            {/* Dynamic Ticket Information */}
                            <div
                                className={`border-2 border-dashed p-4 rounded-lg ${
                                    priorityType === "Regular"
                                        ? "border-gray-300"
                                        : priorityType === "PWD"
                                        ? "border-purple-500"
                                        : priorityType === "Senior"
                                        ? "border-blue-500"
                                        : priorityType === "Pregnant/Nursing"
                                        ? "border-pink-500"
                                        : "border-green-500"
                                }`}
                            >
                                <div className="text-center mb-4">
                                    <h3 className="text-lg font-bold">
                                        {serviceInstitutionName}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {ticketTypeText}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Ticket Number
                                        </p>
                                        <p className="font-bold">
                                            {ticketNumber}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Time Issued
                                        </p>
                                        <p className="font-bold">
                                            {timeIssued}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Date
                                        </p>
                                        <p className="font-bold">
                                            {currentDate}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Priority
                                        </p>
                                        <p
                                            className={`font-bold ${
                                                priorityType === "PWD"
                                                    ? "text-purple-600"
                                                    : priorityType === "Senior"
                                                    ? "text-blue-600"
                                                    : priorityType ===
                                                      "Pregnant/Nursing"
                                                    ? "text-pink-600"
                                                    : priorityType === "Nursing"
                                                    ? "text-green-600"
                                                    : "text-gray-800"
                                            }`}
                                        >
                                            {priorityType}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Service
                                        </p>
                                        <p className="font-bold">
                                            {serviceType}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-center py-2 bg-gray-100 rounded">
                                    <p className="text-sm font-semibold">
                                        {waitingMessage}
                                    </p>
                                </div>
                            </div>

                            {/* Print Button */}
                            <div className="flex justify-center mt-6">
                                <button
                                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                                    onClick={() => setIsConfirmPrintOpen(true)} // This ensures it's executed when clicked
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {printButtonText}
                                </button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={closeQueueTicketModel}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    {closeButtonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Confirmation Modal for Print */}
            {isConfirmPrintOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Confirm Print
                        </h2>
                        <p className="mb-4">
                            Are you sure you want to print the ticket?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeConfirmationModal}
                                className="px-4 py-2 bg-gray-200 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPrint}
                                className="px-4 py-2 bg-green-600 text-white rounded-md"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Page>
    );
}
