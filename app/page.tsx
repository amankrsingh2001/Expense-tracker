"use client"
import { ModeToggle } from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import { DollarSign, PieChart, BarChart3, Calendar, Shield, ArrowRight, ChevronRight, Menu, X  } from "lucide-react";
import Image from "next/image";
import {useState} from "react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    
    <div>
        

    </div>
  );
}
