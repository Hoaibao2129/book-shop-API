import { response } from 'express';
import StaffModel from '../models/staffsModel';
import RoleModel from '../models/roleModels';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


export default class StaffService {

    insertStaff(req , res){
        let data = req.body;
        StaffModel.find({tel : data.tel}).then(responseCheckStaff =>{
            if(responseCheckStaff.length > 0){
                res.status(200).json("Nhân viên đã tồn tại ở hệ thống");
            }else{
                RoleModel.find({roleName : data.roleName}).then(responseRole =>{
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                          console.error(err);
                        } else {
                          bcrypt.hash("abc123", salt, (err, hashedPassword) => {
                            if (err) {
                              console.error(err);
                            } else {
                              let dataInsert : any = new StaffModel({
                                name : data.name,
                                tel : data.tel ,
                                id_number : data.id_number,
                                roleName : data.roleName,
                                staffId : "NV" + data.tel,
                                password : hashedPassword,
                                dataAccess : data.dataAccess,
                                roleId : responseRole[0]._id,
                                token : null ,
                              })
                              dataInsert.save().then(response =>{
                                res.status(200).json(response)
                              })
                            }
                          });
                        }
                      });
                })
            }
        })
    }

    getAllStaffs(req ,res){
        StaffModel.find({}).then(response =>{
            res.status(200).json(response);
        })
    }

    updateStaff(req , res){
        let data = req.body;
        StaffModel.find({_id : data._id}).then(response =>{
            if(response.length == 1){
                let dataUpdate : any = response[0];
                dataUpdate.name = data.name,
                dataUpdate.tel = data.tel 
            StaffModel.updateOne({_id : data._id} , dataUpdate).then(response =>{
                if(response.acknowledged){
                    res.status(200).json("Cập nhật thành công thông tin nhân viên")
                }
            })
            }
        })
    }

    deleteStaff(req , res){
        let data = req.body ;
        StaffModel.deleteOne({_id : data._id}).then(response =>{
            if(response.acknowledged){
                res.status(200).json("Xoá thành công nhân viên")
            }
        })
    }

    getStaffById(req , res){
        let _id = req.params.id;
        StaffModel.find({_id : _id}).then(response =>{
            res.status(200).json(response);
        })
    }

    login(req , res){
        let data = req.body;
        StaffModel.find({tel : data.tel}).then(responseLogin =>{
            if(responseLogin.length == 1){
                let resutl = bcrypt.compareSync(data.password, responseLogin[0].password);
                if(resutl){
                    const secretKey = 'Hoai-bao';
                    const token = jwt.sign(data, secretKey);
                    let dataUpdate = responseLogin[0];
                    dataUpdate.token = token;
                 StaffModel.updateOne({tel : data.tel} , dataUpdate).then(responseUpdate =>{
                    if(responseUpdate.acknowledged){
                       StaffModel.find({tel : data.tel}).then( response =>{
                        res.status(200).json(response)
                       })
                    }
                })
                }else{
                    res.status(200).json("Số điện thoại hoặc mật khẩu không đúng")
                }
            }else{
                res.status(200).json("Số điện thoại không tồn tại")
            }
        })
    }

    filterStaff(req , res){
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
        StaffModel.aggregate(pipeList).then(response =>{
            res.status(200).json(response);
        })
    }
}