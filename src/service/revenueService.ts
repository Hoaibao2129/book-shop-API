const moment = require('moment');
import BookModel from "../models/booksModel";
import CustomerModel from "../models/customerModel";
import InvoiceModel from "../models/invoiceModels";

export default class RevenueService {

    getRevenueDay(req , res){
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
                $match:{
                    delete : false
                }
            }
        )
        console.log("pipeList " + JSON.stringify(pipeList));
        InvoiceModel.aggregate(pipeList).then(response =>{
            let revenue : number = 0;
            response.map(val =>{
                revenue += val.totalPrice
            })
            res.status(200).json(revenue);
        })
    }

    getRevenueMonth(req , res){
        let today = moment(); 
        let fromDate = today.clone().startOf('month').utc().toDate();
        let toDate = today.clone().endOf('month').utc().toDate();
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
                $match:{
                    delete : false
                }
            }
        )
        console.log("pipeList " + JSON.stringify(pipeList));
        InvoiceModel.aggregate(pipeList).then(response =>{
            let revenue : number = 0;
            response.map(val =>{
                revenue += val.totalPrice
            })
            res.status(200).json(revenue);
        })
    }

    getRevenueFilterDate(req , res){
        let data = req.query;
        const fromDate = moment(data.fromDate, "DD-MM-YYYY").utc();
        const toDate = moment(data.toDate, "DD-MM-YYYY").utc();
        const modifiedFromDate = fromDate.add(1, 'day').startOf('day').toDate(); 
        const modifiedToDate = toDate.add(1, 'day').endOf('day').toDate(); 
        let pipeList: Array<any> = [];
        pipeList.push(
            {
              $match: {
                createdAt: {
                    $gte: modifiedFromDate,
                    $lt: modifiedToDate
                  }
              }
            },
            {
                $match:{
                    delete : false
                }
            }
        )
        console.log("pipeList " + JSON.stringify(pipeList));
        InvoiceModel.aggregate(pipeList).then(response =>{
            let revenue : number = 0;
            let totalQuantityBook : number = 0 ;
            response.map(val =>{
                revenue += val.totalPrice
                totalQuantityBook += val.totalQuantityBook
            })
            let dataResponse = {
                revenue : revenue ,
                totalQuantityBook : totalQuantityBook
            }
            res.status(200).json(dataResponse);
        }).catch(err =>{
            res.status(500).json("500 Internal Server Error")
        })
    }

    getRenevueBook(req , res){
        BookModel.find({}).then(response =>{
            let revenueBooks : number = 0;
            response.map(val =>{
                revenueBooks += Number(val.quantity);
            })
            res.status(200).json(revenueBooks);
        }).catch(err =>{
            res.status(500).json("500 Internal Server Error")
        })
    }

    getRevenueCustomer(req , res){
        CustomerModel.find({}).then(response =>{
            let revenueCustomer = response.length;
            res.status(200).json(revenueCustomer);
        }).catch(err =>{
            res.status(500).json("500 Internal Server Error")
        })
    }



}