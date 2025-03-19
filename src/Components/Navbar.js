import React from 'react'
import data from '../sample.json'


export const Navbar = (props) => {
  const {handleCategoryChange, choosenSource} = props; //setSource() getSource name onClick, and choosenSource store clicked source name as string
  const nameCategory = () => {
    let sourceCategory = [...new Set(data.articles.map(element => element.source.name))];
    sourceCategory.unshift('All')
    return sourceCategory;
  } //return array of all source name including All
  let categories = nameCategory(); //storing each category into array for 
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ color: 'white' }}>
        <div className="container-fluid" style={{ backgroundColor: '#343a40', color: 'red' }}>
          <a className="navbar-brand" href="/">ENIGMA NEWS</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 my-2">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <div className="dropdown my-2">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Sources
                  </button>
                  <ul className="dropdown-menu">
                    {categories.map(categoryName => {
                      return <li key={categoryName}><a id={categoryName} className="dropdown-item" href="/" onClick={(event) => {
                        event.preventDefault();//preventing default behaviour
                        props.handleCategoryChange(event.target)
                      }}>{categoryName}</a></li>
                    })}
                  </ul>

                </div>

              </li>
              <li className="nav-item">
                <div>{choosenSource}</div>

              </li>
            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}


export default Navbar
