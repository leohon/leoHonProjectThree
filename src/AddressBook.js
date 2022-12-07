// Display the contacts in the book 
const AddressBook = function(props) {
  return (
    // Map through the database and display the new contact in a UL sticky note
    // Key pushed above to be used here
    props.contacts.map(function(contact) {
      return (
        <li key={contact.key} className="book">
          <div className="buttonContainer">
            <button onClick={function() {props.removeContact(contact.key)}}>X</button>
          </div>
          <div className="textContainer">
            <p><i className="fa-solid fa-user"></i> - {contact.name}</p>
            <p><i className="fa-solid fa-building"></i> - {contact.company}</p>
            <p><i className="fa-solid fa-envelope"></i> - {contact.email}</p>
            <p><i className="fa-solid fa-phone"></i> - {contact.phone}</p>
          </div>
        </li>
      )
    })
  )
}

export default AddressBook;