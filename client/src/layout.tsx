import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const fetchUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    } else {
      setUserName(user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/");
    toast({ title: "Logout Successfully" });
  };
  return (
    <SidebarProvider>
      <AppSidebar userName={userName} handleSignOut={handleSignOut} />
      <main className="h-full w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
