import { useQuery } from "@tanstack/react-query";
import { Service, Team, Contact } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { user } = useAuth();
  
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="services">
        <TabsList>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Management</CardTitle>
            </CardHeader>
            <CardContent>
              {services?.map(service => (
                <div key={service.id} className="p-4 border-b">
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
            </CardHeader>
            <CardContent>
              {team?.map(member => (
                <div key={member.id} className="p-4 border-b">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {contacts?.map(contact => (
                <div key={contact.id} className="p-4 border-b">
                  <h3 className="font-semibold">{contact.name}</h3>
                  <p>{contact.email}</p>
                  <p className="text-muted-foreground">{contact.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
