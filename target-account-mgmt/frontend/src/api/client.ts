import axios, { AxiosInstance } from 'axios';

export interface Target {
  id: string;
  company_name: string;
  domain: string;
  industry: string;
  priority: 'High' | 'Medium' | 'Low';
  owner: 'Self' | 'Team';
  status: 'Active Scanning' | 'Paused';
  icp_context: string;
  ai_intent_level: number;
  calculated_risk: number;
  last_harvested: string | null;
  actions_queue: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTargetDTO {
  company_name: string;
  domain: string;
  industry: string;
  priority: 'High' | 'Medium' | 'Low';
  owner: 'Self' | 'Team';
  status: 'Active Scanning' | 'Paused';
  icp_context: string;
}

class TargetAccountAPI {
  private client: AxiosInstance;

  constructor() {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    this.client = axios.create({
      baseURL: apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getTargets(): Promise<Target[]> {
    try {
      const response = await this.client.get<Target[]>('/api/targets');
      return response.data;
    } catch (error) {
      console.error('Error fetching targets:', error);
      throw error;
    }
  }

  async getTarget(id: string): Promise<Target> {
    try {
      const response = await this.client.get<Target>(`/api/targets/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching target:', error);
      throw error;
    }
  }

  async createTarget(target: CreateTargetDTO): Promise<Target> {
    try {
      const response = await this.client.post<Target>('/api/targets', target);
      return response.data;
    } catch (error) {
      console.error('Error creating target:', error);
      throw error;
    }
  }

  async updateTarget(id: string, updates: Partial<Target>): Promise<Target> {
    try {
      const response = await this.client.put<Target>(`/api/targets/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating target:', error);
      throw error;
    }
  }

  async deleteTarget(id: string): Promise<void> {
    try {
      await this.client.delete(`/api/targets/${id}`);
    } catch (error) {
      console.error('Error deleting target:', error);
      throw error;
    }
  }

  async harvestSignals(id: string): Promise<Target> {
    try {
      const response = await this.client.post<{ message: string; target: Target }>(
        `/api/targets/${id}/harvest`
      );
      return response.data.target;
    } catch (error) {
      console.error('Error harvesting signals:', error);
      throw error;
    }
  }
}

export const api = new TargetAccountAPI();
