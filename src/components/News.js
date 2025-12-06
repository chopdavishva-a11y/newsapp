import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'   // ✔ FIXED
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'us',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category:PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }
    async updateNews(){
        this.setState({ loading: true })  
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=44eff59981d64ac59c2112584ddf6e86&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false    
        })
    }
    async componentDidMount() {
        this.updateNews();
     }
    handlePrevClick = async () => {
      this.setState({page: this.state.page -1});
      this.updateNews();
    }
    handleNextClick = async() => {
       this.setState({page:this.state.page + 1});
       this.updateNews();
    }
    render() {
        console.log("render")
        return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '30px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} category</h1>
        {/* ✔ FIX — only show spinner when loading */}
        {this.state.loading && <Spinner />}

        <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={element.description ? element.description : ""}
                      newsUrl={element.url}
                      imageUrl={element.urlToImage}
                      author={element.author ? element.author : "Unknown"}
                      date={element.publishedAt ? element.publishedAt : ""}
                      source={element.source.name}
                    />
                </div>
            })}
        </div>
        <div className="container d-flex justify-content-between" style={{marginTop: '20px'}}>
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div> 
    )
  }
}

export default News
