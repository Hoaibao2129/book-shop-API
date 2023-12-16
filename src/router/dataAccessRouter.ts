import DataAccessService from "../service/dataAccessService";
import express, { Request, Response } from 'express';


const router = express.Router();

router.get("/" , (req : Request , res: Response) =>{
    let dataAccessService = new DataAccessService();
    dataAccessService.getAllDataAccess(req , res);
})

export default router;