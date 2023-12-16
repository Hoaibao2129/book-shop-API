import InvoiceModel from "../models/invoiceModels";
import BookModel from "../models/booksModel";
import CustomerModel from "../models/customerModel";
import StaffModel from "../models/staffsModel";
const moment = require('moment');

export default class InvoiceService {

    inserInvoice(req , res){
        let dataInvoice = req.body;
        BookModel.find({}).then(responseBook =>{
            let dataBook = responseBook;
            let checkWareHouse : boolean = true;
            dataInvoice.infoPayment.map(valPayment =>{
                dataBook.map(valBook =>{
                    if(valBook._id == valPayment.bookId){
                        if(Number(valBook.quantity) < valPayment.quantity){
                            return checkWareHouse = false;
                        }
                    }
                })
            })
            if(checkWareHouse){
                this.updateWareHouse(dataInvoice.infoPayment);
                let totalPrice : number = 0;
                let totalQuantityBook : number = 0;
                dataInvoice.infoPayment.map(valInfoPayment =>{
                    totalPrice += Number(valInfoPayment.bookPrice);
                    totalQuantityBook += Number(valInfoPayment.quantity);
                })
                CustomerModel.find({tel : dataInvoice.numberPhone}).then(responseCustomer =>{
                    let dataCustomerUpdate = responseCustomer[0];
                    if(dataInvoice.use){
                        dataCustomerUpdate.totalPayment = 0;
                        totalPrice = totalPrice- ( totalPrice * (dataInvoice.discount / 100));      
                    } 
                    if(dataInvoice.numberPhone){
                        dataCustomerUpdate.totalPayment = Number(dataCustomerUpdate.totalPayment) + Number(totalPrice);
                        CustomerModel.updateOne({tel : dataInvoice.numberPhone} , dataCustomerUpdate).then(ressponseUpdataCustomer =>{})
                    }
                    
                    let dataInsertInvoice = new InvoiceModel({
                        infoPayment : dataInvoice.infoPayment,
                        customerName : dataInvoice.customerName ? dataInvoice.customerName : null ,
                        customerID : dataInvoice.customerID ? dataInvoice.customerID : null ,
                        numberPhone : dataInvoice.numberPhone ? dataInvoice.numberPhone : null, 
                        totalPrice : totalPrice,
                        totalQuantityBook : totalQuantityBook,
                        discount : dataInvoice.discount ? dataInvoice.discount : 0,
                        delete : false
                    })
                    dataInsertInvoice.save().then(response =>{
                        res.status(200).json(response);
                    })

                })
                
            }else{
                res.status(200).json("Số lượng sách ở kho không đủ")
            }

        })
    }

    getAllInvoice(req , res){
        InvoiceModel.find({delete : false}).then(respose =>{
            res.status(200).json(respose);
        })
    }

    getInvoiceToday(req , res){
        let today = moment(); 
        let fromDate = today.clone().startOf('day').utc().toDate();
        let toDate = today.clone().endOf('day').utc().toDate();
        let pipeList: Array<any> = [];
        pipeList.push(
            {
              $match: {
                createdAt: {
                    $gte: fromDate,
                    $lt: toDate
                  }
              }
            },
            {
                $match :{
                    delete : false
                }
            }

        )
        console.log("pipeList " + JSON.stringify(pipeList));
        InvoiceModel.aggregate(pipeList).then(response =>{
            res.status(200).json(response);
        })

    }

    deleteInvoiceDay(req , res){
        let data = req.body ;
        StaffModel.find({_id : data.staffId}).then(response =>{
            let infoDeleteArr: any = [];
            let infoDelete = {
                name : response[0].name,
                note : data.note,
            }
            infoDeleteArr.push(infoDelete);
         InvoiceModel.find({_id : data._id}).then(responseInvoice =>{
            let dataUpdate = responseInvoice[0];
            dataUpdate.infoPayment.map((val: any) =>{
              BookModel.find({_id : val.bookId}).then(responseBook =>{
                let dataBookUpdate = responseBook[0];
                let quantity = Number(dataBookUpdate.quantity) + Number(val.quantity);
                dataBookUpdate.quantity = String(quantity);
                BookModel.updateOne({_id : val.bookId} , dataBookUpdate).then(()=>{});
              })  
            })
            dataUpdate.delete = true,
            dataUpdate.infoDelete = infoDeleteArr;
            InvoiceModel.updateOne({_id : data._id} , dataUpdate).then(response =>{
                res.status(200).json("Xoá thành công đơn hàng")
            })
         })
        })
    }

    getAllInvoiceWasDelete(req , res){
        InvoiceModel.find({delete : true}).then(response =>{
            res.status(200).json(response)
        })
    }

    private updateWareHouse(infoPayment){
        infoPayment.map(val =>{
            BookModel.find({_id : val.bookId}).then(response => {
                let dataUpdate = response[0];
                let quantity : any = Number(dataUpdate.quantity) - Number(val.quantity);
                dataUpdate.quantity = quantity;
                BookModel.updateOne({_id : val.bookId} , dataUpdate).then(()=>{})
            })
        })
    }

}