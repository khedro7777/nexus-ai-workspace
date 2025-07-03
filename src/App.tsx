
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CreateGroup from "./pages/CreateGroup";
import MyGroups from "./pages/MyGroups";
import GroupRoom from "./pages/GroupRoom";
import Suppliers from "./pages/Suppliers";
import ArbitrationHub from "./pages/ArbitrationHub";
import Analytics from "./pages/Analytics";
import Contracts from "./pages/Contracts";
import Negotiations from "./pages/Negotiations";
import InvestmentPortal from "./pages/InvestmentPortal";
import CompanyFormation from "./pages/CompanyFormation";
import CompanyHub from "./pages/CompanyHub";
import AdminDashboard from "./pages/AdminDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import SupplierDashboard from "./pages/SupplierDashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ContractPage from "./pages/ContractPage";
import VotingPage from "./pages/VotingPage";
import Automation from "./pages/Automation";
import NotFound from "./pages/NotFound";
import GroupDetails from "./pages/GroupDetails";
import RFQ from "./pages/RFQ";
import Governance from "./pages/Governance";
import Portfolio from "./pages/Portfolio";
import Points from "./pages/Points";
import Parties from "./pages/Parties";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <AuthProvider>
            <div className="App">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-group" element={<CreateGroup />} />
                <Route path="/my-groups" element={<MyGroups />} />
                <Route path="/group/:id" element={<GroupRoom />} />
                <Route path="/group-details/:id" element={<GroupDetails />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/arbitration-hub" element={<ArbitrationHub />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/contracts" element={<Contracts />} />
                <Route path="/contract/:id" element={<ContractPage />} />
                <Route path="/negotiations" element={<Negotiations />} />
                <Route path="/investment-portal" element={<InvestmentPortal />} />
                <Route path="/company-formation" element={<CompanyFormation />} />
                <Route path="/company-hub" element={<CompanyHub />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
                <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/voting/:id" element={<VotingPage />} />
                <Route path="/automation" element={<Automation />} />
                <Route path="/rfq" element={<RFQ />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/points" element={<Points />} />
                <Route path="/parties" element={<Parties />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </div>
          </AuthProvider>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
