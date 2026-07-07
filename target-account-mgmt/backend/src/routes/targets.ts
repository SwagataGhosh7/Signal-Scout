import express, { Router, Request, Response } from 'express';
import { pool } from '../server';
import { Target, CreateTargetDTO, createTargetFromDTO } from '../models/Target';
import { validateTarget } from '../middleware/validation';

const router: Router = express.Router();

// GET all targets
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM targets ORDER BY created_at DESC'
    );
    const targets: Target[] = result.rows.map((row: any) => ({
      ...row,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
      last_harvested: row.last_harvested ? new Date(row.last_harvested) : null,
    }));
    res.json(targets);
  } catch (error) {
    console.error('Error fetching targets:', error);
    res.status(500).json({ error: 'Failed to fetch targets' });
  }
});

// GET single target by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM targets WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Target not found' });
    }

    const target: Target = {
      ...result.rows[0],
      created_at: new Date(result.rows[0].created_at),
      updated_at: new Date(result.rows[0].updated_at),
      last_harvested: result.rows[0].last_harvested
        ? new Date(result.rows[0].last_harvested)
        : null,
    };

    res.json(target);
  } catch (error) {
    console.error('Error fetching target:', error);
    res.status(500).json({ error: 'Failed to fetch target' });
  }
});

// POST create new target
router.post('/', validateTarget, async (req: Request, res: Response) => {
  try {
    const dto: CreateTargetDTO = req.body;
    const target = createTargetFromDTO(dto);

    const result = await pool.query(
      `INSERT INTO targets 
        (id, company_name, domain, industry, priority, owner, status, icp_context, 
         ai_intent_level, calculated_risk, last_harvested, actions_queue, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        target.id,
        target.company_name,
        target.domain,
        target.industry,
        target.priority,
        target.owner,
        target.status,
        target.icp_context,
        target.ai_intent_level,
        target.calculated_risk,
        target.last_harvested,
        target.actions_queue,
        target.created_at,
        target.updated_at,
      ]
    );

    const savedTarget: Target = {
      ...result.rows[0],
      created_at: new Date(result.rows[0].created_at),
      updated_at: new Date(result.rows[0].updated_at),
      last_harvested: result.rows[0].last_harvested
        ? new Date(result.rows[0].last_harvested)
        : null,
    };

    res.status(201).json(savedTarget);
  } catch (error) {
    console.error('Error creating target:', error);
    res.status(500).json({ error: 'Failed to create target' });
  }
});

// PUT update target
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { priority, status, icp_context, ai_intent_level, calculated_risk } = req.body;

    const result = await pool.query(
      `UPDATE targets 
       SET priority = COALESCE($1, priority),
           status = COALESCE($2, status),
           icp_context = COALESCE($3, icp_context),
           ai_intent_level = COALESCE($4, ai_intent_level),
           calculated_risk = COALESCE($5, calculated_risk),
           updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [priority, status, icp_context, ai_intent_level, calculated_risk, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Target not found' });
    }

    const updatedTarget: Target = {
      ...result.rows[0],
      created_at: new Date(result.rows[0].created_at),
      updated_at: new Date(result.rows[0].updated_at),
      last_harvested: result.rows[0].last_harvested
        ? new Date(result.rows[0].last_harvested)
        : null,
    };

    res.json(updatedTarget);
  } catch (error) {
    console.error('Error updating target:', error);
    res.status(500).json({ error: 'Failed to update target' });
  }
});

// DELETE target
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM targets WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Target not found' });
    }

    res.json({ message: 'Target deleted successfully', id });
  } catch (error) {
    console.error('Error deleting target:', error);
    res.status(500).json({ error: 'Failed to delete target' });
  }
});

// POST harvest signals for a target
router.post('/:id/harvest', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `UPDATE targets 
       SET last_harvested = NOW(), actions_queue = actions_queue + 1
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Target not found' });
    }

    const updatedTarget: Target = {
      ...result.rows[0],
      created_at: new Date(result.rows[0].created_at),
      updated_at: new Date(result.rows[0].updated_at),
      last_harvested: result.rows[0].last_harvested
        ? new Date(result.rows[0].last_harvested)
        : null,
    };

    res.json({ message: 'Harvest signals initiated', target: updatedTarget });
  } catch (error) {
    console.error('Error harvesting signals:', error);
    res.status(500).json({ error: 'Failed to harvest signals' });
  }
});

export default router;
