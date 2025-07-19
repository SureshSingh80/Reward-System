import {Schema,model,models} from 'mongoose';

const adminSchema = new Schema({
    adminId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Admin = models.Admin || model('Admin',adminSchema);
export default Admin;
    
