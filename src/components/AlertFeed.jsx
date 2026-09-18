import React from 'react';

export default function AlertFeed({ latest }) {
  if (!latest) return null;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
      <h3 className="text-md font-semibold text-slate-200 mb-3 flex items-center gap-2">
        <span>🤖</span> AI Early-Warning Context & Diagnostic Reasons
      </h3>
      
      {latest.warning_reasons && latest.warning_reasons.length > 0 ? (
        <ul className="space-y-2">
          {latest.warning_reasons.map((reason, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm bg-slate-900/60 p-2.5 rounded border border-slate-700/50 text-amber-300">
              <span>⚠️</span>
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-emerald-400 bg-emerald-950/30 p-3 rounded border border-emerald-800/40">
          ✓ All signals operating within baseline AI safety parameters.
        </div>
      )}

      {latest.validation_issues && latest.validation_issues.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Sensor Validation Faults</h4>
          <div className="space-y-1">
            {latest.validation_issues.map((issue, idx) => (
              <div key={idx} className="text-xs text-red-300 bg-red-950/40 p-2 rounded border border-red-900/50">
                ⚡ {issue}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}