import React, { useState, useEffect } from 'react'
import data from '../sample.json'
import NewsItem from './NewsItem'
import '../Css/News.css'
import '../Css/LoadingSpinner.css'
import NoImg from '../Images/no-img.jpg'
import PageButton from './PageButton'
import { element } from 'prop-types'

const News = (props) => {
  const { 
    choosenSource,
    startIndex,setStartIndex,
    endIndex, setEndIndex,
    noOfNewsItemsPerPage,
    noOfAritclesCateWise, 
    page, setPage, 
    activePage, 
    setActivePage, 
    setLoading,
    loading,
  } = props;

  // const setCategory = () => {
  //   let sourceCategory = [...new Set(data.articles.map(element => element.source.name))];
  //   return sourceCategory;
  // }

  useEffect(() => { //for mounting
    handleLoadingIndicator();
    let element = document.getElementById(`pg-${props.page}`);
    props.setActivePage(element)
    console.log("mount active page  "+element)
  }, [])
  
  const handleLoadingIndicator = () => { //loading after component get mounted
    setTimeout(() => {
      props.setLoading(false);
    },5000);
  };
  useEffect(() => {
    if (props.loading) {
      console.log("laoding useeffect")
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeoutId); // cleanup function
    }
  }, [props.loading]);

  useEffect(() => {
    console.log("active page useEffect")

    if (props.activePage) {
      // props.activePage.setAttribute('style', 'position: relative; bottom: 1vh;');
      props.activePage.setAttribute('style', 'position: relative; background-color:black;color:white');
    }
    return () => {
      if (props.activePage) {
        props.activePage.setAttribute('style', '');
      }
    }; // cleanup function
  }, [activePage]);




  return (
    <div className='container my-3' >
      {/* <div>{
      data.articles.slice(startIndex,endIndex).map(element=>{

return <div className="col-md-4" key={element.url}>
                  <NewsItem
                    date={element.publishedAt}
                    title={element.title}
                    description={element.description ? element.description.slice(0, 70) : ''}
                    imgUrl={element.urlToImage ? element.urlToImage : NoImg}
                    newsUrl={element.url}
                    source={element.source.name} 
                    />
                    </div>

      })}
      </div> */}
      <h2 style={{ textAlign: "center" }}>Enigma News - Top HeadLines</h2>
      <div className="row">
        {props.loading?
          <div className="spinnerContainer">
            <div className="spinner">Loading...</div>
          </div>
          :props.choosenSource === 'All' ? (
            data.articles.slice(props.startIndex, props.endIndex)
              .map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    date={element.publishedAt}
                    title={element.title}
                    description={element.description ? element.description.slice(0, 70) : ''}
                    imgUrl={element.urlToImage ? element.urlToImage : NoImg}
                    newsUrl={element.url}
                    source={element.source.name}
                  />
                </div>
              ))
          ) : (
            data.articles
            .filter((element) =>props.choosenSource && element.source.name?.toLowerCase() === choosenSource?.toLowerCase())
              .slice(props.startIndex,props.endIndex)
              .map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    date={element.publishedAt}
                    title={element.title}
                    description={element.description ? element.description.slice(0, 70) : ''}
                    imgUrl={element.urlToImage ? element.urlToImage : NoImg}
                    newsUrl={element.url}
                    source={element.source.name}
                  />
                </div>
              ))
          )}
      </div>
      <PageButton
        startIndex={props.startIndex}
        setStartIndex={props.setStartIndex}
        endIndex={props.endIndex}
        setEndIndex={props.setEndIndex}
        noOfNewsItemsPerPage={props.noOfNewsItemsPerPage}
        page={props.page}
        setPage={props.setPage}
        activePage={props.activePage}
        setActivePage={props.setActivePage}
        loading={props.loading}
        setLoading={props.setLoading}
        noOfAritclesCateWise = {props.noOfAritclesCateWise}
        // totalNoOfArticles={totalNoOfArticles}
      />
    </div>
  )
}


export default News