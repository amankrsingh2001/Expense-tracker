"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  BarChart,
  DollarSign,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "../theme-toggler";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-6 transition-all duration-350 glass border-b-2 `}
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">ExpenseOwl</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="font-medium hover:text-primary/80 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="font-medium hover:text-primary/80 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="font-medium hover:text-primary/80 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="font-medium hover:text-primary/80 transition-colors"
            >
              About
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            <Link href={"auth/signin"}>
              <Button variant="outline" className="rounded-full px-5">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="rounded-full px-5">
                Sign Up <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass shadow-lg animate-slideDown">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link
              href="/"
              className="font-medium px-3 py-2 hover:bg-accent rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              href="/features"
              className="font-medium px-3 py-2 hover:bg-accent rounded-md transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="font-medium px-3 py-2 hover:bg-accent rounded-md transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="font-medium px-3 py-2 hover:bg-accent rounded-md transition-colors"
            >
              About
            </Link>
            <div className="pt-3 flex flex-col space-y-3">
              <Button variant="outline" className="w-full rounded-full">
                Login
              </Button>
              <Button className="w-full rounded-full">
                Sign Up <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
