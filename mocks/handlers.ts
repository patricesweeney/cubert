import { http, HttpResponse } from "msw";

function lastNMonths(n: number) {
	const out: string[] = [];
	const d = new Date();
	d.setDate(1);
	for (let i = n - 1; i >= 0; i--) {
		const dt = new Date(d);
		dt.setMonth(d.getMonth() - i);
		out.push(dt.toISOString().slice(0, 7)); // YYYY-MM
	}
	return out;
}

const months = lastNMonths(18);
const histCount = 12; // historical months

// Tiles
const tiles = {
	totalArr: 23500000,
	nrr: 1.12,
	cagr: 0.38,
	churn: 0.09,
	pipelineCoverage: 3.2,
	acv: 42000,
};

// ARR points with simple upward trend and forecast
const arr = months.map((m, idx) => {
	const base = 15000000 + idx * 600000 + (Math.sin(idx / 2) * 250000);
	const forecast = idx >= histCount;
	const se = forecast ? 180000 + idx * 5000 : 0;
	return { date: m, arr: Math.round(base), forecast, se };
});

// Growth accounting
const growth = months.map((m, idx) => {
	const forecast = idx >= histCount;
	const newArr = 400000 + Math.max(0, Math.sin(idx / 3)) * 120000;
	const reactivation = 50000 + Math.max(0, Math.cos(idx / 4)) * 50000;
	const expansion = 220000 + Math.max(0, Math.sin(idx / 5)) * 90000;
	const contraction = -120000 - Math.max(0, Math.cos(idx / 6)) * 60000;
	const churn = -90000 - Math.max(0, Math.sin(idx / 7)) * 50000;
	const net = newArr + reactivation + expansion + contraction + churn;
	const se = forecast ? 60000 : 0;
	return {
		date: m,
		new: Math.round(newArr),
		reactivation: Math.round(reactivation),
		expansion: Math.round(expansion),
		contraction: Math.round(contraction),
		churn: Math.round(churn),
		net: Math.round(net),
		forecast,
		se,
	};
});

// NRR series around 1.08-1.15 with forecast
const nrr = months.map((m, idx) => {
	const forecast = idx >= histCount;
	const value = 1.08 + Math.sin(idx / 6) * 0.04 + (idx * 0.0008);
	const se = forecast ? 0.01 : 0.005;
	return { date: m, value: Number(value.toFixed(3)), forecast, se };
});

// Net new ARR
const netnew = months.map((m, idx) => {
	const forecast = idx >= histCount;
	const value = 350000 + Math.sin(idx / 3) * 120000 + (idx * 4000);
	const se = forecast ? 60000 : 30000;
	return { date: m, value: Math.round(value), forecast, se };
});

export const handlers = [
	http.get("/api/tiles", () => {
		return HttpResponse.json(tiles);
	}),
	http.get("/api/arr", () => {
		return HttpResponse.json(arr);
	}),
	http.get("/api/growth", () => {
		return HttpResponse.json(growth);
	}),
	http.get("/api/nrr", () => {
		return HttpResponse.json(nrr);
	}),
	http.get("/api/netnew", () => {
		return HttpResponse.json(netnew);
	}),
];

