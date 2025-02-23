export default function LiveRecording() {
	return (
		<div className="relative flex items-center justify-center w-full h-32">
			<div className="absolute w-20 h-20 bg-red-300/30 rounded-full animate-ping duration-[2.5s]"></div>
			<div className="absolute w-16 h-16 bg-red-300/50 rounded-full animate-ping delay-500 duration-[2.5s]"></div>

			<div className="flex items-center justify-center w-14 h-14 bg-red-200 rounded-full">
			</div>
		</div>
	);
}