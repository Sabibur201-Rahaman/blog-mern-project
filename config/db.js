const mongoose=require('mongoose')
const colors=require('colors')
const connectDB=async()=>{
    try{
await mongoose.connect(process.env.MONGO_URI)
console.log(`connected with mongo db database ${mongoose.connection.host}`.bgMagenta.white)
    }catch(error){
console.log(`mongo connect error`.bgRed.white)
    }
}

module.exports=connectDB