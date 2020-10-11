import React from "react";
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';
import {keyList} from "../../data/apiKeys"

let newsDate = [];
let newsHeadline = [];
let newsImage = [];
let newsSummary = [];
let newsUrl = [];
let newsRelated = [];

class News extends React.Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  getLatestNews() {
    fetch(
      `https://cloud.iexapis.com/stable/stock/${this.props.symbol}/news?token=${keyList[4]}`,
    )
      .then(res => res.json())
      .then(result => {
        for (let i = 0; i < 3; i++) {
          if (typeof result[parseInt(i)] !== "undefined") {
            let date = Date(result[parseInt(i)].datetime)
              .toString()
              .split(" ");
            newsDate[parseInt(i)] = `${date[1]} ${date[2]}`;
            newsHeadline[parseInt(i)] = result[parseInt(i)].headline;
            newsUrl[parseInt(i)] = result[parseInt(i)].url;
            newsSummary[parseInt(i)] = `${result[parseInt(i)].summary
              .split(" ")
              .splice(-result[parseInt(i)].summary.split(" ").length, 17)
              .join(" ")} ...`;
            newsRelated[parseInt(i)] = result[parseInt(i)].related;
            newsImage[parseInt(i)] = result[parseInt(i)].image;
          }
        }
      })
      .then(() => {
        setTimeout(() => {
          for (let i = 0; i < newsUrl.length; i++) {
            if (document.querySelector("#img" + i) !== null) {
              document.querySelector(
                "#img" + i,
              ).style = `background-image:url(${newsImage[parseInt(i)]})`;
            }
          }
        }, 1000);
      })
      .then(() => {
        if (this._isMounted) {
          this.setState({ loading: false });
        }
      });
  }
  componentDidMount() {
    this._isMounted = true;
    this.getLatestNews();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="news__articles">
        <h3>
          Latest News
        </h3>
        {newsHeadline.map((val, indx) => {
          return (
            <a
              href={newsUrl[parseInt(indx)]}
              target="_blank"
              rel="noopener noreferrer"
              key={indx}>
              <div className="article">
                <div className="article__image" id={"img" + indx} />
                <div className="article__content">
                  <div className="article__top">
                    <h4>{val}</h4>
                    <h6>{newsDate[parseInt(indx)]}</h6>
                  </div>
                  <h5>{newsSummary[parseInt(indx)]}</h5>
                </div>
              </div>
            </a>
          );
        })}
        {newsHeadline.length === 0 && !this.state.loading && (
          <div className="news__nothing">
            <h3>Sorry, we couldn't find any related news.</h3>
          </div>
        )}
        {this.state.loading && <CircularProgress style={{position: "absolute", top: "50%", left: "50%"}}/>}
      </div>
    );
  }
}

News.propTypes = {
  symbol: PropTypes.string,
};

export default News;
