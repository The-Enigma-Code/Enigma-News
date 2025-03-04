import React, { Component } from 'react'

export class Child extends Component {
    constructor(props){
        super(props)
      this.state = {
        propName:props.name
      }  
    }
  render() {
    console.log(this.state.propName)
    return (
      <div>
        
      </div>
    )
  }
}

export default Child
