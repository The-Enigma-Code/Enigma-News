import Navbar from './Components/Navbar';
import News from './Components/News';
import React, { Component } from 'react'
import data from './sample.json'

export class App extends Component {
  constructor (){
    super()
    this.state = {
      selectedCategory:'All',
      totalNoOfArtICateWise:data.articles.length,
    }
  }

  selectCategory = (event) => {
    // window.location.reload();
    let totalSource = data.articles.length;
    let selectedString = event.target.getAttribute('id');
    console.log("selected category is: "+selectedString)
    if(selectedString!=='All') {
      totalSource = 0;
      data.articles.forEach(element => {
        if(element.source.name===selectedString){
          totalSource++;
        }
      });
    
      this.setState({
        selectedCategory:selectedString,
        totalNoOfArtICateWise:totalSource,
      })
    }
    else{
      this.setState({
        selectedCategory:selectedString,
        totalNoOfArtICateWise:totalSource,
      })
    }
    
   
  }
  render() {
    return (
      <div className="App">   
      <Navbar setSource={this.selectCategory} choosenSource={this.state.selectedCategory}/>
      <News selectedSource = {this.state.selectedCategory} noOfAritclesCateWise={this.state.totalNoOfArtICateWise}/>
   </div>
    )
  }
}

export default App

