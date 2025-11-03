import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin Dashboard Pages (Hidden - Link Only Access)
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Parcels from "./pages/Parcels";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Tracking from "./pages/Tracking";
import Layout from "./components/Layout";

// Public Website Pages
import Home from "./pages/Home";
import PublicShipping from "./pages/PublicShipping";
import PublicTracking from "./pages/PublicTracking";
import PublicLocations from "./pages/PublicLocations";
import PublicSupport from "./pages/PublicSupport";
import CustomerAuth from "./pages/CustomerAuth";
import ShipGuest from "./pages/ShipGuest";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Corporate from "./pages/Corporate";
import Portfolio from "./pages/Portfolio";
import EnrollNow from "./pages/EnrollNow";
import ExcelRate from "./pages/ExcelRate";
import PublicLayout from "./components/PublicLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Customer-Facing Website */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/shipping" element={<PublicLayout><PublicShipping /></PublicLayout>} />
          <Route path="/track-parcel" element={<PublicLayout><PublicTracking /></PublicLayout>} />
          <Route path="/locations" element={<PublicLayout><PublicLocations /></PublicLayout>} />
          <Route path="/support" element={<PublicLayout><PublicSupport /></PublicLayout>} />
          <Route path="/customer-auth" element={<PublicLayout><CustomerAuth /></PublicLayout>} />
          <Route path="/ship-guest" element={<PublicLayout><ShipGuest /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/corporate" element={<PublicLayout><Corporate /></PublicLayout>} />
          <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
          <Route path="/enroll-now" element={<PublicLayout><EnrollNow /></PublicLayout>} />
          <Route path="/excel-rate" element={<PublicLayout><ExcelRate /></PublicLayout>} />

          {/* Admin Dashboard (Direct Access) */}
          <Route path="/admin" element={<Auth />} />
          <Route path="/admin/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/admin/parcels" element={<Layout><Parcels /></Layout>} />
          <Route path="/admin/users" element={<Layout><Users /></Layout>} />
          <Route path="/admin/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/admin/tracking" element={<Layout><Tracking /></Layout>} />
          <Route path="/admin/settings" element={<Layout><Settings /></Layout>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
