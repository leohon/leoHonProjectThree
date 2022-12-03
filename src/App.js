import './App.css';
import app from './firebase'
import {useState, useEffect} from 'react';
import {getDatabase, ref, onValue, push} from 'firebase/database';

function App() {
  const [contacts, setContacts] = useState([]);
  const [contactName, setcontactName] = useState('');  
  const [contactCompany, setcontactCompany] = useState('');  
  const [contactEmail, setcontactEmail] = useState('');  
  const [contactPhone, setcontactPhone] = useState('');

  //Use a third handler to remove any unwanted/unneeded contacts

  // Collect data from database
  useEffect(function() {
    const database = getDatabase(app);
    const dbRef = ref(database);

    onValue(dbRef, function(res) {
      const data = res.val();
      const dataArray = [];

      for (let key in data) {
        dataArray.push({ name: data[key].name, company: data[key].company, email: data[key].email, phone: data[key].phone});
      }

      setContacts(dataArray);
    })
  }, [])
  
  //Use a handler to store the data of each input into a unique variable. Users can add contacts themselves.
  // Note: individual handler for individual input
  const nameInput = function(e) {
    setcontactName(e.target.value);
  }
  const companyInput = function(e) {
    setcontactCompany(e.target.value);
  }
  const emailInput = function(e) {
    setcontactEmail(e.target.value);
  }
  const phoneInput = function(e) {
    setcontactPhone(e.target.value);
  }
  
  //Using the data, print it out on a note underneath.
  //Have another handler push input data into database
  const handleSubmit = function(e) {
    e.preventDefault();

    const database = getDatabase(app);
    const dbRef = ref(database);

    // Creates object storing inputs
    const newUser = {
      name: contactName,
      company: contactCompany,
      email: contactEmail,
      phone: contactPhone
    }

    // Push object to database to then be printed out
    push(dbRef, newUser);

    setcontactName('');
    setcontactCompany('');
    setcontactEmail('');
    setcontactPhone('');
  }

  return (
    <div className="App">
      <header>
        {/* <nav>
          <button>Log In</button>
        </nav> */}

        <h1>[TITLE]</h1>
      </header>

      <main>
        <div className="info">
          <h3>Form</h3>
          <p>Form info</p>
        </div>

        {/* Create a form to grab user inputs */}
        {/* Required inputs include: name, company, email. (Phone number optional) */}
        <form action="submit">
          <label htmlFor="newName">Name</label>
          <input type="text" id="newName" onChange={nameInput} value={contactName}/>
          
          <label htmlFor="newCo">Company</label>
          <input type="text" id="newCo" onChange={companyInput} value={contactCompany}/>
          
          <label htmlFor="newEmail">Email</label>
          <input type="email" id="newEmail" onChange={emailInput} value={contactEmail}/>

          <label htmlFor="newPhone">Phone Number</label>
          <input type="tel" id="newPhone" onChange={phoneInput} value={contactPhone}/>

          <button onClick={handleSubmit}>Add</button>
        </form>

        {/* Display the contacts in the book */}
        <div>
          <h2>BOOK</h2>
          <ul>
            {
              //Map through the database and display the new contact in a UL sticky note
              contacts.map(function(person) {
                return (
                  <div key={person.key}>
                    <p>{person.name}</p>
                    <p>{person.company}</p>
                    <p>{person.email}</p>
                    <p>{person.phone}</p>
                    <p>---</p>
                  </div>
                )
              })
            }
          </ul>
        </div>
      </main>

      <footer>
        <p>Created at <a href="https://junocollege.com/">Juno College</a></p>
      </footer>
    </div>
  );
}

export default App;
