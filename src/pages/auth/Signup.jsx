import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPatientProfile } from "@/services/patientService";
import {
    registerUser,
    loginWithGoogle,
} from "@/services/authService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
function Signup() {

    // البيانات اللي هيكتبها المستخدم
    const [formData, setFormData] = useState({

        email: "",

        password: "",

        confirmPassword: ""

    });
    const navigate = useNavigate();
    // تحديث البيانات عند الكتابة
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };
    const handleSignup = async () => { // bt3ml sign up bas

        if (formData.password !== formData.confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        try {

            const userCredential = await registerUser( // bya5odha mn el authService.js w by3ml register ll user w btrg3 userCredential as object

                formData.email,

                formData.password

            );
            const user = userCredential.user;
            await createPatientProfile(user);
            toast.success("Account created successfully.");

            navigate("/login");

        }

        catch (error) {

            toast.error(error.message);

        }

    };
    const handleGoogleSignup = async () => {

        try {

            const result = await loginWithGoogle();

            await createPatientProfile(result.user);

            toast.success("Logged in successfully.");

            navigate("/");

        }

        catch (error) {

            toast.error(error.message);

        }

    };
    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

            <Card className="w-full max-w-md shadow-lg">

                <CardHeader>

                    <CardTitle className="text-center text-3xl">

                        Prime Ride

                    </CardTitle>

                    <p className="text-center text-slate-500">

                        Smart Wheelchair Management System

                    </p>

                </CardHeader>

                <CardContent className="space-y-5">

                    {/* Email */}

                    <div>

                        <Label htmlFor="email">

                            Email

                        </Label>

                        <Input

                            id="email"

                            name="email"

                            type="email"

                            placeholder="Enter your email"

                            value={formData.email}

                            onChange={handleChange}

                        />

                    </div>

                    {/* Password */}

                    <div>

                        <Label htmlFor="password">

                            Password

                        </Label>

                        <Input

                            id="password"

                            name="password"

                            type="password"

                            placeholder="Enter password"

                            value={formData.password}

                            onChange={handleChange}

                        />

                    </div>

                    {/* Confirm Password */}

                    <div>

                        <Label htmlFor="confirmPassword">

                            Confirm Password

                        </Label>

                        <Input

                            id="confirmPassword"

                            name="confirmPassword"

                            type="password"

                            placeholder="Confirm password"

                            value={formData.confirmPassword}

                            onChange={handleChange}

                        />

                    </div>

                    <Button
                        className="w-full"
                        onClick={handleSignup}
                    >

                        Create Account

                    </Button>

                    <Separator />

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleSignup}
                    >

                        Continue with Google

                    </Button>

                    <p className="text-center text-sm">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="text-blue-600 hover:underline"
                        >

                            Login

                        </Link>

                    </p>

                </CardContent>

            </Card>

        </div>

    );

}

export default Signup;