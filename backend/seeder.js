
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import User from "./models/userModel.js"
import Order from "./models/orderModel.js"
import users from "./data/user.js"
import products from "./data/products.js"
import Product from "./models/productModel.js"
import 'colors'

dotenv.config()
connectDB()

const importData = async () =>{
    try {
// delete all order/ products/user         
await Order.deleteMany() 
await Product.deleteMany() 
await User.deleteMany() 

const createdUsers = await User.insertMany(users);
const adminUser = createdUsers[0]._id
const sampleProducts = products.map((product)=>{
    return{...product, user: adminUser}
})

await Product.insertMany(sampleProducts )

console.log('Data Imported! ' .green.inverse)
process.exit()
 
    } catch (err){
console.error(`${err}` .red.inverse);  
process.exit(1)
  }
}


const destroyData = async () =>{
    try {
// delete all order/ products/user         
await Order.deleteMany() 
await Product.deleteMany() 
await User.deleteMany() 




console.log('Data Destroyed!'.red.inverse)
process.exit()
 
    } catch (err){
console.error(`${err}`.red.inverse);  
process.exit(1)
  }
}



console.log(process.argv[2])

if (process.argv[2] === '-d'){
    destroyData()
} else {
    importData()
}