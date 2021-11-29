import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email } from '@config';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;

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
    margin-bottom: 5px;
    color: black;
    letter-spacing: -2px;
    font-family: var(--font-serif);
    font-weight: 300;
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

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    background: var(--red);
    margin-top: 20px;
    color: black;
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
  const three = <h3 className="medium-heading">I like to solve problems.</h3>;
  const four = (
    <p>
      I'm a science enthusiast, serial tinkerer, and native New Yorker navigating life as if it were
      a pas de deux dance.
    </p>
  );
  const five = (
    <a href={`mailto:${email}`} className="email-link">
      Explore my workflows*
    </a>
  );
  const six = (
    <p className="notice">
      <sup>Under construction*</sup>
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
