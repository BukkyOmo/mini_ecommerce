import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

if (process.env.NODE_ENV === "test") {
    mongoose.connect(process.env.DATABASE_URL_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
} else {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
}

export default mongoose.connection;
