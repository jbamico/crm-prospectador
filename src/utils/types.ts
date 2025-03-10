
export interface Prospect {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  notes?: string;
  source: string;
  createdAt: string;
}

export interface ProspectData {
  name?: string;
  email?: string;
  company?: string;
  title?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
}

export type ProspectFormData = Omit<Prospect, 'id' | 'createdAt' | 'source'>;

export interface ProspectButtonProps {
  onClick: () => void;
  count: number;
}

export interface ProspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: ProspectData;
  onSave: (data: ProspectFormData) => void;
}

export interface ProspectListProps {
  prospects: Prospect[];
  onDelete: (id: string) => void;
}
