
import { toast } from 'sonner';

export interface DraftData {
  map: {
    id: number;
    name: string;
    mode: string;
  };
  userTeam: 'blue' | 'red';
  blueTeam: (number | null)[];
  redTeam: (number | null)[];
  banned: number[];
}

export interface ApiResponse {
  suggestedBrawlers: {
    id: number;
    name: string;
    reason: string;
  }[];
  counterPicks: {
    id: number;
    name: string;
    counters: number[];
  }[];
}

// This is a mock API function - in a real app this would call your backend
export const submitDraft = async (draftData: DraftData): Promise<ApiResponse> => {
  // For demo purposes, we'll simulate an API call with a timeout
  console.log('Submitting draft data:', draftData);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock response data
      const response: ApiResponse = {
        suggestedBrawlers: [
          { id: 35, name: 'Spike', reason: 'Strong against current meta in this map' },
          { id: 28, name: 'Tara', reason: 'Good synergy with your team composition' },
          { id: 19, name: 'Piper', reason: 'Excellent for long-range control on this map' }
        ],
        counterPicks: [
          { id: 30, name: 'Max', counters: [35, 19] },
          { id: 41, name: 'Gale', counters: [28, 35] }
        ]
      };
      
      toast.success('Draft analysis complete!');
      resolve(response);
    }, 1500);
  });
};
