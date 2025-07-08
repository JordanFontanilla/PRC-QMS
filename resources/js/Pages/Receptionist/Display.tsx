import { useEffect, useState, useRef } from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { PageProps } from "@/types";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

type Queue = {
    id: any;
    token: string;
    process_name: string;
    person_type: string;
    status: string;
    counter: string;
};

interface CustomPageProps extends PageProps {
    queues: Queue[];
}

export default function DisplayMonitor() {
    const { queues } = usePage<CustomPageProps>().props;
    const [data, setData] = useState(queues);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQueue, setSelectedQueue] = useState<string | null>(null);
    const [selectedCounter, setSelectedCounter] = useState<string | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    const speakingState = useRef<Map<string, boolean>>(new Map());
    const speechQueue = useRef<any[]>([]);
    const isProcessingQueue = useRef(false);

    const handleQueueCall = (token: string, counter: any) => {
        setSelectedQueue(token);
        setSelectedCounter(counter);
        setIsModalOpen(true);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "/receptionist/queueCommandCenter/displayServingInMonitor"
            );
            setData(response.data.queues);
        } catch (error) {
            console.error("❌ Error fetching queue data:", error);
        }
    };

    const enqueueSpeech = (text: string, counter: string, token: string) => {
        speechQueue.current.push({ text, counter, token });
        processSpeechQueue();
    };

    const processSpeechQueue = () => {
        if (isProcessingQueue.current || speechQueue.current.length === 0)
            return;

        const { text, counter, token } = speechQueue.current.shift();
        isProcessingQueue.current = true;
        speakingState.current.set(counter, true);

        const utterance = new SpeechSynthesisUtterance(text);

        // Show modal before speaking
        setSelectedQueue(token);
        setSelectedCounter(counter);
        setIsModalOpen(true);

        utterance.onend = () => {
            speakingState.current.set(counter, false);
            setIsModalOpen(false);
            setSelectedQueue(null);
            isProcessingQueue.current = false;
            processSpeechQueue(); // Trigger next in queue
        };

        speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        let channelUpdateQueue: any;
        let channelDisplayQueue: any;

        const setupListeners = () => {
            channelUpdateQueue = window.Echo.channel("updateQueueTable").listen(
                "UpdateQueueTable",
                (event: any) => {
                    console.log("📥 Queue update event:", event);
                    fetchData();
                }
            );

            channelDisplayQueue = window.Echo.channel("displayQueue").listen(
                "DisplayQueueToken",
                async (event: any) => {
                    const token = event.token.slice(-3);
                    let generatedMessage = "";

                    if (event.count === 1) {
                        generatedMessage = `Now serving queue number ${token} at ${event.counter}`;
                    } else if (event.count === 2) {
                        generatedMessage = `Calling again queue number ${token} at ${event.counter}`;
                    } else if (event.count === 3) {
                        generatedMessage = `Last call to queue number ${token} at ${event.counter}`;
                    } else {
                        return;
                    }

                    enqueueSpeech(generatedMessage, event.counter, token);
                }
            );
        };

        setupListeners();

        return () => {
            if (channelUpdateQueue) window.Echo.leave("updateQueueTable");
            if (channelDisplayQueue) window.Echo.leave("displayQueue");
            window.speechSynthesis.cancel();
        };
    }, []);

    if (!hasInteracted) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
                <img
                    src="/Professional_Regulation_Commission_(PRC).svg.png"
                    alt="PRC Logo"
                    className="w-32 h-32 mb-8 animate-pulse"
                />
                <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
                    Welcome to the Queue Display System
                </h1>
                <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
                    To begin displaying the current queue with audio
                    announcements, please click the button below.
                </p>
                <button
                    onClick={() => setHasInteracted(true)}
                    className="bg-blue-700 hover:bg-blue-800 text-white text-xl px-10 py-4 rounded-2xl shadow-lg transition transform hover:scale-105"
                >
                    Start Display with Sound
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-3 gap-4 p-4 w-full h-full">
            <Card className="col-span-1">
                <CardHeader className="flex justify-center py-4">
                    <img
                        src="/Professional_Regulation_Commission_(PRC).svg.png"
                        alt="Placeholder Logo"
                        className="w-24 h-24 object-contain"
                    />
                </CardHeader>
                <CardContent className="flex justify-center">
                    {/* Optional content like video or info here */}
                </CardContent>
            </Card>

            <div className="rounded-xl border bg-card text-card-foreground shadow col-span-2 grid grid-cols-5 gap-2 p-4 overflow-y-auto max-h-[1000px] content-start">
                <div className="col-span-5 mb-4 text-center">
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {"NOW SERVING . . .".split("").map((char, index) => (
                            <motion.span
                                key={index}
                                className="text-3xl font-extrabold text-blue-900 inline-block"
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.8, 1, 0.8],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: index * 0.1,
                                    ease: "easeInOut",
                                }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>

                {data
                    .filter((queue) => queue.status === "SERVING")
                    .map((queue) => (
                        <div key={queue.id} className="h-24">
                            <div className="shadow-md hover:shadow-lg transition-shadow h-full w-full">
                                <div className="bg-blue-100 rounded-md h-full flex flex-col items-center justify-center">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {queue.token.slice(-3)}
                                    </h3>
                                    <span className="text-lg text-blue-800 font-semibold mt-1">
                                        {queue.counter}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {selectedQueue && isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg w-[80%] max-w-2xl shadow-xl">
                        <h3 className="text-4xl font-bold text-center text-gray-900 mb-6">
                            Queue Called: T-{selectedQueue}
                        </h3>
                        <h3 className="text-5xl font-bold text-center text-gray-900">
                            {selectedCounter}
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
}
