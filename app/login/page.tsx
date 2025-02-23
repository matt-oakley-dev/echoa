"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/authentication/authentication";
import { useAuth } from "@/context/AuthContext";

export default function AuthForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if ( ! loading && user ) {
			router.push("/");
		}
	}, [loading, user, router]);

	const handleAuth = async (e) => {
		try {
			console.log('sign in')
			await signIn(email, password);
			router.push("/");
		} catch (error) {
			setMessage(error.message);
		}
	};

	return (
        <div className="p-4 max-w-sm mx-auto text-center">
            {/* Title and Icon (Using Tailwind for simple icon representation) */}
            <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 flex items-center justify-center text-white rounded-full text-lg font-bold">
                    ✨
                </div>
                <h1 className="text-2xl font-bold">Echoa</h1>
            </div>

            {/* App Description */}
            <p className="text-gray-600 mb-4">
				An all-in-one AI-powered, voice-driven note-taking app designed for seamless productivity.
            </p>

			<div>
				<input
					type="email"
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="p-2 border w-full mb-2"
				/>
				<input
					type="password"
					placeholder="Enter password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="p-2 border w-full mb-2"
				/>
				<button 
					onClick={(e) => {handleAuth(e)}} 
					className="p-2 bg-blue-500 text-white rounded w-full"
				>
					Sign In
				</button>
				{message && <p className="mt-2 text-red-500">{message}</p>}
			</div>

			<p className="mt-4 text-sm text-gray-500">
                By signing in, you agree to our{" "}
                <a href="/privacy" className="text-blue-500 underline">
                    Privacy Policy
                </a>.
            </p>
		</div>
	);
}
