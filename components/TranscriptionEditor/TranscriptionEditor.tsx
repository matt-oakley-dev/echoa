"use client";

import { useState } from "react";

import BackButton from "@/components/BackButton/BackButton";
import { createTranscript } from "@/lib/fetch/transcripts";
import { useRouter, usePathname } from "next/navigation";
import TranscriptionEditorSkeleton from "./TranscriptionEditorSkeleton";

type EditorProps = {
	initTranscript: string;
	initTitle: string;
};
  
export default function TranscriptionEditor({ initTranscript, initTitle }: EditorProps) {
	const router = useRouter();

	const [title, setTitle] = useState(initTitle);
	const [description, setDescription] = useState(initTranscript);
	const [isSaving, setSaving] = useState(false);

	const saveNote = async () => {
		setSaving(true);
		const newNote = await createTranscript(description, title);
		setSaving(false);

		router.push('/')
	};

	if ( isSaving ) {
		<TranscriptionEditorSkeleton/>
	}

	return (
		<>
		<BackButton/>


		<div className="flex flex-col items-center justify-center space-y-6 p-4">

			<h1 className="mb-4 text-5xl mb-2 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl">Notes Edtor</h1>

			<div className="max-w-md w-full">
				<label htmlFor="title" className="lock text-sm text-gray-400 dark:text-gray-300">Title</label>
				<input
					onChange={(e) => setTitle(e.target.value)}
					id="title"
					value={title}
					type="text" 
					className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
				/>
			</div>

			<div className="max-w-md w-full">
				<label htmlFor="description" className="lock text-sm text-gray-400 dark:text-gray-300">Description</label>
				<textarea
					className="w-full resize-none max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white h-[400px] overflow-y-auto"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					rows={4}
					id="description"
				/>
			</div>

			<div className="max-w-md w-full">
				<button onClick={(e) => {
					saveNote();
				}} className="flex justify-center w-full px-2 py-2 text-white bg-blue-400 rounded-lg md:mx-2 focus:outline-none w-full">
					<span className="mx-2">
						Craete New Note
					</span>
				</button>
			</div>
		</div>
		</>
	);
}