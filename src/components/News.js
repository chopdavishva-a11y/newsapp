import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'   // ✔ FIXED

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
     }
    async componentDidMount() {
        this.setState({ loading: true })   // ✔ NEW
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=44eff59981d64ac59c2112584ddf6e86&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false      // ✔ NEW
        })
     }
    handlePrevClick = async () => {
        console.log("previous");
        this.setState({ loading: true })   // ✔ NEW
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=44eff59981d64ac59c2112584ddf6e86&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState(prevState => ({
            page: prevState.page - 1,
            articles: parsedData.articles,
            loading: false        // ✔ NEW
        }));
    }
    handleNextClick = async() => {
        console.log("next");

        if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
        }
        else {
            this.setState({ loading: true })  // ✔ NEW

            let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=44eff59981d64ac59c2112584ddf6e86&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parsedData = await data.json();

            console.log(parsedData);
            this.setState(prevState => ({
                page: prevState.page + 1,
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false    // ✔ NEW
            }));
        }
    }
    render() {
        console.log("render")
        return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {/* ✔ FIX — only show spinner when loading */}
        {this.state.loading && <Spinner />}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title?element.title:""} description={element.description?element.description:"" } newsUrl={element.url}
                     imageUrl={element.urlToImage}/>
                </div>
            })}
        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div> 
    )
  }
}
export default News