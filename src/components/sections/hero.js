import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding-left: 2%;
  padding-right: 2%;
  h1 {
    margin: 0 0 6px 0px;
    color: var(--black);
    font-family: var(--font-serif);
    font-size: clamp(var(--fz-xl), 7vw, var(--fz-xxl));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }
  h2 {
  }

  h3 {
    margin-top: 15px;
    margin-bottom: 5px;
    color: black;
    letter-spacing: -2px;
    font-family: var(--font-serif);
    font-weight: 300;
    line-height: 0.85;
  }

  p {
    margin: 0px 8px 0;
    max-width: 460px;
    font-size: 14px;
    text-transform: uppercase;
    word-spacing: 1px;
    font-weight: 300;
    letter-spacing: 0.5px;
  }
  .notice {
    font-size: 10px;
    color: #b3a58b;
    text-indent: 110px;
  }

  .hero-link {
    ${({ theme }) => theme.mixins.bigButton};
    background: var(--red);
    margin-top: 20px;
    color: var(--greige);
    font-weight: 500;
    border: 1px solid var(--red);
    font-size: 22px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Celine</h2>;
  const three = <p>Engineer / Scientist / Artist</p>;
  const four = <h3 className="medium-heading">I like to create solutions that empower others.</h3>;
  const five = (
    <a href="https://www.celinenicolas.com/" className="hero-link">
      ASK ME ANYTHING&nbsp;→
    </a>
  );
  const six = (
    <p className="notice">
      <sup></sup>
    </p>
  );
  const items = [one, two, three, four, five, six];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
