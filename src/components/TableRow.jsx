
import ModeButtons from './ModeButtons';
import DescriptionCell from './DescriptionCell';
import HoursCell from './HoursCell';
import RateCell from './RateCell';
import formatCurrency from "./utils/formatCurrency.js"
import { useState } from 'react';
import axios from 'axios';

function TableRow( {initialIsEditing, initialInvoiceData, deleteFunc } ) {

  // const { description, rate, hours } = initialInvoiceData 
  const [editMode, setEditMode] = useState(initialIsEditing)
  const [description, setDescription] = useState(initialInvoiceData.description)
  const [rate, setRate] = useState(initialInvoiceData.rate)
  const [hours, setHours] = useState(initialInvoiceData.hours)


  const makeEditMode = () => setEditMode(true)
  const makeNormalMode = () => {
    //This function now needs to submit and axios.put request
    //to the server, submitting as the body of the 
    //request , the rate, hours, and description --> those are
    //already being saved as state variables
    //In a put request, I know I need a body object, so I'll
    //make one in advance for the readability of this function

    const bodyObj = {
      description: description,
      rate: rate,
      hours: hours,
    }

    //send that body object (and an id as a param) to my server with axios

    axios.put(`/invoice/update/${initialInvoiceData.id}`, bodyObj)
    .then((res) => {
      setEditMode(false)
    })

  }


  return (
    <tr>
    <ModeButtons 
    isEditing={editMode} 
    saveClick={makeNormalMode}
    editClick={makeEditMode}
    deleteFunc={deleteFunc}
    />
    <DescriptionCell 
    isEditing={editMode} 
    value={ description } 
    onValueChange={setDescription}/>
    <RateCell isEditing={editMode} 
    value={rate} 
    onValueChange={setRate}/>
    <HoursCell isEditing={editMode} 
    value={hours} 
    onValueChange={setHours}/>
    <td>{formatCurrency(rate * hours)}</td>
    </tr>
  )
}

export default TableRow