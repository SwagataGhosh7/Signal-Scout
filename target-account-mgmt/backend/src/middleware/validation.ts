import { Request, Response, NextFunction } from 'express';

export const validateTarget = (req: Request, res: Response, next: NextFunction) => {
  const { company_name, domain, industry, priority, owner, status, icp_context } = req.body;

  if (!company_name || typeof company_name !== 'string' || company_name.trim().length === 0) {
    return res.status(400).json({ error: 'Company name is required' });
  }

  if (!domain || typeof domain !== 'string' || domain.trim().length === 0) {
    return res.status(400).json({ error: 'Domain is required' });
  }

  if (!industry || typeof industry !== 'string' || industry.trim().length === 0) {
    return res.status(400).json({ error: 'Industry is required' });
  }

  if (!['High', 'Medium', 'Low'].includes(priority)) {
    return res.status(400).json({ error: 'Priority must be High, Medium, or Low' });
  }

  if (!['Self', 'Team'].includes(owner)) {
    return res.status(400).json({ error: 'Owner must be Self or Team' });
  }

  if (!['Active Scanning', 'Paused'].includes(status)) {
    return res.status(400).json({ error: 'Status must be Active Scanning or Paused' });
  }

  if (!icp_context || typeof icp_context !== 'string' || icp_context.trim().length === 0) {
    return res.status(400).json({ error: 'ICP context is required' });
  }

  next();
};
