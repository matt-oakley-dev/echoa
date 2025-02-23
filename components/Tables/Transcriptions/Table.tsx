import { table } from "console";
import Row from "./Row";

type Props = {
	rows: [];
};  

export default function Table({ rows }: Props) {
	const tableRows = rows.map(({ id, title, content }) => (
		<Row key={id} title={title} length={content.length} date=""/>
	));

	return (
		<div className="flex flex-col mt-6">
			<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead className="bg-gray-50 dark:bg-gray-800">
								<tr>
									<th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
										<div className="flex items-center gap-x-3">
											<span>Name</span>
										</div>
									</th>

									<th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Date added</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
								{tableRows}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}