import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Loader2 } from "lucide-react";
function ErrorMessage({ message }: { message: string }) {
    return <p className="text-sm text-red-500">{message}</p>;
}

export default function LoginForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    const [sessionError, setSessionError] = useState<string | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setSessionError(null); // Reset session error before attempt

        post("/authenticate", {
            preserveScroll: true,
            onSuccess: () => {
                reset(); // clear form
                // Optionally, redirect manually or let Inertia handle it based on backend
                // window.location.href = "/dashboard";
            },
            onError: (err) => {
                // If Laravel returns a session error or custom error, you can catch it here
                if (err.email || err.password) return; // Field errors already shown
                setSessionError(
                    "Invalid login or session expired. Please try again."
                );
            },
        });
    };

    const isFormInvalid = !data.email || !data.password || processing;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col items-center justify-center p-4">
            {/* PRC Official Header */}
            <div className="mb-8 text-center">
                <div className="flex justify-center mb-2">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Professional_Regulation_Commission_%28PRC%29.svg/735px-Professional_Regulation_Commission_%28PRC%29.svg.png"
                        alt="PRC Logo"
                        className="h-16 w-auto"
                    />
                </div>
                <h1 className="text-2xl font-bold text-blue-900">
                    Professional Regulation Commission
                </h1>
                <h2 className="text-lg text-blue-800">
                    Cordillera Administrative Region - Baguio
                </h2>
            </div>

            {/* Login Card */}
            <Card className="w-full max-w-md border-0 shadow-xl rounded-lg overflow-hidden">
                {/* Card Header with PRC Colors */}
                <div className="bg-blue-900 py-3 px-6">
                    <CardTitle className="text-xl font-bold text-white text-center">
                        Queue Management System
                    </CardTitle>
                </div>

                <CardContent className="p-6">
                    <form onSubmit={submit} className="space-y-4">
                        {sessionError && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Login Error</AlertTitle>
                                <AlertDescription>
                                    {sessionError}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-blue-900">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                placeholder="your.name@prc.gov.ph"
                                required
                                className="focus:ring-2 focus:ring-blue-700"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-blue-900">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Enter your password"
                                required
                                className="focus:ring-2 focus:ring-blue-700"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={isFormInvalid || processing}
                                className="w-full bg-blue-900 hover:bg-blue-800 h-10"
                            >
                                {processing ? (
                                    <div className="flex items-center justify-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Authenticating...
                                    </div>
                                ) : (
                                    "Access QMS"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>

                {/* Footer with PRC Branding */}
                <CardFooter className="bg-gray-50 px-6 py-4 border-t">
                    <div className="text-center text-sm text-gray-600 w-full">
                        <p>PRC CAR Baguio © {new Date().getFullYear()}</p>
                        <p className="text-xs mt-1"></p>
                    </div>
                </CardFooter>
            </Card>

            {/* Help Section */}
            <div className="mt-6 text-center text-sm text-gray-600">
                <p>Need help? Contact the PRC IT Helpdesk</p>
                <p className="text-blue-700 font-medium">
                    ithelpdesk@prc-car.gov.ph | (074) 442-8936
                </p>
            </div>
        </div>
    );
}
