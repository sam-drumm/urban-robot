import { Request, Response } from 'express';
import { pool } from '../src/db';
import { getPostcode } from '../src/queries';

jest.mock('../src/db', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('getPostcode', () => {
  it('responds with a 500 status and error message if a generic database error occurs', async () => {
    (pool.query as jest.Mock).mockImplementation((query, params, callback) => {
      callback(new Error('Database error'), null);
    });

    const req = { params: { postcode: 'E97HA' } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    await getPostcode(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Database error' });
  });
  it('responds with a 500 status and error message if unexpected error occurs', async () => {
    (pool.query as jest.Mock).mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const req = { params: { postcode: 'E97HA' } } as unknown as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response;

    await getPostcode(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unexpected error' });
  });
  
});