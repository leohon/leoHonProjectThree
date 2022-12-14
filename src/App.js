import './App.css';
import app from './components/firebase'
import {useState, useEffect} from 'react';
import {getDatabase, ref, onValue, push, remove} from 'firebase/database';
import Header from './components/Header';
import Info from './components/FormInfo';
import Form from './components/Form';
import AddressBook from './components/AddressBook';
import Footer from './components/Footer';

function App() {
  // Stateful variables for login
  const [login, setLogin] = useState('Log In');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  // Stateful variables for contacts, name, company, email, phone
  const [contacts, setContacts] = useState([]);
  const [contactProfile, setContactProfile] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  })
  // Stateful variables for error handling
  const [errorMessage, setErrorMessage] = useState('');

  // Login handler
  const handleLogin = function() {
    if (!loggedIn) {
      setLoggedIn(true);
      setLogin("Log Out");
      setLoginMessage("Logged In");
    }
    else {
      setLoggedIn(false);
      setLogin("Log In");
      setLoginMessage("");
    }
  }

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
  const handleChange = function(e) {
    setContactProfile({...contactProfile, [e.target.name]: e.target.value})
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
    if (contactProfile.name === '' || contactProfile.company === '' || contactProfile.email === '') {
      setErrorMessage("Name, Company, and Email REQUIRED")
    }
    // Process data inputted
    else {
      setErrorMessage('');

      // Create object that stores the inputs
      const newUser = {
        name: contactProfile.name,
        company: contactProfile.company,
        email: contactProfile.email,
        phone: contactProfile.phone
      }

      // Push object to database to then be printed out. A key will be automatically generated by Firebase.
      push(dbRef, newUser);

      // Reset input form for new entry
      setContactProfile({
        name: '',
        company: '',
        email: '',
        phone: ''
      })
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
      <Header 
        handleLogin={handleLogin} 
        login={login}
        loginMessage={loginMessage}
      />
        
      {/* Form Section */}
      <section className="wrapper form">
        <Info />
        <Form 
          contactProfile={contactProfile}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
        />
      </section>

      {/* Note-book Section */}
      <h2>Note-Book</h2>
      <ul>
        {
          <AddressBook 
            contacts={contacts}
            removeContact={removeContact}
          />
        }
      </ul>
      

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
