
import mongoose  from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,   
    },
    email:{
        type:String,
        required: true,
        unique: true,   
    } ,
    password:{
        type:String,
        required: true,
        
    },
    avatar:{
        type:String,
        default:"https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
    },
    isDeleted :{
        type : Boolean,
        default : false,
      }
},
        
          {  timestamps:true})
const User = mongoose.model('user',userSchema);
export default User; 