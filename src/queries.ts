import { Request, Response } from 'express';
import { pool } from './db';
import { formatPostcode } from '../utils/formatPostcode';

export const getPostcode = (req: Request, res: Response) => { 
  try {
    // get the postcode from the request   
    let postcode = req.params.postcode;
    // call function to clean postcode      
    postcode = formatPostcode(postcode);
    
    // check to make sure it's valid based on the schema for postcode provided
      
    const regex = /^[A-Za-z][1-9] [1-9][A-Za-z]{2}$/;
      
    if (!regex.test(postcode)) {
      res.status(400).json({ error: 'Invalid postcode format' });
      return;
    }
    
    pool.query('SELECT * FROM hackney_address WHERE postcode = $1', [postcode], (err: Error, result: any) => {                
      if (err) {
        res.status(500).json({ error: 'Database error' });
        return;
      }    

      if (result.rows.length === 0) {
        res.status(404).json({ message: 'No matching records found.' });
        return;
      }
        
      // Return to array to reflect how addresses are prepared on the database for letters
      const data = result.rows.map((row: any) => row.line1 + ', ' + row.line2 + ' ' + row.line3);
            
      res.json({ data });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unexpected error' });
  }
};
