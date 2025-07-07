
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
import GroupDetails from "./pages/GroupDetails";
import MyGroups from "./pages/MyGroups";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import GroupRoom from "./pages/GroupRoom";
import Negotiations from "./pages/Negotiations";
import Suppliers from "./pages/Suppliers";
import RFQ from "./pages/RFQ";
import Contracts from "./pages/Contracts";
import VotingPage from "./pages/VotingPage";
import Analytics from "./pages/Analytics";
import ArbitrationHub from "./pages/ArbitrationHub";
import Governance from "./pages/Governance";
import Portfolio from "./pages/Portfolio";
import InvestmentPortal from "./pages/InvestmentPortal";
import CompanyFormation from "./pages/CompanyFormation";
import CompanyHub from "./pages/CompanyHub";
import Automation from "./pages/Automation";
import PlatformManagement from "./pages/PlatformManagement";
import AdminDashboard from "./pages/AdminDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import ContractPage from "./pages/ContractPage";
import Parties from "./pages/Parties";
import Points from "./pages/Points";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-group" element={<CreateGroup />} />
              <Route path="/group/:id" element={<GroupDetails />} />
              <Route path="/group/:id/room" element={<GroupRoom />} />
              <Route path="/my-groups" element={<MyGroups />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/negotiations" element={<Negotiations />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/rfq" element={<RFQ />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/contract/:id" element={<ContractPage />} />
              <Route path="/voting" element={<VotingPage />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/arbitration" element={<ArbitrationHub />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/investment" element={<InvestmentPortal />} />
              <Route path="/company-formation" element={<CompanyFormation />} />
              <Route path="/company-hub" element={<CompanyHub />} />
              <Route path="/automation" element={<Automation />} />
              <Route path="/platform" element={<PlatformManagement />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
              <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
              <Route path="/parties" element={<Parties />} />
              <Route path="/points" element={<Points />} />
              <Route path="/services" element={<Services />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
