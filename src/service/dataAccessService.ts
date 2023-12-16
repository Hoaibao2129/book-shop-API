import { response } from "express";
import DataAccessModel from "../models/dataAccessModel";


export default class DataAccessService {
    
    getAllDataAccess(req , res){
        DataAccessModel.find({}).then(response =>{
            res.status(200).json(response)
        })
    }
}