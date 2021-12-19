import React, { useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  text-align: center;
  a {
    position: relative;
    z-index: 2;
  }
  .archive-link {
    ${({ theme }) => theme.mixins.button};
    font-size: var(--fz-sm);
    padding: 4px 2px;
    margin: 5px 0 10px;
    color: var(--dred);
    &:after {
      bottom: 0;
    }
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(9, 1fr);
  align-items: center;
  //top RL bottom

  &:not(:last-of-type) {
    margin-bottom: 50px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 10px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 4 / -1;
      //grid-column-start: 4;
      //grid-column-end: -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 4 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 0px 0px 0px;
        text-align: left;
      }
      @media (max-width: 480px) {
        grid-column: 1/-3;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 0 5px 10px;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;
    }
    .project-image {
      grid-column: 1 / -6;

      @media (max-width: 768px) {
        grid-column: 3 / -1;
      }

      @media (max-width: 480px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;
    //grid-row-start: 1;
    //grid-row-end: -1;
    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      text-align: right;
      height: 100%;
      grid-column: 1 / -1;
      padding: 0px 0px 0px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--red);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: black;
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 12px;
    border-radius: none;
    background-color: var(--white);
    color: black;
    font-size: 11px;
    overflow: auto;

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }
    p {
      font-weight: 100;
      @media (max-width: 768px) {
        font-weight: 300;
      }
    }
    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 15px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: gray;
      font-style: oblique;
      font-size: var(--fz-xxx);
      line-height: 1.75;
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: white;
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: black;

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 0 10px 0;

      &.external {
        svg {
          width: 15px;
          height: 15px;
          margin-top: 0px;
        }
      }

      svg {
        color: var(--dark-greige);
      }
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -3;
      opacity: 0.25;
    }
    @media (max-width: 480px) {
      grid-column: 1 / -1;
      opacity: 0.25;
    }

    a {
      width: 100%;
      background-color: none;
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover {
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: none;
        mix-blend-mode: none;
      }
      .img {
        background: transparent;
        filter: opacity(0.5) drop-shadow(0 0 0 var(--greige));
      }
    }

    .img {
      filter: grayscale(100%);
      &:hover {
        filter: none;
      }

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(80%);
      }
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    query {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/featured/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  fluid(maxWidth: 700, traceSVG: { color: "#64ffda" }) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);

  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Created
      </h2>

      <StyledProjectsGrid>
        <Link className="archive-link" to="/archive" ref={revealArchiveLink}>
          view project archive
        </Link>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover } = frontmatter;

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Work</p>

                    <h3 className="project-title">
                      <a href={external}>{title}</a>
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech.length && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && (
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-image">
                  <a href={external ? external : github ? github : '#'}>
                    <Img fluid={cover.childImageSharp.fluid} alt={title} className="img" />
                  </a>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
