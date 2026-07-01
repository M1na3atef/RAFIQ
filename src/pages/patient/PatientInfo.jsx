import { useEffect, useState } from "react";
import InfoCard from "@/components/common/InfoCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    User,
    Phone,
    Droplets,
    Check,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import {
    getPatientProfile,
    updatePatientProfile,
} from "@/services/patientService";

function PatientInfo() {

    const { currentUser } = useAuth();

    const [patient, setPatient] = useState({

        fullName: "",

        age: "",

        gender: "",

        bloodType: "",

        emergencyContact: "",

    });

    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {

        setPatient({

            ...patient,

            [e.target.name]: e.target.value,

        });

    };

    const handleSave = async () => {

        try {

            await updatePatientProfile(

                currentUser.uid,

                patient

            );

            setSaved(true);

            setTimeout(() => {

                setSaved(false);

            }, 2000);

        }

        catch (error) {
        }

    };

    useEffect(() => {

        const loadPatient = async () => {

            if (!currentUser) return;

            const data = await getPatientProfile(

                currentUser.uid

            );

            if (data) {

                setPatient(data);

            }

        };

        loadPatient();

    }, [currentUser]);
    return (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Preview */}

            <Card className="order-1 lg:order-2 h-fit shadow-sm">

                <CardHeader>

                    <CardTitle>

                        Current Patient

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    {

                        patient.fullName === ""

                            ?

                            (

                                <div className="text-center py-8">

                                    <User className="mx-auto w-14 h-14 text-slate-300" />

                                    <p className="mt-4 text-slate-500">

                                        No Patient Profile

                                    </p>

                                    <p className="text-sm text-slate-400">

                                        Complete the form to create your profile.

                                    </p>

                                </div>

                            )

                            :

                            (

                                <div className="space-y-3">

                                    <InfoCard

                                        title="Full Name"

                                        value={patient.fullName}

                                        icon={User}

                                    />

                                    <InfoCard

                                        title="Age"

                                        value={patient.age}

                                    />

                                    <InfoCard

                                        title="Gender"

                                        value={patient.gender}

                                    />

                                    <InfoCard

                                        title="Blood Type"

                                        value={patient.bloodType}

                                        icon={Droplets}

                                    />

                                    <InfoCard

                                        title="Emergency Contact"

                                        value={patient.emergencyContact}

                                        icon={Phone}

                                    />

                                </div>

                            )

                    }

                </CardContent>

            </Card>

            {/* Form */}

            <Card className="order-2 lg:order-1 lg:col-span-2 shadow-sm">

                <CardHeader>

                    <CardTitle>

                        Patient Information

                    </CardTitle>

                </CardHeader>

                <CardContent className="space-y-6">

                    {/* Full Name */}

                    <div>

                        <Label
                            htmlFor="fullName"
                            className="block mb-2"
                        >

                            Full Name

                        </Label>

                        <Input
                            id="fullName"
                            name="fullName"
                            value={patient.fullName}
                            onChange={handleChange}
                            placeholder="Enter patient's full name"
                        />

                    </div>

                    {/* Age & Gender */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>

                            <Label
                                htmlFor="age"
                                className="block mb-2"
                            >

                                Age

                            </Label>

                            <Input
                                id="age"
                                name="age"
                                type="number"
                                value={patient.age}
                                min={0}
                                onChange={handleChange}
                                placeholder="Age"
                            />

                        </div>

                        <div>

                            <Label className="block mb-2">

                                Gender

                            </Label>

                            <Select

                                value={patient.gender}

                                onValueChange={(value) =>

                                    setPatient({

                                        ...patient,

                                        gender: value,

                                    })

                                }

                            >

                                <SelectTrigger className="w-full">

                                    <SelectValue placeholder="Select Gender" />

                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="male">

                                        Male

                                    </SelectItem>

                                    <SelectItem value="female">

                                        Female

                                    </SelectItem>

                                    <SelectItem value="other">

                                        Other

                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                    </div>

                    {/* Blood & Phone */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>

                            <Label className="block mb-2">

                                Blood Type

                            </Label>

                            <Select

                                value={patient.bloodType}

                                onValueChange={(value) =>

                                    setPatient({

                                        ...patient,

                                        bloodType: value,

                                    })

                                }

                            >

                                <SelectTrigger className="w-full">

                                    <SelectValue placeholder="Select Blood Type" />

                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="AB+">AB+</SelectItem>
                                    <SelectItem value="AB-">AB-</SelectItem>
                                    <SelectItem value="O+">O+</SelectItem>
                                    <SelectItem value="O-">O-</SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                        <div>

                            <Label className="block mb-2">

                                Emergency Contact

                            </Label>

                            <Input

                                name="emergencyContact"

                                value={patient.emergencyContact}
                                onChange={handleChange}

                                placeholder="Phone Number"

                            />

                        </div>

                    </div>

                    <Button

                        onClick={handleSave}

                        className={`w-full transition-all ${saved

                            ?

                            "bg-green-600 hover:bg-green-600"

                            :

                            ""

                            }`}

                    >

                        {

                            saved

                                ?

                                <>

                                    <Check className="w-4 h-4 mr-2" />

                                    Saved

                                </>

                                :

                                "Save Information"

                        }

                    </Button>

                </CardContent>

            </Card>

        </div>

    );

}

export default PatientInfo;