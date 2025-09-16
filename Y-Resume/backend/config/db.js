import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://yinjieyu21:resume123@cluster0.grvpesr.mongodb.net/?')
    .then(() => console.log('DB CONNNECTED'))
}