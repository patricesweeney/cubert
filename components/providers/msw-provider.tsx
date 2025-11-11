"use client";

import { useEffect, useState } from "react";
import { startMsw } from "@/lib/msw";

export function MswProvider({ children }: { children: React.ReactNode }) {
	const [ready, setReady] = useState(process.env.NODE_ENV !== "development");
	useEffect(() => {
		let mounted = true;
		if (process.env.NODE_ENV === "development") {
			startMsw().finally(() => {
				if (mounted) setReady(true);
			});
		}
		return () => {
			mounted = false;
		};
	}, []);

	return <>{ready ? children : null}</>;
}

