import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
}

export default function TeamCard({ name, role, image }: TeamCardProps) {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-muted-foreground">{role}</p>
      </CardContent>
    </Card>
  );
}
