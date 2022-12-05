// Create a form to grab user inputs

const Form = function(props) {
  return (
    <form >
        <div className="oneInput">
            <label htmlFor="newName">Name</label>
            <input type="text" id="newName" onChange={props.nameInput} value={props.contactName}/>
        </div>

        <div className="oneInput">
            <label htmlFor="newCo">Company</label>
            <input type="text" id="newCo" onChange={props.companyInput} value={props.contactCompany}/>
        </div>

        <div className="oneInput">
            <label htmlFor="newEmail">Email</label>
            <input type="email" id="newEmail" onChange={props.emailInput} value={props.contactEmail}/>
        </div>

        <div className="oneInput">
            <label htmlFor="newPhone">Phone Number</label>
            <input type="tel" id="newPhone" onChange={props.phoneInput} value={props.contactPhone}/>
        </div>
        
        <button onClick={props.handleSubmit}>Add</button>

        {/* <p>errorMessage</p> */}
    </form>
  )
}

export default Form;