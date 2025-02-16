import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useNavigate } from "react-router-dom";
import Layout from "@/layout";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  return (
    <>
      <Layout>
        <div>Hello</div>
      </Layout>
    </>
  );
}
