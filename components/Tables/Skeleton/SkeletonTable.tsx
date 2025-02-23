export default function SkeletonTable() {
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
					</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
					{
						Array(3)
							.fill(0)
							.map((_, index) => (
							<tr key={index}>
								<td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
									<div className="inline-flex items-center gap-x-3">
										<div className="h-4 w-100 bg-gray-100 dark:bg-gray-500 rounded animate-pulse"></div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				</div>
			</div>
			</div>
		</div>
	);
}