import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { fail } from "../utils/envelope";

export function errorHandler(err:unknown,req:Request,res:Response,next:NextFunction) {
  if (err instanceof AppError) {
   return res.status(err.statusCode).json(fail(err.message,"App_Error"))
  } 
  
  console.log("Error",err);
 return res.status(500).json(fail("Internal server error", "INTERNAL"));  
}