const express = require("express")
const router = require("./routes/user.routes")
const cookieParser = require("cookie-parser") // spelling fixed
const app = express()

app.use(express.json())
app.use(cookieParser()) // ✅ Must come BEFORE your routes
app.use("/auth", router) // ✅ Routes come after cookieParser

module.exports = app
