import PromotionModel from "../models/promotionModel";


export default class PromotionService {

    insertPromotion(req , res){
        let data = req.body;
        const newPromotion =  new PromotionModel({
            totalPayment : data.totalPayment, 
            discount : data.discount,
        })
        newPromotion.save().then(response =>{
            res.status(200).json(response);
        })
    }

    getAllPromotion(req , res){
        PromotionModel.find({}).then(response =>{
            response.sort(function(a , b) {return a.discount - b.discount});
            res.status(200).json(response)
        })
    }

    updatePromotion(req , res){
        let data = req.body;
        PromotionModel.find({_id : data._id}).then(response =>{
            if(response.length == 1) {
                let dataUpdate = response[0];
                dataUpdate.totalPayment = data.totalPayment;
                dataUpdate.discount = data.discount;
              PromotionModel.updateOne({_id : data._id} , dataUpdate).then(responseUpdate =>{
                if(responseUpdate.acknowledged){
                    res.status(200).json("Cập nhật thành công thông tin khuyến mãi")
                }
              })
            }
        })
    }

    deletePromotion(req , res){
        let _id = req.params.id;
        PromotionModel.deleteOne({_id : _id}).then(response =>{
            if(response.acknowledged){
                res.status(200).json("Xoá thành công khuyến mãi")
            }
        })
    }
}