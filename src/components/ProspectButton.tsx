
import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { ProspectButtonProps } from '@/utils/types';
import { cn } from '@/lib/utils';

const ProspectButton = ({ onClick, count }: ProspectButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      className={cn(
        "prospect-button pulse-ring",
        isHovered ? "shadow-lg" : "shadow-md"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Add prospect to CRM"
    >
      <UserPlus className="h-6 w-6" />
      {count > 0 && (
        <span className="prospect-badge">{count}</span>
      )}
    </button>
  );
};

export default ProspectButton;
