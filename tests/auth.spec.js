// test/auth.test.js

const request = (await import('supertest')).default;
const app = (await import('../index')).default;

describe('Auth Endpoints', () => {
  describe('POST /auth/register', () => {
    it('should register user successfully with default organisation', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          phone: '1234567890'
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data.user.firstName).toBe('John');
      expect(res.body.data.user.lastName).toBe('Doe');
      expect(res.body.data.user.email).toBe('john.doe@example.com');
      expect(res.body.data.accessToken).toBeDefined();
      expect(res.body.data.organisation.name).toBe("John's Organisation");
    });

    it('should fail if required fields are missing', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          phone: '1234567890'
        });

      expect(res.status).toBe(422);
      expect(Array.isArray(res.body.errors)).toBe(true);
      expect(res.body.errors[0].field).toBe('firstName');
    });

    it('should fail if there’s duplicate email or userId', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          phone: '1234567890'
        });

      const res = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: 'password123',
          phone: '0987654321'
        });

      expect(res.status).toBe(422);
      expect(Array.isArray(res.body.errors)).toBe(true);
      expect(res.body.errors[0].field).toBe('email');
    });
  });

  describe('POST /auth/login', () => {
    it('should log the user in successfully', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
          password: 'password123',
          phone: '0987654321'
        });

      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'jane.doe@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.user.email).toBe('jane.doe@example.com');
      expect(res.body.data.accessToken).toBeDefined();
    });

    it('should fail if invalid credentials are provided', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'non.existent@example.com',
          password: 'wrongpassword'
        });

      expect(res.status).toBe(401);
      expect(res.body.status).toBe('Bad request');
      expect(res.body.message).toBe('Authentication failed');
    });
  });
});

// Jest runs tests automatically, no need for `run()` function
