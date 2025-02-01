'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsSection from "@/components/sections/ProductsSection";
import NewsSection from "@/components/sections/NewsSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { SearchIcon } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* News Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-lg border bg-card">
          <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search news..."
                className="w-full px-4 py-2 rounded-md border bg-background"
              />
              <SearchIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {/* News Items */}
              <div className="p-4 rounded-lg border bg-background hover:bg-accent transition-colors cursor-pointer">
                <h3 className="font-medium">Tria stealer targets Android users for SMS exfiltration and financial gain</h3>
              </div>
              <div className="p-4 rounded-lg border bg-background hover:bg-accent transition-colors cursor-pointer">
                <h3 className="font-medium">Unveiling Silent Lynx APT Targeting Entities Across Kyrgyzstan & Neighboring Nations</h3>
              </div>
              <div className="p-4 rounded-lg border bg-background hover:bg-accent transition-colors cursor-pointer">
                <h3 className="font-medium">Araneida Scanner: Cracked Acunetix Web App & API Scanner Discovered</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="p-6 rounded-lg border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Products Section</h2>
            <Link 
              href="/add-product"
              className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
            >
              + New Product
            </Link>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-background">
              <h3 className="text-lg font-medium mb-2">tele-bot</h3>
              <p className="text-sm text-muted-foreground mb-3">
                a telegram bot for sending movies, Express, MongoDB...
              </p>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    telegram
                  </span>
                  <span className="text-sm px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    Express
                  </span>
                  <span className="text-sm px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    MongoDB
                  </span>
                  <span className="text-sm px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    React
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                    nodejs
                  </span>
                  <span className="text-sm px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                    database
                  </span>
                  <span className="text-sm px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                    authentication
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Map Section */}
      <section className="rounded-lg border bg-card overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Weather Map</h2>
        </div>
        <div className="aspect-video bg-accent">
          {/* Weather map content */}
        </div>
      </section>
    </div>
  );
} 