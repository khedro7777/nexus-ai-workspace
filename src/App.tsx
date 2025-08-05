
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";
import MyGroups from "./pages/MyGroups";
import GroupRoom from "./pages/GroupRoom";
import EnhancedGroupRoom from "./pages/EnhancedGroupRoom";
import GroupDetails from "./pages/GroupDetails";
import Suppliers from "./pages/Suppliers";
import SupplierDashboard from "./pages/SupplierDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import VotingPage from "./pages/VotingPage";
import Negotiations from "./pages/Negotiations";
import RFQ from "./pages/RFQ";
import Contracts from "./pages/Contracts";
import ContractPage from "./pages/ContractPage";
import Services from "./pages/Services";
import Points from "./pages/Points";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import Automation from "./pages/Automation";
import ArbitrationHub from "./pages/ArbitrationHub";
import Portfolio from "./pages/Portfolio";
import Governance from "./pages/Governance";
import PlatformManagement from "./pages/PlatformManagement";
import Parties from "./pages/Parties";
import CompanyFormation from "./pages/CompanyFormation";
import CompanyHub from "./pages/CompanyHub";
import InvestmentPortal from "./pages/InvestmentPortal";
import AdminDashboard from "./pages/AdminDashboard";
import Workflows from "./pages/Workflows";
import C2CStore from "./pages/C2CStore";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-group" element={<CreateGroup />} />
              <Route path="/my-groups" element={<MyGroups />} />
              <Route path="/group-room/:id" element={<GroupRoom />} />
              <Route path="/enhanced-group-room/:id" element={<EnhancedGroupRoom />} />
              <Route path="/group/:id" element={<GroupDetails />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
              <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
              <Route path="/voting" element={<VotingPage />} />
              <Route path="/negotiations" element={<Negotiations />} />
              <Route path="/rfq" element={<RFQ />} />
              <Route path="/contracts" element={<Contracts />} />
              <Route path="/contract/:id" element={<ContractPage />} />
              <Route path="/services" element={<Services />} />
              <Route path="/points" element={<Points />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/automation" element={<Automation />} />
              <Route path="/arbitration" element={<ArbitrationHub />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/platform-management" element={<PlatformManagement />} />
              <Route path="/parties" element={<Parties />} />
              <Route path="/company-formation" element={<CompanyFormation />} />
              <Route path="/company-hub" element={<CompanyHub />} />
              <Route path="/investment" element={<InvestmentPortal />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/c2c-store" element={<C2CStore />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
