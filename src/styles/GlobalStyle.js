import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';
import variables from './variables';
import TransitionStyles from './TransitionStyles';
import PrismStyles from './PrismStyles';

const GlobalStyle = createGlobalStyle`
  ${fonts};
  ${variables};

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: inherit;
    color: inherit;
  }

  /* Provide basic, default focus styles.*/
  :focus {
    outline: 2px dashed var(--green);
    outline-offset: 3px;
  }

  /*
  Remove default focus styles for mouse users ONLY if
  :focus-visible is supported on this platform.
*/
:focus:not(:focus-visible) {
  outline: none;
  outline-offset: 0px;
}

/*
    Optionally: If :focus-visible is supported on this
    platform, provide enhanced focus styles for keyboard
    focus.
  */
  :focus-visible {
    outline: 2px dashed var(--green);
    outline-offset: 3px;
  }
  /* Scrollbar Styles */
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--dark-slate) var(--navy);
  }
  body::-webkit-scrollbar {
    width: 12px;
  }
  body::-webkit-scrollbar-track {
    background: var(--navy);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--dark-slate);
    border: 3px solid var(--navy);
    border-radius: 10px;
  }
  .progress {
    background-color: var(--dark-greige);
    height: var(--height);
    overflow: hidden;
    padding: calc(1px * var(--inset));
    width: calc(1px * var(--width));
    position:fixed;
  }
  .bar {
    background-color: var(--red);
    height: 100%;
    transform-origin: 0 0;
    transform: scaleY(var(--progress));
    width: 100%;
  }  

  body {

    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: var(--greige);
    color: var(--black);
    font-family: var(--font-serif);
    font-size: var(--fz-xl);
    line-height: 1.3;


    @media (max-width: 480px) {
      font-size: var(--fz-lg);
    }

    &.hidden {
      overflow: hidden;
    }

    &.blur {
      overflow: hidden;

      header {
        background-color: transparent;
      }

      #content > * {
        filter: blur(5px) brightness(0.7);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }

    }
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }


  main {
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;
    padding: 40px 100px;

    @media (max-width: 1080px) {
      padding: 40px 80px;
    }
    @media (max-width: 768px) {
      padding: 150px 70px;
    }
    @media (max-width: 480px) {
      padding: 125px 15px;
    }

    &.fillHeight {
      padding: 0 100px;

      @media (max-width: 1080px) {
        padding: 0 70px;
      }
      @media (max-width: 768px) {
        padding: 0 40px;
      }
      @media (max-width: 480px) {
        padding: 0 20px;
      }
    }
  }

  section {
    margin: 0 auto;
    padding: 15px 50px;
    max-width: 950px;

    @media (max-width: 768px) {
      padding: 10px 0;
    }

    @media (max-width: 480px) {
      padding: 10px 0;
    }
  }

  h1,
  h2 {
    font-family: var(--font-serif);
    font-style: oblique;
    color: var(--black);
    font-size: clamp(var(--fz-lg), 5vw, var(--fz-xl));
  }
  h3,
  h4,
  h5,
  h6 {
    margin: 0 0 10px 0;
    font-weight: 600;
    color: var(--black);
    line-height: 1.1;
  }

  .big-heading {
    margin: 0;
    font-size: clamp(40px, 7vw, 100px);
    line-height:1.1;
  }

  .medium-heading {
    margin: 0;
    font-size: clamp(30px, 5vw, 70px);
    line-height:1.1;
  }

  .numbered-heading {
    display: flex;
    align-items: center;
    position: relative;
    margin: 10px 0 15px;
    width: 100%;
    font-size: clamp(26px, 5vw, var(--fz-heading));
    white-space: nowrap;

    &:before {
      position: relative;
      bottom: 4px;
      counter-increment: section;
      content: '0' counter(section) '.';
      margin-right: 10px;
      color: var(--black);
      font-family: var(--font-serif);
      font-size: clamp(var(--fz-md), 3vw, var(--fz-xl));
      font-weight: 400;

      @media (max-width: 480px) {
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }

    &:after {
      content: '';
      display: block;
      position: relative;
      top: -5px;
      width: 300px;
      height: 1px;
      margin-left: 20px;
      background-color: var(--lightest-navy);

      @media (max-width: 1080px) {
        width: 200px;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
      @media (max-width: 600px) {
        margin-left: 10px;
      }
    }
  }

  img,
  svg,
  .gatsby-image-wrapper {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;

    &.feather {
      fill: none;
    }
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    cursor: pointer;

    &:hover,
    &:focus {
      color: var(--black);
    }

    &.inline-link {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;
  }

  input, textarea {
    border-radius: 0;
    outline: 0;

    &:focus {
      outline: 0;
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 5px 0;
    font-family: var(--font-sans);
    word-spacing:1px;
    font-weight: 300;
    letter-spacing:0.4px;

g
    &:last-child,
    &:last-of-type {
      margin: 0;
    }

    & > a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    & > code {
      background-color: var(--light-navy);
      color: var(--white);
      font-size: var(--fz-sm);
      border-radius: var(--border-radius);
      padding: 0.3em 0.5em;
    }
  }

  ul {
    &.fancy-list {
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: var(--fz-lg);
      li {
        position: relative;
        padding-left: 30px;
        margin-bottom: 10px;
        &:before {
          content: '▸';
          position: absolute;
          left: 0;
          color: black;
        }
      }
    }
  }

  blockquote {
    border-left-color: black;
    border-left-style: solid;
    border-left-width: 1px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 1.5rem;

    p {
      font-style: italic;
      font-size: 24px;
    }
  }

  hr {
    background-color: var(--lightest-navy);
    height: 1px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: 1rem;
  }

  code {
    font-family:  var(--font-mono);
    font-size: var(--fz-md);
  }

  #logo {
    color: black;
  }

  .overline {
    color: black;
    font-family:  var(--font-sans);
    font-size: var(--fz-md);
    font-weight: 400;
  }

  .subtitle {
    color: black;
    margin: 0 0 20px 0;
    font-size: var(--fz-md);
    font-family:  var(--font-serif);
    font-weight: 400;
    line-height: 1.5;
    @media (max-width: 1080px) {
      font-size: var(--fz-sm);
    }
    @media (max-width: 768px) {
      font-size: var(--fz-xs);
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      line-height: 1.5;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    color: black;

    .arrow {
      display: block;
      margin-right: 10px;
      padding-top: 4px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
      font-family: var(--font-sans);
      font-size: var(--fz-sm);
      font-weight: 600;
      line-height: 1.5;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }
  .footer {
    a {
      font-family: var(--font-sans);
    }
  }

  ${TransitionStyles};

  ${PrismStyles};
`;

export default GlobalStyle;
