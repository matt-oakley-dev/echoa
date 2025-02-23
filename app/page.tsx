"use client";

import SkeletonTable from "@/components/Tables/Skeleton/SkeletonTable";
import TranscriptTable from "@/components/Tables/Transcriptions/Table";
import { Button } from "@/components/ui/button";
import withAuth from "@/lib/authentication/withAuth";
import { fetchRecentTranscripts } from "@/lib/fetch/transcripts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function DashboardLayout() {
	const router = useRouter();

	const [transcripts, setTranscripts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadTranscripts = async () => {
			setLoading(true);
			const fetchedTranscripts = await fetchRecentTranscripts();


			setTranscripts(fetchedTranscripts)
			setLoading(false);
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

				{loading && transcripts.length === 0 ? <SkeletonTable/> : ''}
				{!loading && transcripts.length >= 1 ? <TranscriptTable rows={transcripts}/> : <p>No notes created yet</p>}
			</section>
		</>
	);
}

export default withAuth(DashboardLayout, []);