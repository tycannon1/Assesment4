import express from "express"
import viteExpress from "vite-express"
import morgan from "morgan"

const app = express()

app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))
app.use(express.json())

viteExpress.listen(app,7001,()=>{
    console.log('server live at localhost:7001')
})
