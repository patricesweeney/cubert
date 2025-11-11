"use client";

import useSWR from "swr";

type TilesData = {
	totalArr: number;
	nrr: number;
	cagr: number;
	churn: number;
	pipelineCoverage: number;
	acv: number;
};

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function Tiles() {
	const { data } = useSWR<TilesData>("/api/tiles", fetcher);
	if (!data) return <div className="text-sm text-neutral-muted">Loading…</div>;
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
			<div className="md:col-span-2 card p-4">
				<Label>Total ARR</Label>
				<Value>{formatCurrency(data.totalArr)}</Value>
			</div>
			<div className="md:col-span-2 card p-4">
				<Label>NRR</Label>
				<Value>{formatPct(data.nrr)}</Value>
			</div>
			<div className="card p-4">
				<Label>CAGR %</Label>
				<Value>{formatPct(data.cagr)}</Value>
			</div>
			<div className="card p-4">
				<Label>Churn %</Label>
				<Value className="text-negative">{formatPct(data.churn)}</Value>
			</div>
			<div className="card p-4">
				<Label>Pipeline coverage</Label>
				<Value>{formatPct(data.pipelineCoverage)}</Value>
			</div>
			<div className="card p-4">
				<Label>ACV</Label>
				<Value>{formatCurrency(data.acv)}</Value>
			</div>
		</div>
	);
}

function Label({ children }: { children: React.ReactNode }) {
	return <div className="text-xs text-neutral-muted mb-1">{children}</div>;
}
function Value({ children, className = "" }: { children: React.ReactNode; className?: string }) {
	return <div className={["text-xl font-semibold tracking-tight", className].join(" ")}>{children}</div>;
}

function formatCurrency(n: number) {
	return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
function formatPct(n: number) {
	return `${(n * 100).toFixed(0)}%`;
}

