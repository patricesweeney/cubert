"use client";

import { useEffect, useState } from "react";
import { Tiles } from "@/components/tiles";
import { ArrChart } from "@/components/charts/arr-chart";
import { GrowthChart } from "@/components/charts/growth-chart";
import { HalfChart } from "@/components/charts/half-chart";

export default function HomePage() {
	const [ready, setReady] = useState(false);
	useEffect(() => {
		setReady(true);
	}, []);

	if (!ready) return null;

	return (
		<div className="space-y-6">
			<Tiles />
			<section className="space-y-6">
				<div className="card p-4">
					<h2 className="text-md font-semibold mb-3">ARR over time + forecast</h2>
					<ArrChart />
				</div>
				<div className="card p-4">
					<div className="flex items-center justify-between">
						<h2 className="text-md font-semibold mb-3">Growth accounting + forecast</h2>
						<div className="text-xs text-neutral-muted">View: $ / %</div>
					</div>
					<GrowthChart />
				</div>
			</section>
			<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="card p-4">
					<h2 className="text-md font-semibold mb-3">NRR + forecast</h2>
					<HalfChart kind="nrr" />
				</div>
				<div className="card p-4">
					<h2 className="text-md font-semibold mb-3">Net new ARR + forecast</h2>
					<HalfChart kind="netnew" />
				</div>
			</section>
		</div>
	);
}

