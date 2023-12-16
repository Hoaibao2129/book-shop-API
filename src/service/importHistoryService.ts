import ImportHistoryModel from "../models/importHistoryModel";

export default class ImportHistoryService {
    
    getAllImportHistory(req , res){
        ImportHistoryModel.find({}).then(response =>{
            res.status(200).json(response);
        })
    }
}