"use client";

import Recorder from "@/components/Recording/Recorder";
import { useState } from "react";
import BackButton from "@/components/BackButton/BackButton";
import TranscriptionEditor from "@/components/TranscriptionEditor/TranscriptionEditor";
import TranscriptionEditorSkeleton from "@/components/TranscriptionEditor/TranscriptionEditorSkeleton";
import withAuth from "@/lib/authentication/withAuth";

function Transcribe() {
	const [transcription, setTranscription]           = useState('');
	const [isTranscribing, setTranscribing] = useState(false);
	const [transcriptionTitle, setTranscriptionTitle] = useState('');

	const setTranscript = (transcript) => {
		setTranscription(transcript)
	};

	const setTitle = (event) => {
		setTranscriptionTitle(event.target.value);
	};

	if ( isTranscribing ) {
		return (
			<TranscriptionEditorSkeleton/>
		)
	}

	if ( transcription ) {
		return (
			<TranscriptionEditor initTitle={transcriptionTitle} initTranscript={transcription}/>
		)
	}

	return (
		<>
		<BackButton/>


		<div className="flex flex-col items-center justify-center space-y-6 p-4">

			<h1 className="mb-4 text-5xl mb-2 font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl">Voice Note</h1>

			<div className="max-w-md w-full">
				<label htmlFor="recording-title" className="lock text-sm text-gray-400 dark:text-gray-300 bg-white">Voice Note Title</label>
				<input
					onChange={setTitle}
					id="recording-title"
					type="text" 
					placeholder="Title..." 
					className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
				/>
			</div>


			<div className="max-w-md w-full">
				<label htmlFor="recording-category" className="block text-sm text-gray-400 dark:text-gray-300 bg-white">
					Enhance Note with AI Assitant
				</label>
				<select
					id="recording-category"
					className="w-full max-w-md p-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
				>
					<option value="">Select a AI Assitant</option>
					<option value="music">Scope and Define</option>
					<option value="podcast">Grammar & Formatting</option>
					<option value="interview">Basic Text Enhancer</option>
					<option value="interview">Brainstorm</option>
				</select>
			</div>

			<Recorder setTranscript={setTranscript} setTranscribing={setTranscribing}/>
		</div>
		</>
	);
}

export default withAuth(Transcribe, []);
