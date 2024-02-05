let TEST_DATA = [
    { id: 0, description: 'Blender Bottle', rate: 15, hours: 112 },
    { id: 1, description: 'Cross Body Bag', rate: 46, hours: 130 },
    { id: 2, description: 'Shorts', rate: 50, hours: 230 },
    { id: 3, description: 'Igor On Vinal', rate: 60, hours: 3 },
  ];

  let globalId = 4

  const handlerFunctions = {
    
    getInvoices: (req, res) => {
        res.send({
            message: "All invoices from TEST_DATA",
            invoices: TEST_DATA
        })
      },
    addInvoice: (req, res) => {
        // Get the description from req.body
        const description = req.body.description
        
        // Create a new invoice object
        const newInvoice = {
            id: globalId, 
            description: description,
            rate: 0,
            hours: 0,
        }
        //push that new object into TEST_DATA
        TEST_DATA.push(newInvoice)
        //send back new object to the front-end
        globalId++
        res.send({
            message:"New invoice added to TEST_DATA",
            newInvoice: newInvoice,
        })
    },
    deleteInvoice: (req, res) => {
        const { id } = req.params
        // delete the element from test data that matches the id send in this request
        TEST_DATA = TEST_DATA.filter((invoice) => {
            return invoice.id !== +id
        })

        res.send({
            message: "I tried to delete this invoice",
            status: true,
        })
    },
    updateInvoice: (req, res) => {
        const { id } = req.params
        // grab rate/hours/descriptiopn
        const { rate, hours, description } = req.body

        console.log(id, description)
        //find the corresponding invoice to update
        const index = TEST_DATA.findIndex((invoice) => {
            return invoice.id === +id
        })
        //with the index, I can mark that invoice 
        const invoiceToUpdate = TEST_DATA[index]
        //now just update the attributes of invoiceToUpdate
        invoiceToUpdate.description = description
        invoiceToUpdate.rate = +rate
        invoiceToUpdate.hours = +hours

        res.send({
            message: "Invoice Update",
            updatedInvoice: invoiceToUpdate,
        })
    }
}

  export default handlerFunctions;