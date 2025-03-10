
import { useState } from 'react';
import { Trash2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { ProspectListProps, Prospect } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

const ProspectList = ({ prospects, onDelete }: ProspectListProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  if (prospects.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No prospects added yet. Use the floating button to capture new prospects.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {prospects.map((prospect) => (
        <Card 
          key={prospect.id}
          className="overflow-hidden border-gray-100 dark:border-gray-800 transition-all duration-200 
                    hover:shadow-md dark:hover:shadow-gray-800/10"
        >
          <div 
            className="p-4 cursor-pointer flex items-center justify-between"
            onClick={() => toggleExpand(prospect.id)}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 
                              h-10 w-10 rounded-full flex items-center justify-center text-lg font-medium">
                {prospect.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium">{prospect.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {prospect.title} at {prospect.company}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs font-normal">
                {prospect.source}
              </Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                {expandedId === prospect.id ? 
                  <ChevronUp className="h-4 w-4" /> : 
                  <ChevronDown className="h-4 w-4" />
                }
              </Button>
            </div>
          </div>
          
          {expandedId === prospect.id && (
            <div className="px-4 pb-4 animate-slide-up">
              <Separator className="mb-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium">{prospect.email}</p>
                </div>
                
                {prospect.phone && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-medium">{prospect.phone}</p>
                  </div>
                )}
                
                {prospect.linkedin && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                    <a 
                      href={prospect.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-600 hover:text-brand-700 font-medium inline-flex items-center"
                    >
                      View Profile
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                )}
                
                {prospect.twitter && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Twitter</p>
                    <a 
                      href={`https://twitter.com/${prospect.twitter.replace('@', '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-600 hover:text-brand-700 font-medium inline-flex items-center"
                    >
                      {prospect.twitter}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
              
              {prospect.notes && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
                  <p className="mt-1 text-sm whitespace-pre-line">{prospect.notes}</p>
                </div>
              )}
              
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  Added {formatDistanceToNow(new Date(prospect.createdAt), { addSuffix: true })}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(prospect.id);
                  }}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ProspectList;
