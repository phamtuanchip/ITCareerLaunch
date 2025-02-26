import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            5Minutes
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                onClick={() => scrollToSection(link.href)}
              >
                {link.label}
              </Button>
            ))}
            {user?.isAdmin === "true" && (
              <Link href="/admin">
                <Button variant="outline">Admin Dashboard</Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    onClick={() => scrollToSection(link.href)}
                    className="w-full justify-start"
                  >
                    {link.label}
                  </Button>
                ))}
                {user?.isAdmin === "true" && (
                  <Link href="/admin">
                    <Button variant="outline" className="w-full">Admin Dashboard</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}