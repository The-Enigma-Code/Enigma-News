import React, { Component } from 'react'
import NewsItem from './NewsItem'
import data from '../sample.json'
import NoImg from '../Images/no-img.jpg'
import '../Css/LoadingSpinner.css'

export class News extends Component {
 noOfNewsPerPage=3;

 
  constructor() {
    super();
    this.state = {
      articles: data.articles,
      totalResults:data.articles.length,
      loading: true,
      page: 1,
      startIndex:0,
      endIndex:this.noOfNewsPerPage

    };
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading && this.state.loading) {
      console.log("component did Update")
      // Simulate a delay
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 2000);
    }
  }
  componentDidMount() {
    console.log("cdm")
    // Simulate a delay to demonstrate the loading indicator
    setTimeout(() => {
      this.setState({
        
        loading: false,
    
      });
    }, 1000);
  }
  nextHandler = () => {
    this.setState({loading:true})
   
      if (this.state.endIndex < this.state.totalResults) {
        this.setState({
          startIndex: this.state.endIndex,
          endIndex: this.state.endIndex + this.noOfNewsPerPage,
          page: this.state.page+1,
          // loading:false
        })
      }
  };

  previousHandler =  () => {
    this.setState({loading:true})

      if(this.state.startIndex>0)
        this.setState({
        startIndex: this.state.startIndex-this.noOfNewsPerPage,
        endIndex: this.state.endIndex-this.noOfNewsPerPage,
        // loading:false,
        page: this.state.page+1,
      })

    
  };
  pageNumberHandler = (event) => {
    this.setState({loading:true})
 
    const pageNumber = parseInt(event.target.getAttribute('data-value'));
      this.setState({
        startIndex: (pageNumber - 1) * this.noOfNewsPerPage,
        endIndex: pageNumber * this.noOfNewsPerPage,
        // loading:false
      });
    
  };

  render() {
    const buttons = [];
    for (let i = 1; i <= Math.ceil(this.state.totalResults / this.noOfNewsPerPage); i++) {
      buttons.push(<button className='mx-1' key={i} data-value={i} onClick={this.pageNumberHandler}>{i}</button>);
    }
    /**
     * CDM(componentDidMount): runs after component load , constructor > render > cdm 
     * if state is being changed asynchronousily , this consider as mounting and cdm get invokes again
     * but if it happeing synchromousily only CDU(componentDidUpdate) will be get invoke,
     * cdu have to params (prevProps,PrevState) which can be useful to compare changes that occurs in state or props (between new state and last state)
     * cdu get invokes after render() whenever the state get changed synchronousily
     */
    return (
      <div className='container my-3'>
        <h2 style={{textAlign:"center"}}>Enigma News - Top HeadLines</h2>
        <div className="row">
          {this.state.loading?<div className='spinnerContainer'><div className='spinner'>Loading...</div></div>:
          this.state.articles.slice(this.state.startIndex, this.state.endIndex).map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem date={element.publishedAt} title={element.title} description={element.description ? element.description.slice(0, 70) : ''} imgUrl={element.urlToImage ? element.urlToImage : NoImg} newsUrl={element.url} />
            </div>

          })}
          <div className="btnCont" style={{ display: "flex", justifyContent: "space-between" }}>
            <button disabled={this.state.startIndex<=0} onClick={this.previousHandler}>Previous</button>
            <div>
             {buttons}
            </div>
            <button disabled={this.state.endIndex>=this.state.totalResults} onClick={this.nextHandler}>Next</button>
          </div>
        </div>
      </div>
    )
  }
}

export default News