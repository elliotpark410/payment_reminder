import { NextFunction, Request, Response } from "express";
import connection from "../../db/connection";

export async function handleGetInactiveStudents(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = `
    SELECT id, student_name, inactive FROM students WHERE inactive = true AND deleted_at IS NULL`;

    // Execute the query
    connection.query(query, (error, results) => {
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
