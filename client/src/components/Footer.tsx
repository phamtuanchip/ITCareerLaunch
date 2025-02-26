import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SiLinkedin, SiX, SiFacebook } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary">
              5Minutes
            </Link>
            <p className="mt-4 text-muted-foreground">
              Empowering tech careers through quick, effective learning.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Button variant="link" className="h-auto p-0">Services</Button>
              <Button variant="link" className="h-auto p-0">About Us</Button>
              <Button variant="link" className="h-auto p-0">Contact</Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-muted-foreground">
              Email: info@5minutes.edu<br />
              Phone: (555) 123-4567
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <SiLinkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <SiX className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <SiFacebook className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} 5Minutes Education. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}