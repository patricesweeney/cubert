"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
	{ href: "/", label: "Home" },
	{ href: "/pipeline", label: "Pipeline" },
	{ href: "/acquisition", label: "Acquisition" },
	{ href: "/monetization", label: "Monetization" },
	{ href: "/expansion", label: "Expansion" },
	{ href: "/retention", label: "Retention" },
	{ href: "/alerts", label: "Alerts" },
	{ href: "/reports", label: "Reports" },
	{ href: "/settings", label: "Settings" }
];

export function Sidebar() {
	const pathname = usePathname();
	return (
		<aside className="w-56 bg-neutral-surface border-r border-black/[0.06]">
			<nav className="p-3">
				<ul className="space-y-1">
					{nav.map(item => {
						const active = pathname === item.href;
						return (
							<li key={item.href}>
								<Link
									href={item.href}
									className={[
										"block rounded px-3 py-2 text-sm",
										active ? "bg-black/[0.04] text-neutral-text" : "text-neutral-text/80 hover:bg-black/[0.04]"
									].join(" ")}
								>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
}

