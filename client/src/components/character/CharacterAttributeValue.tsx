import { cn } from "@/lib/utils";
import { IMugenCharacter } from "@/types/character";

interface CharacterAttributeValueProps {
  character: IMugenCharacter;
  attributeKey: string;
  className?: string;
}

export default function CharacterAttributeValue({
  character,
  attributeKey,
  className
}: CharacterAttributeValueProps) {
  const value = character.attributes ? character.attributes[attributeKey] : 0;
  
  // This is a placeholder. In your actual implementation, you would have more logic
  // for formatting and displaying the attribute value with proper styling.
  
  return (
    <span className={cn("font-semibold text-lg", className)}>
      {value}
    </span>
  );
}