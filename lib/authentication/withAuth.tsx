"use client";

import React, { useEffect, useState, ComponentType, Component } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthWrapperProps {
    [key: string]: any;
}

export default function withAuth<T extends AuthWrapperProps>(
    Component: ComponentType<T>,
    allowedRoles: string[]
) {
    return function AuthWrapper(props: T) {
        const [user, setUser] = useState<User | null>(null);
		const [loading, setLoading] = useState(true);

        const router = useRouter();

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                if (firebaseUser) {
                    setUser(firebaseUser);
                } else {
                    router.push("/login");
                }

				setLoading(false);
            });

            return () => unsubscribe();
        }, [router]);

		if (loading) {
            return <div className="h-screen flex items-center justify-center"></div>;
        }

        if ( ! user ) {
            return null;
        }

		return React.createElement(Component, { ...props });
    };
}