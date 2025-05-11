import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CharacterScrollPanelProps {
  title: string;
  className?: string;
  children: ReactNode;
}

export default function CharacterScrollPanel({ 
  title, 
  className,
  children 
}: CharacterScrollPanelProps) {
  return (
    <Card className={cn("h-full overflow-hidden", className)}>
      <CardHeader className="bg-primary/5 pb-3">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 overflow-y-auto max-h-[calc(100%-3.5rem)]">
        {children}
      </CardContent>
    </Card>
  );
}