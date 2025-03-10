
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  UserPlus, 
  Users, 
  Upload, 
  Download,
  Settings,
  Info
} from 'lucide-react';
import ProspectButton from '@/components/ProspectButton';
import ProspectModal from '@/components/ProspectModal';
import ProspectList from '@/components/ProspectList';
import { ProspectFormData, Prospect } from '@/utils/types';
import { saveProspect, getProspects, deleteProspect, getCurrentPageInfo } from '@/utils/storage';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [initialData, setInitialData] = useState<{
    name?: string;
    company?: string;
  } | undefined>(undefined);
  
  useEffect(() => {
    // Load prospects from localStorage on mount
    setProspects(getProspects());
  }, []);
  
  const handleOpenModal = () => {
    // Try to pre-fill data from the current page
    const pageInfo = getCurrentPageInfo();
    setInitialData(pageInfo);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInitialData(undefined);
  };
  
  const handleSaveProspect = (data: ProspectFormData) => {
    const newProspect = saveProspect(data);
    setProspects([...prospects, newProspect]);
    setIsModalOpen(false);
    
    toast({
      title: "Prospect Added",
      description: `${data.name} from ${data.company} was added to your CRM.`,
      duration: 3000,
    });
  };
  
  const handleDeleteProspect = (id: string) => {
    deleteProspect(id);
    setProspects(prospects.filter(p => p.id !== id));
    
    toast({
      title: "Prospect Deleted",
      description: "The prospect has been removed from your CRM.",
      duration: 3000,
    });
  };
  
  const handleExportProspects = () => {
    const dataStr = JSON.stringify(prospects);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `crm-prospects-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Export Successful",
      description: `${prospects.length} prospects exported successfully.`,
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="sticky top-0 z-30 w-full backdrop-blur-sm glassmorphism border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-brand-600 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <h1 className="font-medium text-lg">Prospect CRM</h1>
            <Badge variant="outline" className="ml-2 capitalize">Edge Extension</Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label="Information"
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <Tabs defaultValue="prospects" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="prospects" className="rounded-l-md">
              <Users className="h-4 w-4 mr-2" />
              Prospects ({prospects.length})
            </TabsTrigger>
            <TabsTrigger value="export" className="rounded-r-md">
              <Upload className="h-4 w-4 mr-2" />
              Export
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="prospects" className="mt-0">
            <ProspectList 
              prospects={prospects} 
              onDelete={handleDeleteProspect} 
            />
          </TabsContent>
          
          <TabsContent value="export" className="mt-0">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 text-center">
              <h2 className="text-lg font-medium mb-4">Export Your Prospects</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Download your prospects as a JSON file to import into your CRM system.
              </p>
              
              <Button 
                onClick={handleExportProspects}
                disabled={prospects.length === 0}
                className="bg-brand-600 hover:bg-brand-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Export {prospects.length} Prospects
              </Button>
              
              {prospects.length === 0 && (
                <p className="mt-4 text-sm text-gray-400">
                  No prospects to export. Add some first!
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Floating Action Button */}
      <ProspectButton 
        onClick={handleOpenModal} 
        count={prospects.length}
      />
      
      {/* Add Prospect Modal */}
      <ProspectModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={initialData}
        onSave={handleSaveProspect}
      />
    </div>
  );
};

export default Index;
