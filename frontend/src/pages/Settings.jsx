import React, { useState } from 'react';

function Settings() {
  const [theme, setTheme] = useState('light');
  const [defaultView, setDefaultView] = useState('list');

  return (
    <div className="page-container">
      <h1>Settings</h1>
      <p className="page-subtitle">Customize your dashboard experience</p>

      <section className="settings-section">
        <h2>Theme</h2>
        <div className="settings-row">
          <label htmlFor="theme-select">Theme</label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
      </section>

      <section className="settings-section">
        <h2>Default View</h2>
        <div className="settings-row">
          <label htmlFor="view-select">Task list view</label>
          <select
            id="view-select"
            value={defaultView}
            onChange={(e) => setDefaultView(e.target.value)}
          >
            <option value="list">List</option>
            <option value="board">Board</option>
          </select>
        </div>
      </section>
    </div>
  );
}

export default Settings;
