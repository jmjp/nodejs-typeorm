import { Request,response,Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
export class CreateUserController{
    async handle(request: Request, response: Response){
        const { id, name, email} = request.body;
        const service = new CreateUserService();
        const result = await service.execute({id, name,email});
        if(result instanceof Error){
            return response.status(400).json({error: result.message});
        }
        return response.json(result);
    }
}