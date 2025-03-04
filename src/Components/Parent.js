import React, { Component } from 'react'
import Child from './Child'

export class Parent extends Component {
    constructor(props){
        super(props)
        
    }
  render() {
    return <Child name={"john"}/>;
  
}
  }

export default Parent
