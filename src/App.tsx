import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { ShareModal } from './components/common/ShareModal';
import { InquiryModal } from './components/common/InquiryModal';
import { WhatsAppWidget } from './components/common/WhatsAppWidget';

// Pages
import { HomePage } from './components/home/HomePage';
import { DepartmentsPage } from './components/departments/DepartmentsPage';
import { DepartmentDetailPage } from './components/departments/DepartmentDetailPage';
import { ProductsPage } from './components/pages/ProductsPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { PostsPage } from './components/pages/PostsPage';
import { PostDetailPage } from './components/pages/PostDetailPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { TeamPage } from './components/pages/TeamPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { ClientPortal } from './components/client/ClientPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { currentRoute } = useApp();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

  // Route Dispatcher
  const renderContent = () => {
    const route = currentRoute.trim().toLowerCase();

    // Home
    if (route === '/' || route === '') {
      return <HomePage />;
    }

    // Departments Directory
    if (route === '/departments') {
      return <DepartmentsPage />;
    }

    // Department Detail: /departments/:slug
    if (route.startsWith('/departments/')) {
      const slug = currentRoute.split('/departments/')[1]?.split('/')[0] || '';
      return <DepartmentDetailPage slug={slug} />;
    }

    // Products / Showroom Catalog
    if (route === '/products') {
      return <ProductsPage />;
    }

    // Services Catalog
    if (route === '/services') {
      return <ServicesPage />;
    }

    // News & Posts
    if (route === '/posts') {
      return <PostsPage />;
    }

    // Post Detail: /posts/:slug
    if (route.startsWith('/posts/')) {
      const slug = currentRoute.split('/posts/')[1]?.split('/')[0] || '';
      return <PostDetailPage slug={slug} />;
    }

    // Projects
    if (route === '/projects') {
      return <ProjectsPage />;
    }

    // Team & Leadership
    if (route === '/team') {
      return <TeamPage />;
    }

    // About Corporate
    if (route === '/about') {
      return <AboutPage />;
    }

    // Contact & Inquiries
    if (route === '/contact') {
      return <ContactPage />;
    }

    // Client Portal
    if (route === '/client-portal') {
      return <ClientPortal />;
    }

    // Admin CMS
    if (route === '/admin') {
      return <AdminDashboard />;
    }

    // Fallback to Home
    return <HomePage />;
  };

  const isAdminRoute = currentRoute.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Global Header */}
      <Header />

      {/* Main Page Body */}
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Global Footer (hidden only if on admin page for focused full-screen dashboard) */}
      {!isAdminRoute && <Footer />}

      {/* Global Modals */}
      <GlobalSearchModal />
      <ShareModal />
      <InquiryModal />

      {/* Sitewide Floating WhatsApp Contact Gateway */}
      <WhatsAppWidget />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
