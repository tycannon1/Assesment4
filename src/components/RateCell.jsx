import formatCurrency from "./utils/formatCurrency.js"
function RateCell({isEditing, value, onValueChange }) {
    return isEditing ? (
      <td>
          <input type="text" 
          value={value}
          onChange={(e) => onValueChange(e.target.value)} />
      </td>
    ) : (
      <td>{formatCurrency(value)}</td>
    )
  }
  
  export default RateCell