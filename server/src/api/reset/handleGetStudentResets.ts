import { NextFunction, Request, Response } from "express";
import connection from "../../db/connection";

export async function handleGetStudentResets(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Extract student ID from request parameters
    const student_id: string = request.params.student_id;

    const selectQuery = `
    SELECT resets.*, students.student_name
    FROM resets
    INNER JOIN students ON resets.student_id = students.id
    WHERE resets.student_id = ?
  `;

    // Execute the query
    connection.query(selectQuery, [student_id], (error, results) => {
      if (error) {
        // If there's an error, pass it to the error handling middleware
        return next(error);
      }

      // If successful, send the students data in the response
      response.send(results);
    });
  } catch (err) {
    console.log(err)
    next(err);
  }
}
