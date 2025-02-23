export default function TranscriptionEditorSkeleton() {
	return (
		<div className="flex flex-col items-center justify-center space-y-6 p-4 animate-pulse">
			<div className="max-w-md w-full space-y-2">
				<div className="h-4 w-20 bg-gray-300 rounded"></div>
				<div className="h-10 w-full bg-gray-200 rounded"></div>
			</div>

			<div className="max-w-md w-full space-y-2">
				<div className="h-4 w-28 bg-gray-300 rounded"></div>
				<div className="h-[400px] w-full bg-gray-200 rounded"></div>
			</div>
		</div>
	);
}
