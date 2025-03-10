
import React from 'react';
import ReactDOM from 'react-dom/client';
import ProspectButton from './components/ProspectButton';
import ProspectModal from './components/ProspectModal';
import { ProspectFormData } from './utils/types';
import { saveProspect, getProspects, getCurrentPageInfo } from './utils/storage';
import './index.css';
import { ToastProvider } from './components/ui/toast';

// Create container for the floating button
const container = document.createElement('div');
container.id = 'prospect-crm-container';
document.body.appendChild(container);

// Create modal container
const modalContainer = document.createElement('div');
modalContainer.id = 'prospect-crm-modal';
document.body.appendChild(modalContainer);

// Create style container
const styleContainer = document.createElement('div');
styleContainer.id = 'prospect-crm-styles';
document.head.appendChild(styleContainer);

// Inject the components
const root = ReactDOM.createRoot(container);
const modalRoot = ReactDOM.createRoot(modalContainer);

const ContentScript = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [initialData, setInitialData] = React.useState<{
    name?: string;
    company?: string;
  } | undefined>(undefined);
  const [prospects, setProspects] = React.useState<any[]>([]);

  React.useEffect(() => {
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
    
    // Create a toast notification
    const toast = document.createElement('div');
    toast.className = 'prospect-toast';
    toast.innerHTML = `<div class="prospect-toast-content">
      <div class="prospect-toast-title">Prospect Added</div>
      <div class="prospect-toast-description">${data.name} from ${data.company} was added to your CRM.</div>
    </div>`;
    
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('prospect-toast-hiding');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };

  return (
    <ProspectButton 
      onClick={handleOpenModal} 
      count={prospects.length}
    />
  );
};

root.render(<ContentScript />);

// Render the modal separately to avoid z-index issues
const ModalRenderer = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [initialData, setInitialData] = React.useState<any>(undefined);

  // Listen for messages from the button component
  window.addEventListener('message', (event) => {
    if (event.data.type === 'OPEN_PROSPECT_MODAL') {
      setInitialData(event.data.initialData);
      setIsModalOpen(true);
    }
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInitialData(undefined);
  };

  const handleSaveProspect = (data: ProspectFormData) => {
    saveProspect(data);
    setIsModalOpen(false);
  };

  return isModalOpen ? (
    <ProspectModal 
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      initialData={initialData}
      onSave={handleSaveProspect}
    />
  ) : null;
};

modalRoot.render(<ModalRenderer />);
