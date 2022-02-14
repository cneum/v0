import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';

const StyledAboutSection = styled.section`
  max-width: 900px;
  padding-bottom: 45px;
  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  @media (max-width: 768px) {
    position: absolute;
  }
  ul.skills-list {
    display: grid;
    @media (min-width: 769px) {
      grid-template-columns: repeat(2, minmax(140px, 200px));
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(3, minmax(32vw, 50vw));
    }
    padding: 0;
    margin: 0px 0 0 0;
    overflow: hidden;
    list-style: none;
    line-height: 1;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 15px;
      margin-bottom: 3vh;
      @media (max-width: 768px) {
        margin-bottom: 5px;
      }
      font-family: var(--font-serif);
      font-size: var(--fz-xs);
      font-style: italic;
      color: white;

      &:before {
        content: '▸';
        position: absolute;
        left: 0;
        color: var(--red);
        font-size: 24px;
        line-height: 0.5;
        font-style: normal;
      }
    }
  }
  p {
    font-size: 10.5px;
    letter-spacing: 0px;
    line-height: 0.95;
    margin-bottom: 2px;
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;
  @media (max-width: 768px) {
    max-width: 500px;
    width: 50vw;
    opacity: 30%;
    margin-left: 19vw;
  }
  @media (max-width: 408px) {
    width: 100%;
    margin-left: 0;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: transparent;

    &:hover,
    &:focus {
      background: transparent;
      outline: 0;

      &:after {
        top: 2px;
        left: 0px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: ;
      mix-blend-mode: none;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: none;
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: transparent;
      mix-blend-mode: none;
    }

    &:after {
      border: 2px solid;
      border-color: var(--red);
      top: 2px;
      left: 2px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "me.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 500, traceSVG: { color: "#989898" }) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['git', 'SQL', 'HTML/CSS', 'Adobe Creative Suite', 'Python', 'JavaScript'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>Budding self-taught tech engineer</p>
            <p>Longtime multidisciplinary scientist</p>
            <p>Seasoned performing, media, visual artist</p>
            <p>&nbsp;</p>
            <p>Passionate about making a creative, meaningful difference</p>
            <p>Striving to elevate others, build community, and leave lasting impressions</p>
            <p>
              Currently working at the intersection of healthcare, science, technology, and data
            </p>
            <p>&nbsp;</p>
            <p>Well-versed in health care operations, procedures, regulation, and terminology</p>
            <p>Blend of technical, customer service and research conduct expertise</p>
            <p>
              Published first- and co-author in medical peer-reviewed journals & conference
              proceedings
            </p>

            <p>&nbsp;</p>
            <p>NYC-born, NY-suburb-bred, Filipino American, currently living in Brooklyn</p>
            <p>Received a BS in Biochemistry from Binghamton University</p>
            <p>Probably rock climbing, drinking thai bubble tea, loving my maltese, or eating.</p>
            <br></br>
            <p>Here are tools I'm working with:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <Img fluid={data.avatar.childImageSharp.fluid} alt="Avatar" className="img" />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
