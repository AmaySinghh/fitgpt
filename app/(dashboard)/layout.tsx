import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardNav from "@/components/shared/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-black">
      <DashboardNav />
      <div className="pt-16">{children}</div>
    </div>
  );
}
