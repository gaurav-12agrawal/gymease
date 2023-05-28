const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const cors = require('cors')

const port = process.env.PORT || 5000
require('./db/conn')
const router = require('./Router/router')
const adminrouter = require('./Router/adminrouter')
const userrouter = require('./Router/userrouter')
const userforrouter = require('./Router/userforrouter')
const reviewrouter = require('./Router/reviewrouter')
const superadminrouter = require('./Router/superadminrouter')
const paymentrouter = require('./Router/paymentrouter')
app.use(express.json());
app.use(cors({
    origin: "https://gymease.netlify.app",
    credentials: true
}))
app.set("trust proxy", 1);
app.use(router)
app.use(userrouter)
app.use(userforrouter)
app.use(adminrouter)
app.use(superadminrouter)
app.use(reviewrouter)
app.use(paymentrouter)

app.listen(port, () => {
    console.log(`App is linsting at port ${port}`);
});