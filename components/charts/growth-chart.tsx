"use client";

import useSWR from "swr";
import {
	ResponsiveContainer,
	ComposedChart,
	Area,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";

type GrowthPoint = {
	date: string;
	new: number;
	reactivation: number;
	expansion: number;
	contraction: number;
	churn: number;
	net: number;
	forecast?: boolean;
	se?: number;
};

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function GrowthChart() {
	const { data } = useSWR<GrowthPoint[]>("/api/growth", fetcher);
	if (!data) return <div className="text-sm text-neutral-muted">Loading…</div>;

	const band = data.map(d => ({
		...d,
		upper: d.net + (d.se ?? 0),
		lower: d.net - (d.se ?? 0),
		netHist: d.forecast ? null : d.net,
		netFcst: d.forecast ? d.net : null,
	}));

	return (
		<div className="h-80">
			<ResponsiveContainer>
				<ComposedChart data={band} stackOffset="sign">
					<defs>
						<linearGradient id="band2" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.18} />
							<stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.04} />
						</linearGradient>
					</defs>
					<CartesianGrid stroke="var(--color-neutral-muted)" strokeOpacity={0.3} vertical={false} />
					<XAxis dataKey="date" tick={{ fontSize: 12 }} />
					<YAxis tick={{ fontSize: 12 }} />
					<Tooltip />

					{/* Positive contributors */}
					<Area dataKey="new" stackId="pos" stroke="none" fill="var(--color-neutral-text)" fillOpacity={0.08} />
					<Area dataKey="reactivation" stackId="pos" stroke="none" fill="var(--color-neutral-text)" fillOpacity={0.06} />
					<Area dataKey="expansion" stackId="pos" stroke="none" fill="var(--color-accent)" fillOpacity={0.18} />

					{/* Negative contributors */}
					<Area dataKey="contraction" stackId="neg" stroke="none" fill="var(--color-negative)" fillOpacity={0.2} />
					<Area dataKey="churn" stackId="neg" stroke="none" fill="var(--color-negative)" fillOpacity={0.35} />

					{/* Forecast band over net */}
					<Area dataKey="upper" stroke="none" fill="url(#band2)" />
					<Area dataKey="lower" stroke="none" fill="var(--color-neutral-bg)" />

					{/* Net line */}
					<Line type="monotone" dataKey="netHist" stroke="var(--color-accent-strong)" strokeWidth={2} dot={false} />
					<Line
						type="monotone"
						dataKey="netFcst"
						stroke="var(--color-accent-strong)"
						strokeWidth={2}
						strokeDasharray="5 5"
						dot={false}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}

