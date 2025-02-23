"use client";

import SkeletonTable from "@/components/Tables/Skeleton/SkeletonTable";
import TranscriptTable from "@/components/Tables/Transcriptions/Table";
import { Button } from "@/components/ui/button";
import { fetchRecentTranscripts, fetchTotalTranscripts } from "@/lib/fetch/transcripts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
	const router = useRouter();

	const [transcripts, setTranscripts] = useState([]);
	const [totalTranscripts, setTotalTranscripts] = useState(0);

	useEffect(() => {
		const loadTranscripts = async () => {
			const fetchedTranscripts = await fetchRecentTranscripts();
			const fetchedTotal       = await fetchTotalTranscripts();


			setTranscripts(fetchedTranscripts)
			setTotalTranscripts(fetchedTotal)
		};
	
		loadTranscripts();
	  }, []);

	return (
		<>
			<section className="container px-6 mx-auto">
				<div className="flex items-center justify-between">
					<h1 className="text-4xl mb-2 font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl">Notes</h1>

					<Button
						className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-all"
						onClick={() => router.push("/transcribe")}
					>
						New Note
					</Button>
				</div>

				{transcripts.length > 1 ? <TranscriptTable rows={transcripts}/> : <SkeletonTable/>}
			</section>
		</>
	);
}