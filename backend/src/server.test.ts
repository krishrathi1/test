import request from 'supertest';
import app from './server';

describe('Tasks API', () => {
  let createdTaskId: string;

  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('status', 'healthy');
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Integration Test Task',
        description: 'Testing API endpoints',
        priority: 'high'
      });
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual('Integration Test Task');
    createdTaskId = res.body.id;
  });

  it('should retrieve all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update an existing task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${createdTaskId}`)
      .send({ status: 'completed' });
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('completed');
  });

  it('should delete a task', async () => {
    const res = await request(app).delete(`/api/tasks/${createdTaskId}`);
    expect(res.status).toEqual(204);
  });
});
