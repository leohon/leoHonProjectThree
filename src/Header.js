const Header = function(props) {
  return (
    <header>
      <nav className="wrapper">
        <p>{props.loginMessage}</p>
        <button onClick={props.handleLogin}>{props.login}</button>
      </nav>

      <h1>Networking Notes</h1>
    </header>
  )
}

export default Header;