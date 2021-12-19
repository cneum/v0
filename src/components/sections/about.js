import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';

const StyledAboutSection = styled.section`
  max-width: 900px;
  padding-bottom: 35px;
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
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    padding: 0;
    margin: 0px 0 0 0;
    overflow: hidden;
    list-style: none;
    line-height: 1.6;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 15px;
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
        line-height: 0.9;
        font-style: normal;
      }
    }
  }
  p {
    font-size: 10.5px;
    letter-spacing: 0px;
    line-height: 0.95;
    margin-bottom: 10px;
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
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

  const skills = ['git', 'SQL', 'HTML/CSS', 'Adobe Creative Suite', 'Python', 'JavaScript', 'R'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>Hello! I'm Celine.</p>

            <p>
              Outside the office, you might find me rock climbing, eating mac & cheese, or painting.
            </p>
            <p>Here are technologies I'm working with:</p>
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
