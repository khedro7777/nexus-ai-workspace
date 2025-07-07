import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { LanguageProvider } from "./hooks/useLanguage";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CreateGroup from "./pages/CreateGroup";
import MyGroups from "./pages/MyGroups";
import GroupDetails from "./pages/GroupDetails";
import EnhancedGroupRoom from "./pages/EnhancedGroupRoom";
import CompanyFormation from "./pages/CompanyFormation";
import CompanyHub from "./pages/CompanyHub";
import InvestmentPortal from "./pages/InvestmentPortal";
import Suppliers from "./pages/Suppliers";
import SupplierDashboard from "./pages/SupplierDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import Negotiations from "./pages/Negotiations";
import Contracts from "./pages/Contracts";
import ContractPage from "./pages/ContractPage";
import ArbitrationHub from "./pages/ArbitrationHub";
import VotingPage from "./pages/VotingPage";
import Analytics from "./pages/Analytics";
import AdminDashboard from "./pages/AdminDashboard";
import PlatformManagement from "./pages/PlatformManagement";
import Governance from "./pages/Governance";
import Services from "./pages/Services";
import RFQ from "./pages/RFQ";
import Portfolio from "./pages/Portfolio";
import Parties from "./pages/Parties";
import Automation from "./pages/Automation";
import Points from "./pages/Points";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/create-group" element={<CreateGroup />} />
                <Route path="/my-groups" element={<MyGroups />} />
                <Route path="/group/:id" element={<GroupDetails />} />
                <Route path="/group-room/:id" element={<EnhancedGroupRoom />} />
                <Route path="/company-formation" element={<CompanyFormation />} />
                <Route path="/company-hub" element={<CompanyHub />} />
                <Route path="/investment" element={<InvestmentPortal />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
                <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
                <Route path="/negotiations" element={<Negotiations />} />
                <Route path="/contracts" element={<Contracts />} />
                <Route path="/contract/:id" element={<ContractPage />} />
                <Route path="/arbitration" element={<ArbitrationHub />} />
                <Route path="/voting" element={<VotingPage />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/platform-management" element={<PlatformManagement />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/services" element={<Services />} />
                <Route path="/rfq" element={<RFQ />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/parties" element={<Parties />} />
                <Route path="/automation" element={<Automation />} />
                <Route path="/points" element={<Points />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
