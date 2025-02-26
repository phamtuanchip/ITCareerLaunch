import { useQuery, useMutation } from "@tanstack/react-query";
import { Service, Team, Contact } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: services } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const { data: team } = useQuery<Team[]>({
    queryKey: ["/api/team"],
  });

  const { data: contacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user?.email}</p>
      </div>

      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contacts?.map(contact => (
                  <div key={contact.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.email}</p>
                      </div>
                      <Button variant="outline" size="sm">Mark as Read</Button>
                    </div>
                    <p className="mt-2">{contact.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services?.map(service => (
                  <div key={service.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <Input 
                          defaultValue={service.title}
                          className="mb-2"
                          placeholder="Service Title"
                        />
                        <Textarea 
                          defaultValue={service.description}
                          placeholder="Service Description"
                        />
                      </div>
                      <div className="space-x-2">
                        <Button size="sm">Update</Button>
                        <Button size="sm" variant="destructive">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team?.map(member => (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <Input 
                          defaultValue={member.name}
                          className="mb-2"
                          placeholder="Member Name"
                        />
                        <Input 
                          defaultValue={member.role}
                          className="mb-2"
                          placeholder="Role"
                        />
                        <Input 
                          defaultValue={member.image}
                          placeholder="Image URL"
                        />
                      </div>
                      <div className="space-x-2">
                        <Button size="sm">Update</Button>
                        <Button size="sm" variant="destructive">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Website Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Footer Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input defaultValue="info@5minutes.edu.vn" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <Input defaultValue="+84.93111.9385" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Address</label>
                      <Input defaultValue="Dong Da, Ha Noi, Viet Nam" />
                    </div>
                    <Button>Update Footer Info</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}