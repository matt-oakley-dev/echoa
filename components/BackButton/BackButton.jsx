"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
	const router = useRouter();

	return (
		<div className="w-full flex">
			<button onClick={() => router.push("/")} className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
				<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				className="w-6 h-6 text-gray-800 dark:text-gray-200"
				>
			<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
		</div>
	);
}