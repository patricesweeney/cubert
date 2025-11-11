"use client";

import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { startMsw } from "@/lib/msw";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			startMsw();
		}
	}, []);

	return (
		<html lang="en" className={GeistSans.className}>
			<body>
				<div className="flex h-screen">
					<Sidebar />
					<div className="flex flex-1 flex-col">
						<Topbar />
						<main className="p-6 overflow-auto">{children}</main>
					</div>
				</div>
			</body>
		</html>
	);
}

function Topbar() {
	return (
		<header className="h-14 border-b border-black/[0.06] bg-neutral-surface flex items-center justify-between px-4">
			<div className="flex items-center gap-3">
				<div className="w-6 h-6 rounded bg-accent" />
				<span className="text-md font-semibold tracking-tight">Cubert</span>
			</div>
			<div className="text-sm text-neutral-muted">Profile</div>
		</header>
	);
}

function Sidebar() {
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

