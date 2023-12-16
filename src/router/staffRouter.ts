import express, { Request, Response } from 'express';
import StaffService  from '../service/staffSevice';

const router = express.Router();


router.post('/',(req: Request, res: Response) => {
    let staffService = new StaffService();
    staffService.insertStaff(req , res);
});

router.post("/login" , (req : Request , res : Response) =>{
    res.header('Access-Control-Allow-Origin', '*');
    let staffService = new StaffService();
    staffService.login(req , res);
})

router.get("/filter" ,(req: Request, res: Response) =>{
    let staffService = new StaffService();
    staffService.filterStaff(req , res);
})

router.get("/" , (req: Request, res: Response) =>{
    let staffService = new StaffService();
    staffService.getAllStaffs(req , res);
})

router.put("/" , (req: Request, res: Response) =>{
    let staffService = new StaffService();
    staffService.updateStaff(req , res);
})

router.delete("/" , (req: Request, res: Response) =>{
    let staffService = new StaffService();
    staffService.deleteStaff(req , res);
})  

router.get("/:id" , (req : Request , res : Response) =>{
    let staffService = new StaffService();
    staffService.getStaffById(req , res);
})





export default router;