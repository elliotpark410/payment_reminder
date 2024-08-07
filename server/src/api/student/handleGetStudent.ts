import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import { promisePool } from '../../db/connection';
import { RowDataPacket } from 'mysql2';

export async function handleGetStudent(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    const student_id: string = request.params.student_id;

    // Query to select a single student based on the provided ID
    const query = 'SELECT * FROM students WHERE deleted_at IS NULL AND id = ?';

    // Execute the query with the student ID as a parameter
    const [results] = await promisePool.execute<RowDataPacket[]>(query, [student_id]);

    // If a student is found, send it in the response
    if (results.length > 0) {
      response.send(results[0]);
    } else {
      // If no student is found with the provided ID, return a 404 response
      response.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
