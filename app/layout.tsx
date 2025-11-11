import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { MswProvider } from "@/components/providers/msw-provider";
import { Sidebar } from "@/components/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body>
				<MswProvider>
					<div className="flex h-screen">
						<Sidebar />
						<div className="flex flex-1 flex-col">
							<Topbar />
							<main className="p-6 overflow-auto">{children}</main>
						</div>
					</div>
				</MswProvider>
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

