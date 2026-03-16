import React from 'react';

function Header({ title, greeting, subtitle }) {
  return (
    <header className="header">
      {greeting && (
        <p className="header-greeting">
          {greeting} <span className="header-wave" aria-hidden="true">👋</span>
        </p>
      )}
      <h1>{title}</h1>
      {subtitle && <p className="header-subtitle">{subtitle}</p>}
    </header>
  );
}

export default Header;
