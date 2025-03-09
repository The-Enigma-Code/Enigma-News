import React, { Component } from 'react'
import data from '../sample.json'
import NewsItem from './NewsItem'
import '../Css/News.css'
import '../Css/LoadingSpinner.css'
import NoImg from '../Images/no-img.jpg'

export class News extends Component {
  noOfNewsItemsPerPage = 3;
  constructor() {
    super()
    this.state = {
      articles: data.articles,
      totalNoOfArticles: data.articles.length,
      startIndex: 0,
      endIndex: this.noOfNewsItemsPerPage,
      page: 1,
      loading: true,
      activePage: null,
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.loading) 
      {
      console.log("component did Update")
      // Simulate a delay
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 500);
    }
    // console.log("cdu activePage",this.state.activePage)
    if (prevState.activePage) {
     
      console.log("previous:" + prevState)
      prevState.activePage.setAttribute('style', '');
      // console.log("previous:", JSON.stringify(prevState, null, 2))//by using this
    }
    if (this.state.activePage) {
      console.log("current:" + this.state);
      this.state.activePage.setAttribute('style', 'position: relative; bottom: 1vh;');
    }
  }

  componentDidMount = () => {
    this.handleLoadingIndicator();
    let element = document.getElementById(`${this.state.page}`);
    this.setState({
      activePage: element,
    })

  }
  
handleLoadingIndicator = () => { //loading after component get mounted
  setTimeout(() => {
    this.setState({
      loading: false,
    });
  }, 1000);
};
  pagesHandler = (event) => {
    
    const element = event.target;
    let pageNo = parseInt(element.getAttribute('id'));
    console.log("pageNo: " + pageNo)
    this.setState({
      endIndex: parseInt(pageNo) * this.noOfNewsItemsPerPage,
      startIndex: (parseInt(pageNo) - 1) * this.noOfNewsItemsPerPage,
      page: pageNo,
      activePage: event.target,
      loading:true
    })
  }
  nextHandler = () => {
    
    this.setState({
      startIndex: this.state.endIndex,
      endIndex: this.state.endIndex + this.noOfNewsItemsPerPage,
      page: this.state.page + 1,
      activePage: document.getElementById(`${this.state.page + 1}`),
      loading:true
    })

  }
  prevHandler = () => {

    this.setState({
      startIndex: this.state.startIndex - this.noOfNewsItemsPerPage,
      endIndex: this.state.startIndex,
      page: this.state.page - 1,
      activePage: document.getElementById(`${this.state.page - 1}`),
      loading:true,
    })
  }
  render() {
    let pagesButtons = [];
    for (let i = 1; i <= Math.ceil(this.state.totalNoOfArticles / this.noOfNewsItemsPerPage); i++) {
      pagesButtons.push(<button className='mx-1' id={`${i}`} key={i} onClick={this.pagesHandler}>{i}</button>)
    }
    return (
      // <div className='container'>
      //   <div className="row">

      //     {
      //       this.state.articles.slice(this.state.startIndex, this.state.endIndex).map((element) => {
      //         return <div key={element.url} className='col-4'>
      //           <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} source={element.source.name} />
      //         </div>
      //       })
      //     }
      //   </div>

      <div className='container my-3' >
        <h2 style={{ textAlign: "center" }}>Enigma News - Top HeadLines</h2>
        <div className="row">
          {this.state.loading ? <div className='spinnerContainer'><div className='spinner'>Loading...</div></div> :
            this.state.articles.slice(this.state.startIndex, this.state.endIndex).map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem date={element.publishedAt} title={element.title} description={element.description ? element.description.slice(0, 70) : ''} imgUrl={element.urlToImage ? element.urlToImage : NoImg} newsUrl={element.url} source={element.source.name} />
              </div>

            })}
        </div>
        <div className="btnCont">
          <button onClick={this.prevHandler} disabled={this.state.startIndex <= 0}>Prev</button>
          <div>
            {pagesButtons}
          </div>

          <button onClick={this.nextHandler} disabled={this.state.endIndex >= this.state.totalNoOfArticles}> Next</button>
        </div>

      </div>
    )
  }
}

export default News
