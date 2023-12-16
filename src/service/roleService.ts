import RoleModel from '../models/roleModels';
import router from '../router/roleRouter';

export default class RoleService {

    insertRole(req , res){
        console.log(req.body);
        let data = req.body ;
        const dataInser : any = new RoleModel({
            roleName : data.roleName,
            dataAccess : data.dataAccess,
        })
        dataInser.save().then(response =>{
            res.status(200).json(response)
        })
    }

    getAllRole(req, res) {
        let pipeList: Array<any> = [];
        pipeList.push(
            {
                $addFields: { "idStr": { $toString: "$_id" } }
            },
            {
                "$lookup": {
                    "from": "staffs",
                    "localField": "idStr",
                    "foreignField": "roleId",
                    "as": "staffs"
                }
            },
            {
                $project:
                {
                    _id: 1,
                    roleName: 1,
                    staffCount: { $ifNull: [{ $size: "$staffs" }, 0] }
                }
            }
        );
        console.log("pipeList " + JSON.stringify(pipeList));
        RoleModel.aggregate(pipeList).then(response => {
            res.status(200).json(response)
        })
    }

    deleteRole(req , res){
        let _id = req.body._id;
        RoleModel.deleteOne({_id : _id}).then(response =>{
            if(response.acknowledged){
                res.status(200).json("Xoá thành công phân quyền")
            }
        })
    }

    updateRole(req , res){
        let data = req.body;
        RoleModel.find({_id : data._id}).then(response =>{
            console.log(response);
            if(response.length == 1){
                let dataUpdate = {
                    roleName : data.roleName,
                    dataAccess : data.dataAccess,
                }
            RoleModel.updateOne({_id : data._id} , dataUpdate).then(responseUpdate =>{
                if(responseUpdate.acknowledged){
                    res.status(200).json("Cập nhật thành công")
                }
            })
            }
        })
    }

    getRoleById(req , res){
        let _id = req.params.id;
        RoleModel.find({_id : _id}).then(response =>{
            res.status(200).json(response);
        })
    }


}