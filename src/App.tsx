
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MyGroups from "./pages/MyGroups";
import CreateGroup from "./pages/CreateGroup";
import GroupRoom from "./pages/GroupRoom";
import GroupDetails from "./pages/GroupDetails";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Suppliers from "./pages/Suppliers";
import SupplierDashboard from "./pages/SupplierDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import Negotiations from "./pages/Negotiations";
import Analytics from "./pages/Analytics";
import VotingPage from "./pages/VotingPage";
import Contracts from "./pages/Contracts";
import ContractPage from "./pages/ContractPage";
import ArbitrationHub from "./pages/ArbitrationHub";
import Governance from "./pages/Governance";
import InvestmentPortal from "./pages/InvestmentPortal";
import CompanyFormation from "./pages/CompanyFormation";
import CompanyHub from "./pages/CompanyHub";
import Automation from "./pages/Automation";
import PlatformManagement from "./pages/PlatformManagement";
import AdminDashboard from "./pages/AdminDashboard";
import Services from "./pages/Services";
import Points from "./pages/Points";
import RFQ from "./pages/RFQ";
import Portfolio from "./pages/Portfolio";
import Parties from "./pages/Parties";
import GatewayPage from "./pages/GatewayPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-gray-50/30" dir="rtl">
              <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
              
              <div className="flex-1 flex flex-col min-w-0">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                
                <main className="flex-1 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/my-groups" element={<MyGroups />} />
                    <Route path="/create-group" element={<CreateGroup />} />
                    <Route path="/group/:id" element={<GroupRoom />} />
                    <Route path="/group-details/:id" element={<GroupDetails />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
                    <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
                    <Route path="/negotiations" element={<Negotiations />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/voting" element={<VotingPage />} />
                    <Route path="/contracts" element={<Contracts />} />
                    <Route path="/contract/:id" element={<ContractPage />} />
                    <Route path="/arbitration" element={<ArbitrationHub />} />
                    <Route path="/governance" element={<Governance />} />
                    <Route path="/investment" element={<InvestmentPortal />} />
                    <Route path="/company-formation" element={<CompanyFormation />} />
                    <Route path="/company-hub" element={<CompanyHub />} />
                    <Route path="/automation" element={<Automation />} />
                    <Route path="/platform" element={<PlatformManagement />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/points" element={<Points />} />
                    <Route path="/rfq" element={<RFQ />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/parties" element={<Parties />} />
                    
                    {/* البوابات الجديدة */}
                    <Route path="/gateway/:gatewayId" element={<GatewayPage />} />
                    <Route path="/cooperative-purchasing" element={<GatewayPage />} />
                    <Route path="/cooperative-marketing" element={<GatewayPage />} />
                    <Route path="/freelancers-individual" element={<GatewayPage />} />
                    <Route path="/freelancers-group" element={<GatewayPage />} />
                    <Route path="/suppliers-individual" element={<GatewayPage />} />
                    <Route path="/suppliers-group" element={<GatewayPage />} />
                    <Route path="/company-formation-individual" element={<GatewayPage />} />
                    <Route path="/company-formation-group" element={<GatewayPage />} />
                    <Route path="/service-providers" element={<GatewayPage />} />
                    <Route path="/marketplace" element={<GatewayPage />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
