
import { Prospect, ProspectFormData } from './types';

export const STORAGE_KEY = 'crm_prospects';

export const saveProspect = (prospectData: ProspectFormData): Prospect => {
  const prospects = getProspects();
  
  const newProspect: Prospect = {
    ...prospectData,
    id: generateId(),
    source: window.location.hostname,
    createdAt: new Date().toISOString(),
  };
  
  prospects.push(newProspect);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prospects));
  
  return newProspect;
};

export const getProspects = (): Prospect[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data) as Prospect[];
  } catch (error) {
    console.error('Failed to parse prospects', error);
    return [];
  }
};

export const deleteProspect = (id: string): void => {
  const prospects = getProspects();
  const updatedProspects = prospects.filter(prospect => prospect.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProspects));
};

export const getCurrentPageInfo = (): { company?: string; name?: string } => {
  // This is a simplistic implementation - in a real extension you'd use 
  // more sophisticated detection techniques
  const hostname = window.location.hostname;
  const companyName = hostname.split('.')[0];
  
  // For LinkedIn profile detection (simplified)
  const isLinkedInProfile = hostname.includes('linkedin.com') && 
                           window.location.pathname.includes('/in/');
  
  let name;
  if (isLinkedInProfile) {
    // Very simplified - real implementation would use proper scraping
    const pathSegments = window.location.pathname.split('/');
    name = pathSegments[pathSegments.length - 1].replace(/-/g, ' ');
  }
  
  return {
    company: companyName.charAt(0).toUpperCase() + companyName.slice(1),
    name: name ? name.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') : undefined
  };
};

// Helper function to generate unique IDs
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};
