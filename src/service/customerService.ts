import { resolveSoa } from "dns";
import CustomerModel from "../models/customerModel";

export default class CustomerService {

    insertCustomer(req , res){
        let data = req.body;
        CustomerModel.find({tel : data.tel}).then(responeCustomer =>{
            if(responeCustomer.length === 0){
                const newCustomer = new CustomerModel({
                    name : data.name,
                    addreess : data.address,
                    birthday : data.birthday,
                    tel : data.tel,
                    totalPayment : 0,
                })
                newCustomer.save().then(response =>{
                    res.status(200).json(response);
                })
            }else{
                res.status(200).json("Số điện thoại đã tồn tại")
            }
        })

    }

    getAllCustomer(req , res){
        CustomerModel.find({}).then(response =>{
            res.status(200).json(response);
        })
    }

    getCustomerByTel(req , res){
        let tel = req.params.tel;
        CustomerModel.find({tel : tel }).then(response =>{
            res.status(200).json(response)
        })
    }

    updateCustomer(req , res){
        let data = req.body ;
        CustomerModel.find({_id : data._id}).then(response =>{
            if(response.length === 1){
                let dataUpdate = response[0];
                dataUpdate.name  = data.name,
                dataUpdate.birthday = data.birthday,
                dataUpdate.addreess = data.addreess,
                dataUpdate.tel = data.tel,
             CustomerModel.updateOne({_id : data._id} , dataUpdate).then(responseUpdate =>{
                if(responseUpdate.acknowledged){
                    res.status(200).json("Cập nhật thành công thông tin khách hàng")
                }
             })
            }
        })
    }

    deleteCustomer(req , res){
        let _id = req.body._id;
        CustomerModel.deleteOne({_id : _id}).then(response =>{
            res.status(200).json("Xoá thành công khách hàng")
        })
    }

    getTopCustomer(req , res){
        CustomerModel.find({}).then(response =>{
            let dataCustomer = response;
            dataCustomer.sort(function(a , b) {return  b.totalPayment - a.totalPayment})
            if(dataCustomer.length <= 5){
                res.status(200).json(dataCustomer);
            }else{
                let dataCustomerTop : any = [];
                dataCustomerTop = dataCustomer.slice(0 , 5);
                res.status(200).json(dataCustomer);
            }
        })
    }


}