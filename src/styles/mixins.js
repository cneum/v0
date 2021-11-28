import { css } from 'styled-components';

const button = css`
  color: var(--black);
  background-color: transparent;
  border: 1px solid var(--black);
  border-radius: var(--border-radius);
  padding: 0.8rem 1rem;
  font-size: var(--fz-sm);
  font-family: var(--font-sans);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);

  &:hover,
  &:focus,
  &:active {
    background-color: var(--red);
    outline: none;
  }
  &:after {
    display: none !important;
  }
`;

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: var(--transition);
    cursor: pointer;
    &:hover,
    &:active,
    &:focus {
      color: black);
      outline: 0;
    }
  `,

  inlineLink: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: var(--transition);
    cursor: pointer;
    color: inherit;
    &:hover,
    &:focus,
    &:active {
      color: black;
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: black !important;
        transition: var(--transition);
      }
    }
    &:after {
      content: '';
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      bottom: 0.37em;
      background-color: black;
      transition: var(--transition);
      opacity: 0.5;
    }
  `,

  button,

  smallButton: css`
    color: black;
    background-color: transparent;
    padding: 0.3rem 0.5rem;
    font-size: 19px;
    font-family: var(--font-sans);
    line-height: 1;
    font-weight: 300;
    text-decoration: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover {
      color: black;
      border: 1px solid black;
      background-color: var(--red);
    }
    &:focus {
      color: black;
      border: 1px solid black;
    }
    &:active {
    }
    &:after {
      display: none !important;
    }
  `,

  bigButton: css`
    color: var(--red);
    background-color: white;
    padding: 0.3rem 0.3rem;
    font-size: 19px;
    font-family: var(--font-sans);
    font-weight: 300;
    line-height: 1;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: var(--transition);
    &:hover {
      color: black;
      border: 1px solid black;
      background-color: var(--red);
    }
    &:focus,
    &:active {
    }
    &:after {
      display: none !important;
    }
  `,

  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    transition: var(--transition);

    &:hover,
    &:focus {
      box-shadow: 0 20px 30px -15px var(--navy-shadow);
    }
  `,

  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fz-xs);
    li {
      position: relative;
      padding-left: 25px;
      font-family: var(--font-serif);
      font-style: italic;
      font-size: var(--fz-sm);
      font-weight: 100;
      line-height: 1.7;
      &:before {
        content: '▸';
        position: absolute;
        font-size: 24px;
        left: 0;
        color: var(--red);
        line-height: 0.9;
      }
    }
  `,

  resetList: css`
    list-style: none;
    padding: 0;
    margin: 0;
  `,
};

export default mixins;
