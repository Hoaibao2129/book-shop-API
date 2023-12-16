import express, { Request, Response } from 'express';
import RoleService  from '../service/roleService';

const router = express.Router();


router.post('/',(req: Request, res: Response) => {
    let roleService = new RoleService();
    roleService.insertRole(req , res);
});

router.get("/roleList" , (req: Request, res: Response) =>{
    let roleService = new RoleService();
    roleService.getAllRole(req , res);
})

router.put("/" , (req: Request, res: Response) =>{
    let roleService = new RoleService();
    roleService.updateRole(req , res);
})

router.delete("/" , (req: Request, res: Response) =>{
    let roleService = new RoleService();
    roleService.deleteRole(req , res);
})

router.get("/:id" , (req: Request, res: Response) =>{
    let roleService = new RoleService();
    roleService.getRoleById(req , res);
})




export default router;