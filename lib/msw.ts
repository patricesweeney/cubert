"use client";

import { setupWorker } from "msw/browser";
import { handlers } from "@/mocks/handlers";

let started = false;
export async function startMsw() {
	if (started) return;
	started = true;
	const worker = setupWorker(...handlers);
	await worker.start({
		onUnhandledRequest: "bypass",
	});
}

