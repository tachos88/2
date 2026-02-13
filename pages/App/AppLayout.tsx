import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Layout for all routes under /app (dashboard, chat, kennis, etc.).
 * Renders nested route content via Outlet.
 */
const AppLayout: React.FC = () => <Outlet />;

export default AppLayout;
