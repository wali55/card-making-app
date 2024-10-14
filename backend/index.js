const express = require("express");
const cors = require("cors");
const adminRouter = require("./router/adminRouter");


const app = express();


app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);

app.listen(3000, () => {
    console.log('app is running on port 3000');
})