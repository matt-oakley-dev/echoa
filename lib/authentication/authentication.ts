import { auth, db } from "@/lib/firebase";
import { 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        sendPasswordResetEmail, 
        signOut 
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

// Function to sign up a new user with email & password
const signUp = async (email, password) => {
        try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			// Store user in Firestore with a default role
			await setDoc(doc(db, "users", user.uid), {
					uid: user.uid,
					email: user.email,
					role: "user", // Default role
			});

			return user;
        } catch (error) {
			console.error("Error signing up:", error.message);
			throw error;
        }
};

// Function to sign in a user with email & password
const signIn = async (email, password) => {
        try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			return userCredential.user;
        } catch (error) {
			console.error("Error signing in:", error.message);
			throw error;
        }
};

// Function to send a password reset email
const resetPassword = async (email) => {
        try {
			await sendPasswordResetEmail(auth, email);
			console.log("Password reset email sent.");
        } catch (error) {
			console.error("Error sending password reset email:", error.message);
			throw error;
        }
};

// Function to log out the user
const logOut = async () => {
    await signOut(auth);
};


export { signUp, signIn, resetPassword, logOut };
