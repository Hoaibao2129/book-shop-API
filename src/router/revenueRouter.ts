import RevenueService from "../service/revenueService";
import express, { Request, Response } from 'express';


const router = express.Router();

router.get("/revenueDay" ,(req : Request , res : Response) =>{
    let revenueService = new RevenueService();
    revenueService.getRevenueDay(req , res);

})

router.get("/revenueMonth" ,(req : Request , res : Response) =>{
    let revenueService = new RevenueService();
    revenueService.getRevenueMonth(req , res);

})

router.get("/filterDate",(req : Request , res : Response) =>{
    let revenueService = new RevenueService();
    revenueService.getRevenueFilterDate(req , res);
})

router.get("/revenueCustomers",(req : Request , res : Response) =>{
    let revenueService = new RevenueService();
    revenueService.getRevenueCustomer(req , res);
})

router.get("/revenueBooks",(req : Request , res : Response) =>{
    let revenueService = new RevenueService();
    revenueService.getRenevueBook(req , res);
})

export default router