import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ServiceCard from "@/components/ServiceCard";
import TeamCard from "@/components/TeamCard";
import { Code2, BookOpen, Users, Rocket } from "lucide-react";

// Assuming InsertContact type is defined elsewhere
interface InsertContact {
  name: string;
  email: string;
  message: string;
}


export default function Home() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContact) =>
      apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    contactMutation.mutate(data as InsertContact);
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section id="home" className="min-h-[90vh] flex items-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Master Tech Skills in
                <span className="text-primary"> 5 Minutes</span> a Day
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Accelerate your IT career with bite-sized learning and expert guidance.
              </p>
              <Button size="lg" className="text-lg">
                Start Learning
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="IT Training"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={Code2}
              title="Programming Courses"
              description="Learn coding through practical, bite-sized lessons."
            />
            <ServiceCard
              icon={BookOpen}
              title="IT Training"
              description="Comprehensive IT skills development programs."
            />
            <ServiceCard
              icon={Users}
              title="Career Guidance"
              description="Expert advice for your tech career journey."
            />
            <ServiceCard
              icon={Rocket}
              title="Skill Development"
              description="Accelerated learning paths for quick results."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TeamCard
              name="Sarah Johnson"
              role="Lead Instructor"
              image="https://images.unsplash.com/photo-1506784926709-22f1ec395907"
            />
            <TeamCard
              name="Michael Chen"
              role="Career Advisor"
              image="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            />
            <TeamCard
              name="Emily Williams"
              role="Technical Coach"
              image="https://images.unsplash.com/photo-1581090700227-1e37b190418e"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
          <div className="max-w-md mx-auto">
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Your Message"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={contactMutation.isPending}
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}