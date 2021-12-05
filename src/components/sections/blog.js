import React, { useState, useEffect, useRef } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 45px;
  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .blog-link {
    ${({ theme }) => theme.mixins.button};
    background-color: var(--dark-greige);
    color: black;
    font-size: var(--fz-sm);
    padding: 4px 2px;
    margin: 15px 0;
    &:after {
      bottom: 0;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 17px;
    position: relative;
    margin-top: 22px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    a {
      position: relative;
      z-index: 1;
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 40px auto 0;
    background: var(--pink);
    color: gray;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  &:hover,
  &:focus-within {
    .project-inner {
      transform: translateY(-3px);
    }
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 9px 20px;
    background-color: var(--pink);
    -webkit-filter: grayscale(5%);
    transition: var(--transition);
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 0px;

    .folder {
      svg {
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -7px;

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 0px;
        color: gray;

        &.external {
          svg {
            width: 15px;
            height: 15px;
            margin-top: 0px;
          }
        }

        svg {
          width: 13px;
          height: 13px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: black;
    font-size: var(--fz-md);

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

  .project-description {
    color: black;
    font-size: 11px;
    overflow-y: scroll;
    height: 200px;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      width: 3px;
      background-color: transparent;
    }
    ::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 1px;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--dred);
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: red;
    }
    p {
      font-weight: 100;
      padding-bottom: 5px;
      height: 100%;
    }
    img {
      filter: grayscale(100%);
      &:hover {
        filter: none;
      }
    }
    a {
      filter: opacity(0.5) drop-shadow(0 0 0 red);
      &:hover {
        filter: none;
      }
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 6px 0 0 0;
    list-style: none;

    li {
      font-style: oblique;
      font-size: var(--fz-xxx);
      line-height: 1.75;
      color: white;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      blog: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/blog/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
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

  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealBlogLink = useRef(null);
  const revealBlog = useRef([]);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealBlogLink.current, srConfig());
    revealBlog.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const blog = data.blog.edges.filter(({ node }) => node);
  const firstSix = blog.slice(0, GRID_LIMIT);
  const blogToShow = showMore ? blog : firstSix;

  return (
    <section id="blog">
      <StyledProjectsSection>
        <h2 className="numbered-heading" ref={revealTitle}>
          My Blog
        </h2>
        <Link className="inline-link blog-link" to="/blog" ref={revealBlogLink}>
          view blog archive
        </Link>
        <ul className="projects-grid">
          <TransitionGroup component={null}>
            {blogToShow &&
              blogToShow.map(({ node }, i) => {
                const { frontmatter, html } = node;
                const { external, title, tech } = frontmatter;

                return (
                  <CSSTransition
                    key={i}
                    classNames="fadeup"
                    timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                    exit={false}
                  >
                    <StyledProject
                      key={i}
                      ref={el => (revealBlog.current[i] = el)}
                      style={{
                        transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                      }}
                    >
                      <div className="project-inner">
                        <header>
                          <div className="project-top">
                            <div className="folder"></div>
                            <div className="project-links">
                              {external && (
                                <a href={external} aria-label="External Link" className="external">
                                  <Icon name="External" />
                                </a>
                              )}
                            </div>
                          </div>

                          <h3 className="project-title">
                            <a href={external}>{title}</a>
                          </h3>

                          <div
                            className="project-description"
                            dangerouslySetInnerHTML={{ __html: html }}
                          />
                        </header>

                        <footer>
                          {tech && (
                            <ul className="project-tech-list">
                              {tech.map((tech, i) => (
                                <li key={i}>{tech}</li>
                              ))}
                            </ul>
                          )}
                        </footer>
                      </div>
                    </StyledProject>
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
        </ul>

        <button className="more-button" onClick={() => setShowMore(!showMore)}>
          SHOW {showMore ? 'LESS' : 'MORE'}
        </button>
      </StyledProjectsSection>
    </section>
  );
};

export default Blog;
