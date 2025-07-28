import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { LanguageProvider } from "./hooks/useLanguage";
import MainLayout from "./components/layout/MainLayout";
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
            <HashRouter>
              <Routes>
                <Route path="/" element={<MainLayout><Index /></MainLayout>} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
                <Route path="/profile" element={<MainLayout><Profile /></MainLayout>} />
                <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
                <Route path="/create-group" element={<MainLayout><CreateGroup /></MainLayout>} />
                <Route path="/my-groups" element={<MainLayout><MyGroups /></MainLayout>} />
                <Route path="/group/:id" element={<MainLayout><GroupDetails /></MainLayout>} />
                <Route path="/group-room/:id" element={<MainLayout><EnhancedGroupRoom /></MainLayout>} />
                <Route path="/company-formation" element={<MainLayout><CompanyFormation /></MainLayout>} />
                <Route path="/company-hub" element={<MainLayout><CompanyHub /></MainLayout>} />
                <Route path="/investment" element={<MainLayout><InvestmentPortal /></MainLayout>} />
                <Route path="/suppliers" element={<MainLayout><Suppliers /></MainLayout>} />
                <Route path="/supplier-dashboard" element={<MainLayout><SupplierDashboard /></MainLayout>} />
                <Route path="/freelancer-dashboard" element={<MainLayout><FreelancerDashboard /></MainLayout>} />
                <Route path="/negotiations" element={<MainLayout><Negotiations /></MainLayout>} />
                <Route path="/contracts" element={<MainLayout><Contracts /></MainLayout>} />
                <Route path="/contract/:id" element={<MainLayout><ContractPage /></MainLayout>} />
                <Route path="/arbitration" element={<MainLayout><ArbitrationHub /></MainLayout>} />
                <Route path="/voting" element={<MainLayout><VotingPage /></MainLayout>} />
                <Route path="/analytics" element={<MainLayout><Analytics /></MainLayout>} />
                <Route path="/admin" element={<MainLayout><AdminDashboard /></MainLayout>} />
                <Route path="/platform-management" element={<MainLayout><PlatformManagement /></MainLayout>} />
                <Route path="/governance" element={<MainLayout><Governance /></MainLayout>} />
                <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
                <Route path="/rfq" element={<MainLayout><RFQ /></MainLayout>} />
                <Route path="/portfolio" element={<MainLayout><Portfolio /></MainLayout>} />
                <Route path="/parties" element={<MainLayout><Parties /></MainLayout>} />
                <Route path="/automation" element={<MainLayout><Automation /></MainLayout>} />
                <Route path="/points" element={<MainLayout><Points /></MainLayout>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </HashRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
