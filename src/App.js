import './App.css';
import app from './firebase.js'

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <button>Log In</button>
        </nav>

        <h1>[TITLE]</h1>
      </header>

      <main>
        <div className="info">
          <h3>Form</h3>
          <p>Form info</p>
        </div>

        <form action="submit">
          <label htmlFor="">Name</label>
          <input type="text" required/>
          
          <label htmlFor="">Company</label>
          <input type="text" required/>
          
          <label htmlFor="">Email</label>
          <input type="email" required/>

          <label htmlFor="">Phone Number</label>
          <input type="tel" />

          <button>Add</button>
        </form>

        <div>
          <ul></ul>
        </div>
      </main>

      <footer>
        <p>Created at <a href="https://junocollege.com/">Juno College</a></p>
      </footer>
    </div>
  );
}

export default App;
