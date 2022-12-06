import './App.css';
import app from './firebase'
import {useState, useEffect} from 'react';
import {getDatabase, ref, onValue, push, remove} from 'firebase/database';
import Header from './Header';
import Info from './FormInfo';
import Form from './Form';
import Footer from './Footer';

function App() {
  // Stateful variables for contacts, name, company, email, phone, error handling
  const [contacts, setContacts] = useState([]);
  const [contactName, setContactName] = useState('');  
  const [contactCompany, setContactCompany] = useState('');  
  const [contactEmail, setContactEmail] = useState('');  
  const [contactPhone, setContactPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Collect data from database
  useEffect(function() {
    const database = getDatabase(app);
    const dbRef = ref(database);

    onValue(dbRef, function(res) {
      const data = res.val();
      const dataArray = [];

      // Push in key (for deletion part), name, company, email & phone
      for (let key in data) {
        dataArray.push({key: key, name: data[key].name, company: data[key].company, email: data[key].email, phone: data[key].phone});
      }

      setContacts(dataArray);
    })
  }, [])
  
  // Use a handler to store the data of each input into a unique variable. Users can add contacts themselves.
  // Note: individual handler for individual input
  const nameInput = function(e) {
    setContactName(e.target.value);
  }
  const companyInput = function(e) {
    setContactCompany(e.target.value);
  }
  const emailInput = function(e) {
    setContactEmail(e.target.value);
  }
  const phoneInput = function(e) {
    setContactPhone(e.target.value);
  }
  
  // Using the data, print it out on a note underneath.
  // Have another handler push input data into database
  const handleSubmit = function(e) {
    e.preventDefault();

    const database = getDatabase(app);
    const dbRef = ref(database);

    // Required inputs include: name, company, email. (Phone number optional)
    // Error handling for required inputs
    // *** Stretch goal - handle spaces-only entry
    if (contactName === '' || contactCompany === '' || contactEmail === '') {
      setErrorMessage("Name, Company, and Email REQUIRED")
    }
    else {
      setErrorMessage('');

      // Create object that stores the inputs
      const newUser = {
        name: contactName,
        company: contactCompany,
        email: contactEmail,
        phone: contactPhone
      }

      // Push object to database to then be printed out. A key will be automatically generated by Firebase.
      push(dbRef, newUser);

      // Reset input form for new entry
      setContactName('');
      setContactCompany('');
      setContactEmail('');
      setContactPhone('');
    }
  } 

  // Use a third handler to remove any unwanted/unneeded contacts
  // Uses key to remove from database
  const removeContact = function(contactKey) {
    const database = getDatabase(app);
    const dbRef = ref(database, `/${contactKey}`);

    remove(dbRef);
  }

  return (
    <div className="App">
      {/* Header */}
      <Header />
        
      {/* Form Section */}
      <div className="wrapper form">
        <Info />
        <Form 
          nameInput={nameInput}
          contactName={contactName}
          companyInput={companyInput}
          contactCompany={contactCompany}
          emailInput={emailInput}
          contactEmail={contactEmail}
          phoneInput={phoneInput}
          contactPhone={contactPhone}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
        />
      </div>

      {/* Display the contacts in the book */}
      <h2>Note-Book</h2>
      <ul>
        {
          // Map through the database and display the new contact in a UL sticky note
          // Key pushed above to be used here
          contacts.map(function(contact) {
            return (
              <div key={contact.key} className="book">
                <div className="buttonContainer">
                  <button onClick={function() {removeContact(contact.key)}}>X</button>
                </div>
                <div className="textContainer">
                  <p><i class="fa-solid fa-user"></i> - {contact.name}</p>
                  <p><i class="fa-solid fa-building"></i> - {contact.company}</p>
                  <p><i class="fa-solid fa-envelope"></i> - {contact.email}</p>
                  <p><i class="fa-solid fa-phone"></i> - {contact.phone}</p>
                </div>
              </div>
            )
          })
        }
      </ul>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
