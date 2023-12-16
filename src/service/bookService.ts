import BookModel from '../models/booksModel';
import ImportHistoryModel from '../models/importHistoryModel';
import QRCode from 'qrcode'


export default class BookService {

    insertBook(req , res) {
        let data  = req.body;
        const newBook : any = new BookModel({
            name : data.name,
            author : data.author,
            price : data.price,
            quantity : data.quantity,
            qr : ""
        });
        newBook.save().then(response =>{
           let dataUpdate : any = response;
           QRCode.toDataURL(String(dataUpdate._id).slice(0 , 24)).then( url => {
            dataUpdate.qr = url;
            BookModel.updateOne({_id : dataUpdate._id} , dataUpdate).then(responseUpdate =>{
                if(responseUpdate.acknowledged){
                    res.status(200).json(dataUpdate);
                }
            })
           })  
        })
    }

    getAllBook(req , res){
        BookModel.find({}).then(response =>{
            res.status(200).json(response)
        })
    }

    getBookById(req , res){
        let _id =  req.params.id
        BookModel.find({_id : _id}).then(response =>{
            res.status(200).json(response);
        })
    }

    updateBooks(req, res){
        let data  = req.body;
        BookModel.find({_id : data._id}).then(response =>{
            if(response.length == 1){
               let dataUpdate = {
                name : data.name,
                author : data.author,
                quantity : data.quantity,
                price : data.price,
               }
            BookModel.updateOne({_id : data._id} , dataUpdate).then(response =>{
                if(response.acknowledged){
                    res.status(200).json("Cập nhật thành công thông tin sách")
                }
            })
            }
        })
    }

    deleteBooks(req , res){
        let _id = req.params.id;
        BookModel.deleteOne({_id : _id}).then(response =>{
            if(response.acknowledged){
                res.status(200).json("Xoá thành công thông tin sách")
            }
        })
    }

    importBook(req , res){
        let data = req.body;
        BookModel.find({_id : data.id}).then(response =>{
            if(response.length > 0){
                let dataUpdate = response[0];
                let quantityUpdate = Number(dataUpdate.quantity) + Number(data.quantity);
                dataUpdate.quantity  = String(quantityUpdate);
                BookModel.updateOne({_id : data.id} , dataUpdate).then(responseUpdate =>{
                    if(responseUpdate.acknowledged){
                        let dataImportHistory = new ImportHistoryModel({
                            bookName : dataUpdate.name,
                            quantity : data.quantity,
                        })
                        dataImportHistory.save().then(responseImportHistory =>{
                            res.status(200).json("Nhập sách thành công")
                        })
                    }
                })
            }
        })
    }

    filterBook(req , res){
        let data = req.query.name;
        let pipeList: Array<any> = [];
        pipeList.push(
            {
              $match: {
                "$or": [
                  { "name": { '$regex': data, '$options': 'i' } },
                ]
              }
            }
        )

        console.log("pipeList " + JSON.stringify(pipeList));
        BookModel.aggregate(pipeList).then(response =>{
            res.status(200).json(response);
        })
    }
}