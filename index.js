const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routers/authRouter");
const categoryRouter = require("./routers/categoryRoute");
const blogRouter = require("./routers/blogRoute");
const PORT = process.env.PORT || 5000

dotenv.config();
const app = express();


app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    
}));
app.use(cookieParser());



mongoose.connect(process.env.MONGO_DB_CONNECTION).then(() => {
    console.log("Successfully Connected Mongodb");
}).catch( (err) => {
    console.log("Database Connection faild", err )
})



// router setup
app.use("/api", authRoute);
app.use("/api", authRoute);


// category router
app.use("/api/category", categoryRouter);



//Blog router
app.use("/api/blog", blogRouter);



app.listen(PORT,() => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
})


app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})