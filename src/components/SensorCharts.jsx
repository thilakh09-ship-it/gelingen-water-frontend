import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SensorCharts({ history }) {
  const labels = history.map((h) => new Date(h.timestamp).toLocaleTimeString());

  const phData = {
    labels,
    datasets: [
      {
        label: 'pH Signal',
        data: history.map((h) => h.ph),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const turbidityData = {
    labels,
    datasets: [
      {
        label: 'Turbidity (NTU)',
        data: history.map((h) => h.turbidity),
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#94a3b8' } },
    },
    scales: {
      x: { ticks: { color: '#64748b' }, grid: { color: '#334155' } },
      y: { ticks: { color: '#64748b' }, grid: { color: '#334155' } },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* pH Real-Time Chart */}
      <div className="bg-slate-800 p-4 border border-slate-700 rounded-xl h-72">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">pH Time-Series Trend</h3>
        <div className="h-56">
          <Line data={phData} options={chartOptions} />
        </div>
      </div>

      {/* Turbidity Real-Time Chart */}
      <div className="bg-slate-800 p-4 border border-slate-700 rounded-xl h-72">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">Turbidity Time-Series Trend</h3>
        <div className="h-56">
          <Line data={turbidityData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}