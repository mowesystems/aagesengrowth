import React from 'react';

const GrowthDashboard: React.FC = () => (
  <div className="growth-dashboard" role="img" aria-label="Illustrativt dashboard med eksempeldata for digital synlighed, konverteringer, trafik og leads">
    <div className="growth-dashboard-note">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      Illustrativt overblik · eksempeldata
    </div>

    <div className="growth-dashboard-grid">
      <div className="dashboard-panel dashboard-panel-wide">
        <div>
          <p className="dashboard-label">Organisk synlighed</p>
          <p className="dashboard-value">Udvikling over tid</p>
        </div>
        <div className="line-chart" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span />
        </div>
      </div>

      <div className="dashboard-panel">
        <div>
          <p className="dashboard-label">AI-synlighed</p>
          <p className="dashboard-value">Struktureret indhold</p>
        </div>
        <div className="score-ring" aria-hidden="true"><span>AI</span></div>
      </div>

      <div className="dashboard-panel dashboard-panel-wide">
        <div>
          <p className="dashboard-label">Konverteringer</p>
          <p className="dashboard-value">Tydelige handlinger</p>
        </div>
        <div className="bar-chart" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span />
        </div>
      </div>

      <div className="dashboard-panel">
        <div>
          <p className="dashboard-label">ROAS</p>
          <p className="dashboard-value">Løbende overblik</p>
        </div>
        <div className="mini-trend" aria-hidden="true"><span /><span /><span /><span /></div>
      </div>
    </div>

    <div className="growth-dashboard-summary">
      {[
        ['Trafik', 'Kanaloverblik'],
        ['Leads', 'Kvalificerede handlinger'],
        ['Kampagner', 'Prioriteret indsats'],
      ].map(([label, value]) => (
        <div key={label}>
          <p className="dashboard-label">{label}</p>
          <p className="text-sm font-medium text-navy">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

export default GrowthDashboard;
