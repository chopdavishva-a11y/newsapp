import React, { Component } from 'react'

export class NewsItem extends Component {
   
  render() {
    let { title, description, imageUrl ,newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <img src={!imageUrl?"https://image.cnbcfm.com/api/v1/image/108173667-1752803324163-gettyimages-2195350309-4072_14_mrb_24-sydneytasmania-1799.jpeg?v=1764720520&w=1920&h=1080":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
