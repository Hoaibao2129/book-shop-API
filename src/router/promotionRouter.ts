import express, { Request, Response } from 'express';
import PromotionService  from '../service/promotionService';

const router = express.Router();

router.get("/" ,(req : Request , res : Response ) =>{
    let promotionService = new PromotionService();
    promotionService.getAllPromotion(req , res);
})

router.post("/" ,(req : Request , res : Response ) =>{
    let promotionService = new PromotionService();
    promotionService.insertPromotion(req , res);
})

router.put("/" ,(req : Request , res : Response ) =>{
    let promotionService = new PromotionService();
    promotionService.updatePromotion(req , res);
})

router.delete("/:id" ,(req : Request , res : Response ) =>{
    let promotionService = new PromotionService();
    promotionService.deletePromotion(req , res);
})


export default router;