import React from 'react'

export default function PageButton(props) {
 let {
  startIndex, 
  setStartIndex, 
  endIndex,setEndIndex,
  noOfNewsItemsPerPage,
  noOfAritclesCateWise,
  page,setPage,setActivePage,setLoading,
} = props;
    

    const pagesHandler = (event) => {
        const element = event.target;
        let pageNo = parseInt(element.getAttribute('data-value'));
        console.log("pageNo: " + pageNo)
      
        props.setStartIndex((parseInt(pageNo) - 1) * noOfNewsItemsPerPage);
        setEndIndex(parseInt(pageNo) * noOfNewsItemsPerPage);
        setPage(pageNo);
        setActivePage(event.target);
        setLoading(true);
        
      }
      let pagesButtons = [];
      for (let i = 1; i <= Math.ceil(noOfAritclesCateWise / noOfNewsItemsPerPage); i++) {
        pagesButtons.push(<button className='mx-1' data-value={i} id={`pg-${i}`} key={i} onClick={pagesHandler}>{i}</button>)
      }
     const nextHandler = () => {
        
     
        setStartIndex(endIndex);
        setEndIndex(endIndex+noOfNewsItemsPerPage);
        setPage(page+1);
        setActivePage(document.getElementById(`pg-${page + 1}`));
        setLoading(true);
    
      }
     const prevHandler = () => {
    
        setStartIndex(startIndex-noOfNewsItemsPerPage);
        setEndIndex(startIndex);
        setPage(page-1);
        setActivePage(document.getElementById(`pg-${page - 1}`));
        setLoading(true);
      }
  return (
    <div>
       <div className="btnCont">
          <button onClick={prevHandler} disabled={startIndex <= 0}>Prev</button>
          <div>
            {pagesButtons}
          </div>

          <button onClick={nextHandler} disabled={endIndex >=  noOfAritclesCateWise}> Next</button>
        </div>
    </div>
  )
}
