"use client";

import { ReactNode } from "react";

type SideBarProps = {
	active: Boolean;
	svg: ReactNode;
	onClick?: () => void;
};
  
export default function SideBarIcon({ active, svg, onClick }: SideBarProps) {
	const activeClass   = 'p-1.5 inline-block text-blue-500 transition-colors duration-200 bg-blue-100 rounded-lg dark:text-blue-400 dark:bg-gray-800';
	const inActiveClass = 'p-1.5 inline-block text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100';

	return (
		<a href="#" className={active ? activeClass : inActiveClass} onClick={onClick}>
			{svg}
		</a>
	);
}