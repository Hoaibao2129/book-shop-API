import express, { Request, Response } from 'express';
import InvoiceService  from '../service/invoiceService';

const router = express.Router();


router.post('/',(req: Request, res: Response) => {
    let invoiceService = new InvoiceService();
    invoiceService.inserInvoice(req , res);

});

router.get("/" , (req: Request, res: Response) =>{
    let invoiceService = new InvoiceService();
    invoiceService.getAllInvoice(req , res);
})

router.get("/invoiceDay" ,(req: Request, res: Response) =>{
    let invoiceService = new InvoiceService();
    invoiceService.getInvoiceToday(req , res);
})

router.delete("/invoiceDay" , (req: Request, res: Response) =>{
    let invoiceService = new InvoiceService();;
    invoiceService.deleteInvoiceDay(req , res);
})

router.get("/invoiceWasDelete" , (req: Request, res: Response) =>{
    let invoiceService = new InvoiceService();
    invoiceService.getAllInvoiceWasDelete(req , res);
})






export default router;
