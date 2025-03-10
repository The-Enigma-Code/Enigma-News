import React, { Component } from 'react'

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{color:'white'}}>
          <div className="container-fluid" style={{backgroundColor:'#343a40',color:'red'}}>
            <a className="navbar-brand" href="/" style={{color:'white'}}>ENIGMA NEWS</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">About</a>
                </li>
   
              </ul>
            </div>
            <div className="form-check form-switch">
          <input className="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
           <label className="form-check-label table-dark" htmlFor="flexSwitchCheckDefault">Change Mode</label>
          </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
