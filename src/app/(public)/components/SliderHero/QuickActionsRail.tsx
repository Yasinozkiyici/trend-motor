"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Calendar, Phone, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/servis", label: "Servis Randevusu", icon: Calendar },
  { href: "/konum",  label: "Servis Noktaları", icon: MapPin },
  { href: "/iletisim", label: "İletişim", icon: Phone },
  { href: "/sohbet", label: "Sohbet", icon: MessageSquare },
];

export default function QuickActionsRail() {
  return (
    <aside
      className={cn(
        "fixed right-0 top-1/3 z-40", // Sağa yapışık
        "hidden md:flex flex-col gap-2"
      )}
      aria-label="Hızlı işlemler"
    >
      {items.map(({ href, label, icon: Icon }) => (
        <RailItem key={href} href={href} label={label} icon={<Icon size={18} />} />
      ))}
    </aside>
  );
}

function RailItem({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* İKON KOLONU (daima görünür) */}
      <Link
        href={href}
        className={cn(
          "grid h-10 w-10 place-items-center",
          "rounded-md border border-neutral-300/60",
          "bg-neutral-900/40 text-neutral-100",
          "backdrop-blur-md shadow-sm",
          "hover:bg-blue-600/80 hover:border-blue-400/60 transition-all duration-200" // Mavi hover efekti
        )}
      >
        {icon}
      </Link>

      {/* SOLA AÇILAN MAVİ BAR */}
      <Link
        href={href}
        className={cn(
          "absolute right-10 top-0 h-10",
          "overflow-hidden rounded-l-md border border-blue-400/60",
          "bg-blue-600/80 text-white",
          "backdrop-blur-md shadow-sm",
          "transition-[width,opacity] duration-200 ease-out",
          open ? "w-[176px] opacity-100" : "w-0 opacity-0"
        )}
        aria-hidden={!open}
        tabIndex={-1}
      >
        <span className="flex h-full items-center px-3 text-sm font-medium">{label}</span>
      </Link>
    </div>
  );
}
