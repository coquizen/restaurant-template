import React from "react"
import styled from "styled-components"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import aboutCoverImage from "../images/about-cover.jpg"

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoPlay: true,
  arrows: false,
  dots: true,
}

const reviewsData = [
  {
    review:
      "Friendly staff, and a wide array of menu options. Food is great and I'm glad that the staff here is welcoming.",
    reviewer: "Will",
  },
  {
    review:
      "The place is pristine, we ordered from all over the menu and everything was great, even the line in the water",
    reviewer: "Matt",
  },
]

const ReviewsStyles = styled.div`
  background: linear-gradient(rgba(48, 48, 48, 0.8), rgba(48, 48, 48, 0.8)),
    url(${aboutCoverImage});
  background-position: center;
  background-size: cover;
  color: #fff;
  text-align: center;
  min-height: 400px;
  padding: 80px 0px;
  h2 {
    font-style: normal;
    font-weight: 400;
    line-height: 62px;
    font-size: 44px;
    margin-bottom: 32px;
  }
  .slider-contaner {
    max-width: 600px;
    margin: auto;

    p {
      font-size: 20px;
      line-height: 36px;
      font-weight: 400;
    }
    .slick-dots li.slick-active button:before {
      color: #fff;
    }
  }
`
const Reviews = () => {
  return (
    <ReviewsStyles>
      <h2>What Our Customers Say</h2>
      <div className="slider-contaner">
        <Slider {...settings}>
          {reviewsData.map((review, index) => {
            return (
              <div className="review-slide" key={index}>
                <blockquote>
                  <p>"{review.review}"</p>
                  <span>- {review.reviewer} </span>
                </blockquote>
              </div>
            )
          })}
        </Slider>
      </div>
    </ReviewsStyles>
  )
}

export default Reviews
