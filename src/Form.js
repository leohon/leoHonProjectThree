// Create a form to grab user inputs
// NOTE: 'required' and type = email & tel, does not work on form. Works for Temperature code along. Compared code, didn't do anything different, not sure what's wrong and how to fix.
const Form = function(props) {
  return (
    <form>
      <div className="oneInput">
        <label htmlFor="newName">Name<span>*</span></label>
        <input 
          type="text" 
          id="newName" 
          onChange={props.nameInput} 
          value={props.contactName} 
          required
        />
      </div>

      <div className="oneInput">
        <label htmlFor="newCompany">Company<span>*</span></label>
        <input 
          type="text" 
          id="newCompany" 
          onChange={props.companyInput} 
          value={props.contactCompany} 
          required
        />
      </div>

      <div className="oneInput">
        <label htmlFor="newEmail">Email<span>*</span></label>
        <input 
          type="email" 
          id="newEmail" 
          onChange={props.emailInput} 
          value={props.contactEmail}
          required
        />
      </div>

      <div className="oneInput">
        <label htmlFor="newPhone">Phone #</label>
        <input 
          type="tel" 
          id="newPhone" 
          onChange={props.phoneInput} 
          value={props.contactPhone}
        />
      </div>
      
      <button onClick={props.handleSubmit}>Add</button>

      <p>{props.errorMessage}</p>
    </form>
  )
}

export default Form;