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
	ErrorBar,
} from "recharts";

type Point = { date: string; value: number; forecast?: boolean; se?: number };
const fetcher = (url: string) => fetch(url).then(r => r.json());

export function HalfChart({ kind }: { kind: "nrr" | "netnew" }) {
	const url = kind === "nrr" ? "/api/nrr" : "/api/netnew";
	const { data } = useSWR<Point[]>(url, fetcher);
	if (!data) return <div className="text-sm text-neutral-muted">Loading…</div>;

	const series = data.map(d => ({
		date: d.date,
		upper: d.value + (d.se ?? 0),
		lower: d.value - (d.se ?? 0),
		hist: d.forecast ? null : d.value,
		fcst: d.forecast ? d.value : null,
		se: d.se ?? 0,
	}));

	const isPct = kind === "nrr";

	return (
		<div className="h-64">
			<ResponsiveContainer>
				<ComposedChart data={series}>
					<defs>
						<linearGradient id={`band-${kind}`} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.18} />
							<stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.04} />
						</linearGradient>
					</defs>
					<CartesianGrid stroke="var(--color-neutral-muted)" strokeOpacity={0.3} vertical={false} />
					<XAxis dataKey="date" tick={{ fontSize: 12 }} />
					<YAxis tick={{ fontSize: 12 }} domain={isPct ? [0.8, 1.2] : ["auto", "auto"]} />
					<Tooltip />
					{isPct && (
						<Line type="monotone" dataKey={() => 1} stroke="var(--color-neutral-muted)" strokeDasharray="3 3" dot={false} />
					)}
					<Area dataKey="upper" stroke="none" fill={`url(#band-${kind})`} />
					<Area dataKey="lower" stroke="none" fill="var(--color-neutral-bg)" />
					<Line type="monotone" dataKey="hist" stroke="var(--color-accent-strong)" strokeWidth={2} dot={false} />
					<Line
						type="monotone"
						dataKey="fcst"
						stroke="var(--color-accent-strong)"
						strokeWidth={2}
						strokeDasharray="5 5"
						dot={false}
					/>
					<ErrorBar dataKey="hist" width={4} stroke="var(--color-accent-strong)" direction="y" data={series.map(s => ({ x: s.date, yBottom: s.hist != null ? s.hist - s.se : null, yTop: s.hist != null ? s.hist + s.se : null }))} />
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}

