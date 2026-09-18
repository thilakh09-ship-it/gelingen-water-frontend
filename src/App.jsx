import React, { useState, useEffect } from 'react';
import StatusCard from './components/StatusCard';
import SensorCharts from './components/SensorCharts';
import AlertFeed from './components/AlertFeed';

// Mock Data Generator for Standalone Frontend Testing
const createMockReading = (anomaly, fault) => {
  const timestamp = new Date().toISOString();
  if (fault) {
    return {
      sensor_id: 'NODE-01',
      ph: -1.0,
      turbidity: 999.0,
      temperature: 24.0,
      conductivity: 450.0,
      timestamp,
      sensor_health: 40.0,
      is_reliable: false,
      validation_issues: ['pH Out of Physical Bounds', 'Sensor Hardware/Stuck Value Detected'],
      risk_score: 22.0,
      risk_level: 'NORMAL',
      is_anomaly: false,
      warning_reasons: ['Risk Score Discounted Due to Sensor Unreliability'],
    };
  } else if (anomaly) {
    return {
      sensor_id: 'NODE-01',
      ph: +(Math.random() * (6.2 - 5.0) + 5.0).toFixed(2),
      turbidity: +(Math.random() * (15.0 - 8.0) + 8.0).toFixed(2),
      temperature: 29.5,
      conductivity: 950.0,
      timestamp,
      sensor_health: 100.0,
      is_reliable: true,
      validation_issues: [],
      risk_score: 85.0,
      risk_level: 'ALERT',
      is_anomaly: true,
      warning_reasons: ['Multivariate AI Anomaly Detected', 'Rapid pH Shift', 'Turbidity Surge Detected'],
    };
  }
  return {
    sensor_id: 'NODE-01',
    ph: +(Math.random() * (7.6 - 7.0) + 7.0).toFixed(2),
    turbidity: +(Math.random() * (3.0 - 1.0) + 1.0).toFixed(2),
    temperature: 23.5,
    conductivity: 450.0,
    timestamp,
    sensor_health: 100.0,
    is_reliable: true,
    validation_issues: [],
    risk_score: 15.0,
    risk_level: 'NORMAL',
    is_anomaly: false,
    warning_reasons: [],
  };
};

export default function App() {
  const [history, setHistory] = useState([]);
  const [anomalySim, setAnomalySim] = useState(false);
  const [faultSim, setFaultSim] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const newReading = createMockReading(anomalySim, faultSim);
      setHistory((prev) => [...prev.slice(-19), newReading]);
    }, 3000);
    return () => clearInterval(interval);
  }, [anomalySim, faultSim]);

  const latest = history[history.length - 1] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Team GELINGEN — S4</span>
          <h1 className="text-2xl font-extrabold text-white">AI Water Quality Early-Warning System</h1>
        </div>

        <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-xl border border-slate-700">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Demo Controls:</span>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-amber-400">
            <input
              type="checkbox"
              checked={anomalySim}
              onChange={(e) => setAnomalySim(e.target.checked)}
              className="rounded accent-amber-500"
            />
            Inject Water Contamination
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-red-400">
            <input
              type="checkbox"
              checked={faultSim}
              onChange={(e) => setFaultSim(e.target.checked)}
              className="rounded accent-red-500"
            />
            Inject Sensor Fault
          </label>
        </div>
      </header>

      <main>
        <StatusCard latest={latest} />
        <SensorCharts history={history} />
        <AlertFeed latest={latest} />
      </main>
    </div>
  );
}