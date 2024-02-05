import express from "express"
import viteExpress from "vite-express"
import morgan from "morgan"

const app = express()

app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"))
app.use(express.json())

import handlerFunctions from "./controller.js";
  //ROUTES
app.get("/invoices", handlerFunctions.getInvoices)

//2nd endpoint
//- add a new row of invoice data to our TEST_DATA in controller.js

app.post("/invoice/add", handlerFunctions.addInvoice)

//third endpoint is a delete
//1. Delete a specific invoice from TEST_DATA
//2. yes - req.params for id
//3. "/invoice/delete/:id"
//4. Send back boolean confirmation
app.delete("/invoice/delete/:id", handlerFunctions.deleteInvoice)

//4th Endpoint (PUT)
//1. Update the rate/description/hours on a specific invoice
//2. Id - req.params, rate/description/hours - req.body
//3. "/invoice/update/:id"
//4. send back the updated invoice with confirmation.

app.put("/invoice/update/:id", handlerFunctions.updateInvoice)


viteExpress.listen(app,7001,()=>{
    console.log('server live at localhost:7001')
})
