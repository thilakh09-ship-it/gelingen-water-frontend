import React from 'react';

export default function StatusCard({ latest }) {
  if (!latest) return <div className="p-4 bg-slate-800 rounded-lg">Loading System Data...</div>;

  const getRiskColor = (level) => {
    switch (level) {
      case 'ALERT': return 'bg-red-500/20 border-red-500 text-red-400';
      case 'WATCH': return 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
      default: return 'bg-emerald-500/20 border-emerald-500 text-emerald-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {/* Water Risk Level Card */}
      <div className={`p-4 border rounded-xl ${getRiskColor(latest.risk_level)}`}>
        <div className="text-xs font-semibold uppercase tracking-wider">Water Risk Level</div>
        <div className="text-3xl font-bold mt-1">{latest.risk_level}</div>
        <div className="text-xs mt-2">Score: {latest.risk_score} / 100</div>
      </div>

      {/* Sensor Health Score Card */}
      <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl">
        <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Sensor Health</div>
        <div className="text-3xl font-bold mt-1 text-blue-400">{latest.sensor_health}%</div>
        <div className="text-xs text-slate-400 mt-2">
          {latest.is_reliable ? '● Reliable Operations' : '⚠️ Sensor Fault Detected'}
        </div>
      </div>

      {/* Current pH Metric */}
      <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl">
        <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider">pH Level</div>
        <div className="text-3xl font-bold mt-1 text-slate-100">{latest.ph}</div>
        <div className="text-xs text-slate-400 mt-2">Target: 6.5 - 8.5</div>
      </div>

      {/* Current Turbidity Metric */}
      <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl">
        <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Turbidity</div>
        <div className="text-3xl font-bold mt-1 text-slate-100">
          {latest.turbidity} <span className="text-sm font-normal text-slate-400">NTU</span>
        </div>
        <div className="text-xs text-slate-400 mt-2">Target: &lt; 5.0 NTU</div>
      </div>
    </div>
  );
}