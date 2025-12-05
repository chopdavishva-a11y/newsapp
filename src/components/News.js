import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
  }

  // 🔥 Reusable function — fetch news
  async updateNews(pageNo) {
    this.setState({ loading: true });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=44eff59981d64ac59c2112584ddf6e86&page=${pageNo}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: pageNo,
      articles: parsedData.articles || [],
      totalResults: parsedData.totalResults || 0,
      loading: false
    });
  }

  async componentDidMount() {
    this.updateNews(1);
  }

  handlePrevClick = async () => {
    this.updateNews(this.state.page - 1);
  }

  handleNextClick = async () => {
    this.updateNews(this.state.page + 1);
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '30px 0px'}}>NewsMonkey - Top Headlines</h1>

        {/* Loader only when fetching */}
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title : ""}
                description={element.description ? element.description : ""}
                newsUrl={element.url}
                imageUrl={element.urlToImage}
              />
            </div>
          ))}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            ← Previous
          </button>

          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next →
          </button>
        </div>
      </div>
    )
  }
}

export default News
