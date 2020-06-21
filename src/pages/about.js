import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import aboutCoverImage from "../images/about-cover.jpg"
import chefImage from "../images/chef.jpg"
import chef2 from "../images/chef2.jpg"
import chef3 from "../images/chef3.jpg"
import chef4 from "../images/chef4.jpg"
import { PageCover } from "../components/shared-styles"

const teamMembers = [
  { name: "William Kwao", title: "Head Chef", image: chefImage },
  { name: "Mr Bond", title: "Sous Chef", image: chef2 },
  { name: "Sylvester Stallone", title: "Waiter", image: chef3 },
  { name: "James Mojito", title: "Bar tender", image: chef4 },
]
const About = () => {
  return (
    <Layout>
      <AboutPage>
        <PageCover>
          <img
            alt="table with food"
            className="page-cover-img"
            src={aboutCoverImage}
          />
        </PageCover>
        <AboutSection>
          <div className="text-section">
            <h3>Welcome to Alo Vietnam</h3>
            <h2>Authenthic taste of Vietnam in Herndon</h2>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics.
            </p>
          </div>
          <div className="img-div">
            <img src={chefImage}></img>
          </div>
        </AboutSection>
        <section className="team">
          <h1 className="title">Meet our team</h1>
          <div className="team-members">
            {teamMembers.map((member, index) => {
              return (
                <div className="team-member">
                  <img alt="chef" src={member.image} />
                  <h3>{member.name}</h3>
                  <h4>{member.title}</h4>
                </div>
              )
            })}
          </div>
        </section>
      </AboutPage>
    </Layout>
  )
}

var AboutPage = styled.div`
  .team {
    padding: 60px 0px;
    .title {
      text-align: center;
      color: #404044;
      font-family: "Lora", Georgia, serif;
      font-style: normal;
      line-height: 62px;
      font-size: 44px;
      font-weight: 400;
      margin-bottom: 60px;
    }

    .team-members {
      .team-member {
        margin-bottom: 30px;
        text-align: center;
        h3 {
          color: #404044;
          font-family: Lora, Georgia, serif;
          font-style: normal;
          font-weight: 500;
          line-height: 22px;
          font-size: 20px;
          margin-bottom: 8px;
        }

        h4 {
          font-family: Poppins, Arial, sans-serif;
          font-style: normal;
          font-weight: 400;
          color: #7d7d7d;
          line-height: 29px;
          margin: 0px;
        }
        img {
          height: 400px;
          margin-bottom: 16px;
        }
      }
    }
  }
  @media (min-width: 1025px) {
    .team-members {
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
      .team-member {
      }
    }
  }
`

var AboutSection = styled.section`
  padding: 60px 15px;
  max-width: 800px;
  margin: auto;
  margin-top: 44px;
  margin-bottom: 44px;
  img {
    height: 450px;
    margin: auto;
  }
  .text-section {
    h3 {
      color: #969696;
      font-family: Lora;
      font-size: 18px;
      font-weight: 400;
      font-style: italic;
      line-height: 32px;
    }

    h2 {
      font-family: Lora, Georgia, serif;
      font-style: normal;
      line-height: 62px;
      font-size: 44px;
      color: #404044;
    }
    p {
      font-family: Poppins, Arial, sans-serif;
      color: #7d7d7d;
      font-size: 15px;
      line-height: 27px;
    }
  }
  .img-div {
    text-align: center;
  }
  @media (min-width: 1025px) {
    display: grid;
    grid-template-columns: 50% 50%;

    .img-div {
      text-align: right;
    }
  }
`
export default About
