import { v4 as uuidv4 } from 'uuid';

export interface Target {
  id: string;
  company_name: string;
  domain: string;
  industry: string;
  priority: 'High' | 'Medium' | 'Low';
  owner: 'Self' | 'Team';
  status: 'Active Scanning' | 'Paused';
  icp_context: string;
  ai_intent_level: number; // 0-100
  calculated_risk: number; // 0-100
  last_harvested: Date | null;
  actions_queue: number;
  created_at: Date;
  updated_at: Date;
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

export const createTargetFromDTO = (dto: CreateTargetDTO): Target => {
  const now = new Date();
  return {
    id: uuidv4(),
    company_name: dto.company_name,
    domain: dto.domain,
    industry: dto.industry,
    priority: dto.priority,
    owner: dto.owner,
    status: dto.status,
    icp_context: dto.icp_context,
    ai_intent_level: Math.floor(Math.random() * 100),
    calculated_risk: Math.floor(Math.random() * 100),
    last_harvested: null,
    actions_queue: 0,
    created_at: now,
    updated_at: now,
  };
};
