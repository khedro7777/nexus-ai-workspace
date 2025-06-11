
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";
import MyGroups from "./pages/MyGroups";
import GroupDetails from "./pages/GroupDetails";
import CompanyHub from "./pages/CompanyHub";
import ArbitrationHub from "./pages/ArbitrationHub";
import Suppliers from "./pages/Suppliers";
import Contracts from "./pages/Contracts";
import Negotiations from "./pages/Negotiations";
import Analytics from "./pages/Analytics";
import Automation from "./pages/Automation";
import NotFound from "./pages/NotFound";
import SupplierDashboard from "./pages/SupplierDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-group" element={<CreateGroup />} />
            <Route path="/my-groups" element={<MyGroups />} />
            <Route path="/group/:id" element={<GroupDetails />} />
            <Route path="/company-hub" element={<CompanyHub />} />
            <Route path="/arbitration-hub" element={<ArbitrationHub />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/negotiations" element={<Negotiations />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
            <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
