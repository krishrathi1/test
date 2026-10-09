import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { getDatabase } from './database';

dotenv.config({ path: path.join(__dirname, '../.env.development') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// GET /api/tasks
app.get('/api/tasks', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const db = await getDatabase();
    const tasks = await db.all('SELECT * FROM tasks ORDER BY createdAt DESC');
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// POST /api/tasks
app.post('/api/tasks', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const id = 'task_' + Math.random().toString(36).substring(2, 9);
    const now = new Date().toISOString();
    const newTaskStatus = status || 'todo';
    const newTaskPriority = priority || 'medium';

    const db = await getDatabase();
    await db.run(
      `INSERT INTO tasks (id, title, description, status, priority, dueDate, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, description || '', newTaskStatus, newTaskPriority, dueDate || null, now, now]
    );

    const task = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

// PUT /api/tasks/:id
app.put('/api/tasks/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const db = await getDatabase();
    const existing = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const now = new Date().toISOString();
    const updatedTitle = title !== undefined ? title : existing.title;
    const updatedDesc = description !== undefined ? description : existing.description;
    const updatedStatus = status !== undefined ? status : existing.status;
    const updatedPriority = priority !== undefined ? priority : existing.priority;
    const updatedDueDate = dueDate !== undefined ? dueDate : existing.dueDate;

    await db.run(
      `UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, dueDate = ?, updatedAt = ? WHERE id = ?`,
      [updatedTitle, updatedDesc, updatedStatus, updatedPriority, updatedDueDate, now, id]
    );

    const updatedTask = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/tasks/:id
app.delete('/api/tasks/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const db = await getDatabase();
    const existing = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await db.run('DELETE FROM tasks WHERE id = ?', [id]);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
