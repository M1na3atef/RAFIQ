import { ref, set, get, update } from "firebase/database";
import { db } from "@/firebase/firebase";

export const createPatientProfile = async (user) => {

    const userRef = ref(db, `users/${user.uid}`);

    const snapshot = await get(userRef);

    // لو المستخدم موجود بالفعل
    if (snapshot.exists()) {
        return;
    }

    // لو أول مرة
    await set(userRef, {
        email: user.email,

        patient: {
            fullName: "",
            age: "",
            gender: "",
            bloodType: "",
            emergencyContact: "",
        },

        medicalHistory: {
            diseases: "",
            allergies: "",
            medications: "",
            notes: "",
        },

        wheelchair: {
            connected: false,
            status: "offline",
        },
    });

};
// Get all user data
export const getUserData = async (uid) => {
    const snapshot = await get(ref(db, `users/${uid}`));

    if (snapshot.exists()) {
        return snapshot.val();
    }

    return null;
};

// Get patient profile
export const getPatientProfile = async (uid) => {
    const snapshot = await get(ref(db, `users/${uid}/patient`));

    if (snapshot.exists()) {
        return snapshot.val();
    }

    return null;
};

// Update patient profile
export const updatePatientProfile = async (uid, data) => {
    await update(ref(db, `users/${uid}/patient`), data);
};

// Get medical history
export const getMedicalHistory = async (uid) => {
    const snapshot = await get(ref(db, `users/${uid}/medicalHistory`));

    if (snapshot.exists()) {
        return snapshot.val();
    }

    return null;
};

// Update medical history
export const updateMedicalHistory = async (uid, data) => {
    await update(ref(db, `users/${uid}/medicalHistory`), data);
};