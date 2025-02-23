import LiveRecording from "@/components/Recording/LiveRecording";
import FalseRecording from "@/components/Recording/FalseRecording";
import { useRef, useState } from "react";

type RecorderProps = {
	setTranscript: () => void;
	setTranscribing: () => void;
};
  
export default function Recorder({ setTranscript, setTranscribing }: RecorderProps) {
	const [isRecording, setRecording] = useState(false);
	const [duration, setDuration] = useState(0);

	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const audioChunks = useRef<Blob[]>([]);

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					audioChunks.current.push(event.data);
				}
			};

			mediaRecorder.onstop = async () => {
				const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
				audioChunks.current = [];

				setTranscribing(true);
				await sendToOpenAI(audioBlob);
				setTranscribing(false);
			};

			mediaRecorder.start();
			setRecording(true);
			setDuration(0);

			intervalRef.current = setInterval(() => {
				setDuration((prev) => prev + 1);
			}, 1000);
		} catch (error) {
			console.error("Error accessing microphone:", error);
		}
	};

	const formatDuration = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};

	const sendToOpenAI = async (audioBlob: Blob) => {
		const formData = new FormData();
		const audioFile = new File([audioBlob], "recording.wav", { type: "audio/wav" });

		formData.append("file", audioFile);
		formData.append("model", "whisper-1");

		try {
			const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
				method: "POST",
				headers: {
					Authorization: `Bearer ` + process.env.NEXT_PUBLIC_OPEN_AI_SECRET,
				},
				body: formData,
			});

			const data = await response.json();
			if (data.text) {
				setTranscript(data.text);
			} else {
				setTranscript("Error in transcription.");
			}
		} catch (error) {
			console.error("Error sending to OpenAI:", error);
			setTranscript("Error in transcription.");
		}
	};

	const endRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
		}
		setRecording(false);

		// Stop the timer
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	return (
		<>
			<div className="max-w-md w-full">
				<p className="block text-sm text-gray-500 dark:text-gray-300">Recording</p>

				<div className="flex flex-col items-center justify-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
					{false === isRecording ? <FalseRecording/> : <LiveRecording/>}

					<p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">Duration: {formatDuration(duration)}</p>
				</div>

				<div className="max-w-md w-full">
					<div className="mt-3 md:flex md:items-center md:-mx-2">
						{false === isRecording ? <button onClick={startRecording} className="flex justify-center w-full px-2 py-2 text-white bg-red-400 rounded-lg md:mx-2 focus:outline-none w-full">
							<span className="mx-2">
								Start Recording
							</span>
						</button> : 
						<button onClick={endRecording} className="flex justify-center w-full px-2 py-2 text-white bg-red-200 rounded-lg md:mx-2 focus:outline-none w-full">
							<span className="mx-2">
								End Recording
							</span>
						</button>}
					</div>
				</div>
			</div>
		</>
	);
}