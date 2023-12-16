import express, { Request, Response } from 'express';
import ImportHistoryService from '../service/importHistoryService';

const router = express.Router();

router.get("/" , (req : Request , res : Response) =>{
    let importHistoryService = new ImportHistoryService();
    importHistoryService.getAllImportHistory(req , res);
})

export default router