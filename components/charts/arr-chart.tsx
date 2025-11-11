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

type ArrPoint = { date: string; arr: number; forecast?: boolean; se?: number };
const fetcher = (url: string) => fetch(url).then(r => r.json());

export function ArrChart() {
	const { data } = useSWR<ArrPoint[]>("/api/arr", fetcher);
	if (!data) return <div className="text-sm text-neutral-muted">Loading…</div>;

	const band = data.map(d => ({
		date: d.date,
		upper: d.arr + (d.se ?? 0),
		lower: d.arr - (d.se ?? 0),
		arrHist: d.forecast ? null : d.arr,
		arrFcst: d.forecast ? d.arr : null,
	}));
	return (
		<div className="h-72">
			<ResponsiveContainer>
				<ComposedChart data={band}>
					<defs>
						<linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.18} />
							<stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.04} />
						</linearGradient>
					</defs>
					<CartesianGrid stroke="var(--color-neutral-muted)" strokeOpacity={0.3} vertical={false} />
					<XAxis dataKey="date" tick={{ fontSize: 12 }} />
					<YAxis tick={{ fontSize: 12 }} />
					<Tooltip />
					<Area dataKey="upper" stroke="none" fill="url(#band)" />
					<Area dataKey="lower" stroke="none" fill="var(--color-neutral-bg)" />
					<Line
						type="monotone"
						dataKey="arrHist"
						stroke="var(--color-accent-strong)"
						strokeWidth={2}
						dot={false}
						isAnimationActive={false}
					/>
					<Line
						type="monotone"
						dataKey="arrFcst"
						stroke="var(--color-accent-strong)"
						strokeWidth={2}
						strokeDasharray="5 5"
						dot={false}
						isAnimationActive={false}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}

