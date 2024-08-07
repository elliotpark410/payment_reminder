import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/apiAuth';
import { promisePool } from '../../db/connection';

export async function handleDeletePayment(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction,
) {
  try {
    // Extract payment ID from request parameters
    const payment_id: string = request.params.payment_id;

    // Query to hard delete
    const query = 'DELETE FROM payments WHERE id = ?';

    // Execute the delete query with payment ID as parameter
    const [deleteResults] = await promisePool.execute(query, [payment_id]);

    // Check if the delete query affected any rows
    const deleteResultsJson: any = deleteResults;
    if (deleteResultsJson.affectedRows === 0) {
      // If no rows were affected, it means the payment with the provided ID was not found
      return response.status(404).json({ message: 'Payment not found or already deleted' });
    }

    // If the delete was successful, send a success response
    response.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
