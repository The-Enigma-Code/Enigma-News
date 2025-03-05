import React, { Component } from 'react'
import NewsItem from './NewsItem'
import data from '../sample.json'
import NoImg from '../Images/no-img.jpg'
import '../Css/LoadingSpinner.css'
// import { element } from 'prop-types'

export class News extends Component {
 noOfNewsPerPage=3;

 
  constructor() {
    super();
    this.firstPageRef = React.createRef();
    console.log("constructor invkoed")
    this.state = {
      articles: data.articles,
      totalResults:data.articles.length,
      loading: true,
      page:1,
      activePage: null,
      startIndex:0,
      endIndex:this.noOfNewsPerPage,
      // darkMode:{b}
    };
    
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading && this.state.loading) 
      {
      console.log("component did Update")
      // Simulate a delay
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 500);
    }
    if (prevState.activePage) {
      prevState.activePage.setAttribute('style', '');
    }
    if (this.state.activePage) {
      this.state.activePage.setAttribute('style', 'position: relative; bottom: 1vh;');
    }
  }
 // ...

componentDidMount() {
  console.log("cdm");
  this.handleLoadingIndicator();
  this.highlightFirstPage();
}

handleLoadingIndicator = () => { //loading after component get mounted
  setTimeout(() => {
    this.setState({
      loading: false,
    });
  }, 1000);
};

highlightFirstPage = () => { //to reset css of first page after mounting
  if (this.firstPageRef.current) {
    this.firstPageRef.current.setAttribute(
      "style",
      "position: relative; bottom: 1vh;"
    );
    this.setState({
      activePage: this.firstPageRef.current,
    });
  }
};

// ...
  nextHandler = () => {
    console.log("next handler invkoed")
    this.setState({loading:true})
   
      if (this.state.endIndex < this.state.totalResults) {
        this.setState({
          startIndex: this.state.endIndex,
          endIndex: this.state.endIndex + this.noOfNewsPerPage,
          page: this.state.page+1,
          // loading:false
        })
      }
      // console.log("pageNumber next:"+ this.state.page);
  };

  previousHandler =  () => {
    console.log("previous handler invkoed")
    this.setState({loading:true})

      if(this.state.startIndex>0)
        this.setState({
        startIndex: this.state.startIndex-this.noOfNewsPerPage,
        endIndex: this.state.endIndex-this.noOfNewsPerPage,
        // loading:false,
        page: this.state.page-1,
      })
      
    
  };
  pageNumberHandler = (event) => {
    console.log("page handler invkoed")
    this.setState({ loading: true });
  
    // if (this.state.activePage) {
    //   this.state.activePage.setAttribute('style', '');
    // }
  
    const element = event.target;
    // element.setAttribute('style', 'position: relative; bottom: 1vh;');
  
    this.setState({
      activePage: element,
      startIndex: (parseInt(event.target.getAttribute('data-value')) - 1) * this.noOfNewsPerPage,
      endIndex: parseInt(event.target.getAttribute('data-value')) * this.noOfNewsPerPage,
      page: parseInt(event.target.getAttribute('data-value')) 
    });
    // console.log("pageNumber :"+ this.state.page);
  };

  render() {
    console.log("pageNumber prev:"+ this.state.page);
    const buttons = [];
    for (let i = 1; i <= Math.ceil(this.state.totalResults / this.noOfNewsPerPage); i++) {
      if(i===1 && Math.ceil(this.state.totalResults / this.noOfNewsPerPage)>1){
        buttons.push(<button className='mx-1' key={i} data-value={i} onClick={this.pageNumberHandler} ref={this.firstPageRef}>{i}</button>);
      }
      else{

        buttons.push(<button className='mx-1' key={i} data-value={i} onClick={this.pageNumberHandler}>{i}</button>);
      }
    }
    /**
     * CDM(componentDidMount): runs after component load , constructor > render > cdm 
     * if state is being changed asynchronousily , this consider as mounting and cdm get invokes again
     * but if it happeing synchromousily only CDU(componentDidUpdate) will be get invoke,
     * cdu have to params (prevProps,PrevState) which can be useful to compare changes that occurs in state or props (between new state and last state)
     * cdu get invokes after render() whenever the state get changed synchronousily
     */
    return (
      <div className='container my-3' >
        <h2 style={{textAlign:"center"}}>Enigma News - Top HeadLines</h2>
        <div className="row">
          {this.state.loading?<div className='spinnerContainer'><div className='spinner'>Loading...</div></div>:
          this.state.articles.slice(this.state.startIndex, this.state.endIndex).map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem date={element.publishedAt} title={element.title} description={element.description ? element.description.slice(0, 70) : ''} imgUrl={element.urlToImage ? element.urlToImage : NoImg} newsUrl={element.url} source={element.source.name} />
            </div>

          })}
          <div className="btnCont" style={{ display: "flex", justifyContent: "space-between" }}>
            <button disabled={this.state.startIndex<=0} onClick={this.previousHandler}>Previous</button>
            <div>
             {buttons}
            </div>
            <button disabled={this.state.endIndex>=this.state.totalResults} onClick={this.nextHandler}>Next</button>
           {/* next/pev buttons get disabled when endIndex value reach equal or greater than total results */}
          </div>
        </div>
      </div>
    )
  }
}

export default News