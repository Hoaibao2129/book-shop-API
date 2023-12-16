import CustomerService from "../service/customerService";
import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/',(req: Request, res: Response) => {
    let customerService = new CustomerService(); 
    customerService.insertCustomer(req , res); 
});

router.get("/",(req: Request, res: Response) => {
    let customerService = new CustomerService(); 
    customerService.getAllCustomer(req , res); 
}); 

router.get("/topCustomer" ,(req: Request, res: Response) => {
    let customerService = new CustomerService(); 
    customerService.getTopCustomer(req , res); 
}); 

router.get("/:tel",(req: Request, res: Response) => {
    let customerService = new CustomerService(); 
    customerService.getCustomerByTel(req , res); 
}); 

router.put("/" ,(req: Request, res: Response) => {
    let customerService = new CustomerService(); 
    customerService.updateCustomer(req , res); 
}); 

router.delete("/",(req: Request, res: Response) => {
    let customerService = new CustomerService(); 
    customerService.deleteCustomer(req , res); 
}); 

export default router;
