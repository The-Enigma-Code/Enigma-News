import Navbar from './Components/Navbar';
import News from './Components/News';
import React, { useState } from 'react'
import data from './sample.json'

export const App = () => {
  const noOfNewsItemsPerPage = 3;
  const [selectedCategory, setSelectCategory] = useState('All')
  const [totalNoOfArtICateWise, setTotalNoOfArtICateWise] = useState(data.articles.length)
  const [startIndex, setStartIndex] = useState(0);//for slice
  const [endIndex, setEndIndex] = useState(noOfNewsItemsPerPage);//slice news articles
  const [page, setPage] = useState(1);//pageNo handler
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(null);//for applylig css on clicked pages

  const selectCategory = (element) => {
    let selectedString = element.getAttribute('id');
    console.log("selected category is: " + selectedString);

    if (selectedString !== 'All') {
        const totalSource = data.articles.filter(article => article.source.name === selectedString).length;
        setSelectCategory(selectedString);
        setTotalNoOfArtICateWise(totalSource);
    } else {
        setSelectCategory('All');
        setTotalNoOfArtICateWise(data.articles.length);
    }
    setStartIndex(0);
    setEndIndex(noOfNewsItemsPerPage);
    setPage(1);
    setActivePage(document.getElementById('pg-1'));
};

  return (
    <div className="App">
      <Navbar 
        handleCategoryChange={selectCategory}
        choosenSource={selectedCategory}
        startIndex={startIndex}
        setStartIndex={setStartIndex}
        endIndex={endIndex}
        setEndIndex={setEndIndex}
        noOfNewsItemsPerPage={noOfNewsItemsPerPage}
        page={page}
        setPage={setPage}
        activePage={activePage}
        setActivePage={setActivePage}
        loading={loading}
        setLoading={setLoading}
        noOfAritclesCateWise={totalNoOfArtICateWise}
        />
      <News
      choosenSource={selectedCategory}
       startIndex={startIndex}
       setStartIndex={setStartIndex}
       endIndex={endIndex}
       setEndIndex={setEndIndex}
       noOfNewsItemsPerPage={noOfNewsItemsPerPage}
       page={page}
       setPage={setPage}
       activePage={activePage}
       setActivePage={setActivePage}
       loading={loading}
       setLoading={setLoading}
       noOfAritclesCateWise={totalNoOfArtICateWise}
       />
    </div>
  )
}


export default App

