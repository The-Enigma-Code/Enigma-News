
import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1
    };
  }

  async componentDidMount() {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=e8023ec47f884889bb85db441e75c4ee')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`API error: ${response.status}`);
        }
      })
      .then(data => {
        if (data && data.articles) {
          this.setState({ articles: data.articles, loading: false });
        } else {
          console.error('Invalid API response');
        }
      })
      .catch(error => console.error('Error fetching news:', error));
  }

  render() {
    return (
      <div className='container my-3'>
        <h2>Enigma News - Top HeadLines</h2>
        <div className="row">
          {this.state.articles.map((element) => {
            if (element.description !== null && element.title !== null && element.urlToImage !== null) {
              return <div className="col-md-4" key={element.url}>
                <NewsItem date={element.publishedAt.slice(0, 10)} title={element.title ? element.title.slice(0, 20) : ''} description={element.description ? element.description.slice(0, 70) : ''} imgUrl={element.urlToImage} newsUrl={element.url} />
              </div>
            }
            return null;
          })}
        </div>
      </div>
    )
  }
}

export default News