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
          onChange={props.handleChange} 
          value={props.contactProfile.name} 
          name="name"
          required
        />
      </div>

      <div className="oneInput">
        <label htmlFor="newCompany">Company<span>*</span></label>
        <input 
          type="text" 
          id="newCompany" 
          onChange={props.handleChange} 
          value={props.contactProfile.company}
          name="company" 
          required
        />
      </div>

      <div className="oneInput">
        <label htmlFor="newEmail">Email<span>*</span></label>
        <input 
          type="email" 
          id="newEmail" 
          onChange={props.handleChange} 
          value={props.contactProfile.email}
          name="email" 
          required
        />
      </div>

      <div className="oneInput">
        <label htmlFor="newPhone">Phone #</label>
        <input 
          type="tel" 
          id="newPhone" 
          onChange={props.handleChange} 
          value={props.contactProfile.phone}
          name="phone" 
        />
      </div>
      
      <button onClick={props.handleSubmit}>Add</button>

      <p>{props.errorMessage}</p>
    </form>
  )
}

export default Form;