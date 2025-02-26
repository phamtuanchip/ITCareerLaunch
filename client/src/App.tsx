import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import LoginPage from "@/pages/auth/LoginPage";
import Dashboard from "@/pages/admin/Dashboard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth/login" component={LoginPage} />
      <ProtectedRoute path="/admin" component={Dashboard} adminOnly />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navbar />
        <Router />
        <Footer />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;