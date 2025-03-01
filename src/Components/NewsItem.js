import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
    let { title, description, imgUrl, newsUrl } = this.props;
    return (
      <div className='my-3'>

        <div className="card" style={{ width: "18rem" }}>
          <img src={imgUrl} className="card-img-top" alt="..." style={{ height: "30vh", width: "auto" }} />
          <div className="card-body">
            <h5 className="card-title">{title} <b> ...</b></h5>
            <p className="card-text">{description} <b> ...  <a href={newsUrl}
              className="primary"
              target='_blank'
              rel="noreferrer"
              aria-label={`Read more about ${title}`}>
              Read More
            </a></b></p>
            {/* <a href={newsUrl} className="btn btn-primary btn-sm" target='_blank' rel="noreferrer">Read More</a> */}
           
          </div>
        </div>

      </div>

    )
  }
}

export default NewsItem
