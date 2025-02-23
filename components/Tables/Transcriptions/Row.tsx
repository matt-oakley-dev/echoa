import { formatFBDate } from "@/lib/helpers";

type Props = {
	title: string;
	date: string;
};  
  
export default function Row({ title, date }: Props) {
	return (
		<tr>
			<td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
				<div className="inline-flex items-center gap-x-3">
					<div className="flex items-center gap-x-2">
						<div>
							<h2 className="font-medium text-gray-800 dark:text-white ">{title}</h2>
						</div>
					</div>
				</div>
			</td>
			<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{formatFBDate(date)}</td>
		</tr>
	);
}