import './InvoiceTable.css';
import { useState } from 'react';

import TableHeader from './TableHeader';

import React from 'react'
import AddButton from './AddButton';
import TableRow from './TableRow';
import axios from 'axios';

let globalId = 4

function InvoiceTable({ initialData }) {
// take initial date and turn it into state so we don't 
//have to refresh from app

    const[currentData, setCurrentData] = useState(initialData)

    


    //Loop through initialData and return a <TableRow/
    //component for each invoice object in the array. 

    const rows = currentData.map((invoice) => {
        const { id, description, hours, rate } = invoice;

        return (
            <TableRow
            key={id}
            initialIsEditing={false}
            initialInvoiceData={{ id, description, rate, hours }}
            deleteFunc={() => deleteRow(invoice.id)}
            />
        )

    })

    //create a function that will add a row to current data

    const addRow = async () => {
        //create a new empty object with id, description rate and hours
        const response = await axios.post("/invoice/add", {
            description: "Enter description here"
        })
        console.log(response.data.newInvoice)

        //add this new row to current data, with it's setter-setter-function
        setCurrentData([...currentData, response.data.newInvoice])
    }

    const deleteRow = (id) => {
    // Send a delete request to our server 
    axios.delete( `/invoice/delete/${id}`)
    .then((res) => {

        if (res.data.status) {

        const filteredList = currentData.filter((invoice) => {
            return invoice.id !== id
        })
        setCurrentData(filteredList)
    } else {
        console.log("Something didn't work right")
    }
    })
    }

  return (
 <div>
    <table>
        <thead>
            <TableHeader/>
        </thead>

        <tbody>
        {rows}
        </tbody>

        <tfoot>
            <AddButton addRow={addRow}/>
        </tfoot>
    </table>
 </div>
  )
}

export default InvoiceTable
