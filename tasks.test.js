const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./app'); // Your Express app
const Task = require('./Models/taskModel');

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  await Task.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('operations for Tasks', () => {
  test('Create a task', async () => {
    const response = await request(app)
      .post('/api/v1/tasks')
      .send({ title: 'Task 1', description: 'Description for Task 1', status : "inProgress", dueDate : "25-nov-2023" });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('task created successfully');
  });

  test('Read all tasks', async () => {
    await Task.create({ title: 'Task 1', description: 'Description for Task 1' });
    await Task.create({ title: 'Task 2', description: 'Description for Task 2' });

    const response = await request(app).get('/api/v1/tasks');

    expect(response.statusCode).toBe(200);
    expect(response.body.tasks.length).toBe(2);
  });

  test('Get paginated, sorted, and filtered tasks', async () => {
    // Create sample tasks for testing
    await Task.create({ title: 'Task 1', description: 'Description for Task 1' });
    await Task.create({ title: 'Task 2', description: 'Description for Task 2' });
    await Task.create({ title: 'Example Task', description: 'Description for Example Task' });

    const response = await request(app)
      .get('/api/v1/tasks')
      .query({ page: 1, limit: 2, sort: 'title', title : "Example Task" });

      console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.tasks.length).toBe(1);
    expect(response.body.tasks[0].title).toBe('Example Task');
  });

  test('Update a task', async () => {
    const task = await Task.create({ title: 'Task 1', description: 'Description for Task 1' });

    const response = await request(app)
      .put(`/api/v1/tasks/${task._id}`)
      .send({ title: 'Updated Task', description: 'Updated description' });

    expect(response.statusCode).toBe(401);
  });

  test('Delete a task', async () => {
    const task = await Task.create({ title: 'Task 1', description: 'Description for Task 1' });

    const response = await request(app).delete(`/api/v1/tasks/${task._id}`);

    expect(response.statusCode).toBe(401);
  });
});
