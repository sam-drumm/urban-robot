import request from 'supertest';

import app from '../src/index';


const whitespacePostcodes = [
  'e97ha',
  ' E97HA ',
  ' e97ha ',
  ' e 97ha ',
  ' e97 ha ',
  ' e9 7 h a ',
];

const invalidPostcodes = [
  '123456',  
  'AB', 
  'A B 9AA', 
  'AB9 9', 
  'A!99 9A', 
  'AB99C 9AA',
  'AB9Z 9AA',
  'AB99 9A A',
  'AaB$;9AA',
];

const specialPostcodes = [
  'EC1A 1BB', // Central London
  'W1A 0AX', // BBC  
  'B33 8TH', // Birmingham
  'CR2 6XH', // Croydon
  'DN55 1PT', // British Telecoms
  'GIR 0AA', // Used for Girobank
  'SAN TA1', // Christmas  
];

describe('GET /postcode/:postcode', () => {

  it('responds with json with postcode matching the db', async () => {
    const response = await request(app)
      .get('/postcode/E97HA')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.data).toEqual(expect.arrayContaining([expect.any(String)]));
      
  });

  it('responds with 400 for invalid postcode format', async () => {
    try {
      const response = await request(app)
        .get('/postcode/fdlkas')
        .expect(400);
    } catch (error) {      
      console.error(error);
      throw error;
    }
  });

  it('responds with 404 for correct format but no matching records', async () => {
    try {
      const response = await request(app)
        .get('/postcode/E96HA')
        .expect(404);
      expect(response.body.message).toEqual('No matching records found.');
    } catch (error) {      
      console.error(error);
      throw error;
    }
  });

  test.each(invalidPostcodes)('responds with 400 for invalid postcode format', async (postcode) => {
    try {
      const response = await request(app)
        .get(`/postcode/${postcode}`)
        .expect(400);
      expect(response.body.error).toEqual('Invalid postcode format');
    } catch (error) {      
      console.error(error);
      throw error;
    }
  });

  test.each(specialPostcodes)('responds correctly for correct case postcode but not in borough', async (postcode) => {
    try {
      const response = await request(app)
        .get(`/postcode/${postcode}`)
        .expect(400);
    } catch (error) {      
      console.error(error);
      throw error;
    }  
  });

  test.each(whitespacePostcodes)('should not error if matching postcode with whitespace in it', async (postcode) => {
    try {
      const response = await request(app)
        .get(`/postcode/${postcode}`)
        .expect(200);
      expect(response.body.data).toEqual(expect.arrayContaining([expect.any(String)]));
    } catch (error) {
      
      console.error(error);
      throw error;
    }
  });
  
  describe('Test the root path response if running', () => {
    test('It should response the GET method', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: 'API Running' });
    });
  });
  
  
});

