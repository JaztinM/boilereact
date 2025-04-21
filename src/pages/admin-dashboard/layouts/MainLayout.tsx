import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import '../admin.css';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };
  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-content">
          {/* Logo */}
          <div className="sidebar-logo">
            <svg width="17" height="40" viewBox="0 0 17 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.6759 28.1842C13.5006 27.486 15.0641 26.2427 16.1551 24.6254L16.7063 29.0354C16.9319 30.8402 15.8491 32.5525 14.1217 33.1223L4.00216 36.4607C2.36397 37.0011 0.983011 38.119 0.112825 39.5995L0.795944 34.4761C0.980285 33.0935 1.90602 31.9225 3.20871 31.4241L11.6759 28.1842Z" fill="#1A1A1A" stroke="#1A1A1A" stroke-width="0.129032" />
              <path d="M10.9406 17.7976C12.5791 17.1539 13.913 15.9185 14.6812 14.3403L15.2578 18.0034C15.5373 19.7787 14.5369 21.5077 12.8585 22.1502L4.84106 25.2192C3.38744 25.7756 2.20951 26.8677 1.54271 28.2614L2.16061 23.3756C2.33524 21.9947 3.24961 20.8193 4.54505 20.3103L10.9406 17.7976Z" fill="#1A1A1A" stroke="#1A1A1A" stroke-width="0.129032" />
              <path d="M8.9149 9.09467C10.8358 8.41018 12.3715 6.94279 13.1448 5.06352L13.6814 7.8914C14.0159 9.654 13.0742 11.4109 11.4212 12.1082L6.55219 14.1622C4.90935 14.8552 3.55262 16.0819 2.69761 17.6384L3.26615 13.3081C3.45219 11.8911 4.41627 10.6977 5.7625 10.218L8.9149 9.09467Z" fill="#1A1A1A" stroke="#1A1A1A" stroke-width="0.129032" />
              <rect x="5.84766" width="5.16129" height="5.16129" rx="2.58065" fill="#1A1A1A" />
            </svg>
          </div>

          {/* Navigation Links */}
          <div className="nav-links">
            <Link
              to="/admin/dashboard"
              className={`nav-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" className="nav-icon">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
              </svg>
            </Link>
            <Link
              to="/admin/flagged"
              className={`nav-item ${location.pathname === '/admin/flagged' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" className="nav-icon">
                <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
              </svg>
            </Link>
            <Link
              to="/admin/verification"
              className={`nav-item ${location.pathname === '/admin/verification' ? 'active' : ''}`}
            >
              <svg viewBox="0 0 24 24" className="nav-icon">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </Link>
          </div>

          {/* Settings/Logout Section */}
          <div className="sidebar-footer">
            <button className="nav-item settings">
              <svg viewBox="0 0 24 24" className="nav-icon">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
            </button>
            <button onClick={handleLogout} className="nav-item logout">
              <svg viewBox="0 0 24 24" className="nav-icon">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
      <div className="app-container">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout; 