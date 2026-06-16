"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Zap,
  LayoutDashboard,
  Utensils,
  Brain,
  Camera,
  MessageCircle,
  User,
  Dumbbell,
  Droplets,
  Crown,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/meals", label: "Meals", icon: Utensils },
  { href: "/planner", label: "Planner", icon: Brain },
  { href: "/scanner", label: "Scanner", icon: Camera },
  { href: "/coach", label: "Coach", icon: MessageCircle },
  { href: "/workout", label: "Workout", icon: Dumbbell },
  { href: "/water", label: "Water", icon: Droplets },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/pricing", label: "Premium", icon: Crown },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-black" fill="black" />
          </div>
          <span className="text-white font-semibold">FitGPT</span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isPremium = item.href === "/pricing";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-white/10 text-white"
                    : isPremium
                      ? "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <form action={logout}>
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent shrink-0"
          >
            Sign out
          </Button>
        </form>
      </div>
    </nav>
  );
}
