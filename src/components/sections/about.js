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

  const skills = ['git', 'SQL', 'HTML/CSS', 'Python', 'JavaScript', 'R'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>Hello! I'm Celine.</p>

            <p>
              I’m a Medical Assistant Team Lead in private practice where I specialize in driving a
              smooth patient care experience through clinical, operational, clerical, and
              administrative duties. Early on, I realized I love to help people from my experiences
              growing up as a dancer, tutor, retail associate, and inspired by my mom who’s a nurse.
              I set my eyes on medicine for the opportunity to do so and lead by example.
            </p>
            <p>
              While working in direct patient care and basic science research, I realized that my
              favorite parts of medicine were building relationships and solving meaningful complex
              problems. And although you can be creative in medicine, it’s very hard to improve
              healthcare from the clinical side. That takes innovation, technology. This distinction
              led me to pursue a technical role.
            </p>
            <p>
              It was current supervisors who recognized my technical aptitude and first mentioned
              the idea of technical support engineering. After connecting with close friends who are
              dedicated support engineers and data engineers and doing my research, I felt it was
              the perfect fit. I am very excited to solve problems with people and grow my technical
              skills in a role where I can keep in touch with my clinical and research expertise.
            </p>
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
