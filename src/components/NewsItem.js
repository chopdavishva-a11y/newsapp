import React from "react";

const NewsItem = ({title,description,imageUrl,newsUrl,author,date,source,}) => {
  const fallbackImg ="https://image.cnbcfm.com/api/v1/image/108173667-1752803324163-gettyimages-2195350309-4072_14_mrb_24-sydneytasmania-1799.jpeg?v=1764720520&w=1920&h=1080";
  return (
    <div className="card news-card">
      <span className="badge badge-source" style={{ position: "absolute", right: "10px", top: "10px" }}>
        {source}
      </span>
      <img src={imageUrl ? imageUrl : fallbackImg} className="card-img-top" alt="news" onError={(e) => {e.target.src = fallbackImg; }}/>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="news-meta">By <b>{author ? author : "Unknown"}</b> on{" "}{new Date(date).toGMTString()}</p>
        {/* Read More Button */}
        <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="read-btn">Read More →</a>
      </div>
    </div>
  );
};
export default NewsItem;
