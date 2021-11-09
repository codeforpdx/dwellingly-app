import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Icon.scss';

/**
 * =======================================
 * LIST OF ICONS
 * =======================================
 *   1. archive
 *   2. arrowLeft
 *   3. arrowRight
 *   4. asterisk
 *   5. building
 *   6. calendar
 *   7. checkbox
 *   8. close
 *   9. comment
 *  10. commentOutline
 *  11. flag
 *  12. flagOutline
 *  13. gear
 *  14. heart
 *  15. heartOutline
 *  16. menu
 *  17. notebookOutline
 *  18. pencil
 *  19. phone
 *  20. plus
 *  21. search
 *  22. ticketOutline
 *  23. userOutline
 *  24. userOutlineNoBottom
 *  25. users
 */

class Icon extends Component {
  static archive() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M37.2 18h-25c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h24.9c.8 0 1.5.7 1.5 1.5S38 18 37.2 18zm-2.7-6.4H14.9c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h19.6c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z" />
        <path d="M41.9 3.7a3.4 3.4 0 0 0-3.2-2.1H11.3c-1.4 0-2.6.8-3.2 2.1L0 23.4v23.8c0 1.1.9 2 2 2h46a2 2 0 0 0 2-2V23.4L41.9 3.7zM10.8 4.9c.1-.2.3-.3.4-.3h27.5c.2 0 .4.1.4.3l7.6 18.5H3.2l7.6-18.5zM36 35c-.9 1.1-4.4 4.7-10 5h-.8a15 15 0 0 1-10.9-5.1c-.5-.6-.4-1.4.1-1.9.6-.5 1.4-.4 1.9.1a12 12 0 0 0 9.4 4.1c4.5-.3 7.3-3.2 8.1-4.1.5-.6 1.4-.6 1.9-.2.7.7.8 1.5.3 2.1z" />
      </svg>
    );
  }

  static arrowLeft() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M38.8 49.6c-.5 0-1-.2-1.4-.5L8.9 25.4 37.3.5c.9-.8 2.3-.7 3.1.2.8.9.7 2.3-.2 3.1L15.7 25.3l24.5 20.4c.9.8 1.1 2.2.3 3.1-.4.5-1.1.8-1.7.8z" />
      </svg>
    );
  }

  static arrowRight() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M11.1 49.6c.5 0 1-.2 1.4-.5L41 25.4 12.6.5c-.9-.8-2.3-.7-3.1.2-.8 1-.7 2.4.2 3.2l24.5 21.5L9.7 45.7c-.9.8-1.1 2.2-.3 3.1.5.5 1.1.8 1.7.8z" />
      </svg>
    );
  }

  static asterisk() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M47.2 35.9l-2 3.5a4.1 4.1 0 0 1-5.6 1.5L31 36.1v9.8c0 2.2-1.9 4.1-4.1 4.1h-4.1a4.2 4.2 0 0 1-4.1-4.1v-9.8L10.2 41c-2 1.1-4.5.4-5.6-1.5L2.5 36c-1.1-2-.4-4.5 1.5-5.6l8.5-4.9-8.5-5a4.1 4.1 0 0 1-1.5-5.6l2.1-3.5c1.1-2 3.7-2.6 5.6-1.5l8.5 4.9V4.9c0-2.2 1.9-4.1 4.1-4.1h4.1C29.1.8 31 2.7 31 4.9v9.8l8.5-4.9c2-1.1 4.5-.4 5.6 1.5l2 3.5c1.1 2 .4 4.5-1.5 5.6l-8.5 4.9 8.5 4.9a4.2 4.2 0 0 1 1.6 5.7z" />
      </svg>
    );
  }

  static building() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M32.8 51h-2.5v-8.4c0-1.3-.5-2.6-1.5-3.5a5 5 0 0 0-8.5 3.5V51h-2.5v-8.4a7.5 7.5 0 1 1 15 0V51zM8.9 51H6.4V3.4c0-1.3 1-2.4 2.3-2.4h33.2c1.3 0 2.4 1.1 2.4 2.4v47.4h-2.5V3.5H8.9V51zm29.5-21.4H27.2V21h11.2v8.6zm-8.7-2.5h6.2v-3.6h-6.2v3.6zm-6.4 2.5H12.2V21h11.2v8.6zm-8.6-2.5h6.2v-3.6h-6.2v3.6zm23.7-10H27.2V8.5h11.2v8.6zm-8.7-2.5h6.2V11h-6.2v3.6zm-6.4 2.5H12.2V8.5h11.2v8.6zm-8.6-2.5h6.2V11h-6.2v3.6z" />
      </svg>
    );
  }

  static calendar() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M44.1.4H6a4.1 4.1 0 0 0-4.1 4.1V46c0 2.2 1.9 4 4.1 4h38.1c2.2 0 4.1-1.8 4.1-4.1V4.4c0-2.2-1.9-4-4.1-4zm2.1 45.5c0 1.1-.9 2.1-2.1 2.1H6c-1.1 0-2.1-.9-2.1-2.1V11.8h42.2v34.1zm0-36.1H3.9V4.4c0-1.1.9-2.1 2.1-2.1h38.1c1.1 0 2.1.9 2.1 2.1v5.4z" />
        <path d="M8.9 30.5h12.7v12.6H8.9z" />
      </svg>
    );
  }

  static checkbox() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M25 50a25 25 0 1 1 0-50 25 25 0 0 1 0 50zm0-48a23 23 0 1 0 0 46 23 23 0 0 0 0-46z" />
        <path d="M22.1 35.2l-8.1-8 1.4-1.4 6.7 6.6L38 16.5l1.4 1.4z" />
      </svg>
    );
  }

  static close() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M27.8 25L48.4 4.4c.8-.8.8-2 0-2.8a2 2 0 0 0-2.8 0L25 22.2 4.4 1.6a2 2 0 0 0-2.8 0 2 2 0 0 0 0 2.8L22.2 25 1.6 45.5a2 2 0 0 0 0 2.8c.4.4.9.6 1.4.6.5 0 1-.2 1.4-.6L25 27.8l20.6 20.6c.4.4.9.6 1.4.6.5 0 1-.2 1.4-.6.8-.8.8-2 0-2.8L27.8 25z" />
      </svg>
    );
  }

  static comment() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M49.8 43.5c-1.8-1.2-5.1-4-6.1-7.2 2.3-3.2 3.7-7.1 3.7-11.2 0-11.5-10.6-20.8-23.7-20.8S0 13.6 0 25.1 10.6 46 23.7 46a26 26 0 0 0 14.5-4.3c1.9 1.8 5.4 3.5 11.4 2.8.4-.1.6-.7.2-1zm-26.8-5a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8zm2-7.9h-3.9L20.2 13h5.7L25 30.6z" />
      </svg>
    );
  }

  static commentOutline() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M23.7 45.7c-13 0-23.7-9.4-23.7-21s10.7-21 23.7-21c13.1 0 23.7 9.4 23.7 21 0 3.9-1.2 7.6-3.4 10.9 1 2.7 4 5 5.3 5.9.5.3.7 1 .6 1.6-.1.6-.6 1.1-1.3 1.1-5.6.7-9.1-.8-11.1-2.4a25 25 0 0 1-13.8 3.9zm0-40c-12 0-21.7 8.5-21.7 19s9.8 19 21.7 19c4.9 0 9.5-1.4 13.3-4l.7-.4.6.5c2.1 1.9 5.1 2.8 8.8 2.6a15.7 15.7 0 0 1-5.2-6.6l-.1-.5.3-.4a17 17 0 0 0 3.3-10.1c.1-10.6-9.7-19.1-21.7-19.1zm24.5 37.4z" />
        <path d="M23.1 32.1a2.7 2.7 0 0 0-2.7 2.7c0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7c.1-1.5-1.2-2.7-2.7-2.7zM25 30l.9-16.9h-5.5l.8 16.9z" />
      </svg>
    );
  }

  static flag() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M43.4 31.3L28.9 18.5 43.2 3.8H9.3V0h-2v50h2V31.3h34.1z" />
      </svg>
    );
  }

  static flagOutline() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M44.4 31.3L29.9 18.5 44.2 3.8H10.3V0h-2v50h2V31.3h34.1zm-5-25.5L27 18.6l12.1 10.7H10.3V5.8h29.1z" />
      </svg>
    );
  }

  static gear() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M50 21.5v7.2c0 .3-.1.5-.3.7-.2.2-.4.4-.7.4l-6 .9c-.4 1.2-.8 2.2-1.3 3l3.5 4.5c.2.3.3.5.3.8 0 .3-.1.5-.3.7L42 43.2c-1.6 1.5-2.6 2.3-3.1 2.3-.3 0-.5-.1-.8-.3l-4.5-3.5c-1 .5-1.9.9-3 1.2-.3 3-.7 5-.9 6.1-.2.6-.5.9-1.2.9h-7.2c-.3 0-.6-.1-.8-.3-.2-.2-.4-.4-.4-.7l-.9-6c-1.1-.3-2-.7-2.9-1.2l-4.6 3.5c-.2.2-.5.3-.8.3a50.7 50.7 0 0 1-6.2-5.9c-.2-.2-.2-.5-.2-.7 0-.3.1-.5.3-.7L6.5 36l1.8-2.3c-.6-1.1-1-2.2-1.3-3.2l-6-.9c-.3 0-.5-.2-.7-.4s-.3-.4-.3-.7v-7.2c0-.3.1-.5.3-.7.2-.2.4-.4.6-.4l6.1-.9c.3-1 .7-2 1.3-3l-3.5-4.5c-.2-.3-.3-.5-.3-.8 0-.2.1-.5.3-.7.6-.8 1.6-1.9 3.2-3.5s2.6-2.3 3.1-2.3c.3 0 .6.1.8.3l4.5 3.5c1-.5 1.9-.9 3-1.2.3-3 .7-5 .9-6.1.1-.7.5-1 1.1-1h7.2c.3 0 .6.1.8.3.2.2.4.4.4.7l.9 6c1.1.3 2 .7 2.9 1.2l4.6-3.5c.2-.2.5-.3.8-.3.3 0 .6.1.8.3 2.8 2.6 4.6 4.4 5.4 5.5.2.2.2.4.2.7 0 .3-.1.5-.3.7l-1.7 2.2-1.8 2.3c.6 1.1 1 2.1 1.3 3.2l6 .9c.3 0 .5.2.7.4.3.3.4.6.4.9zm-19.1 9.4c1.6-1.6 2.4-3.6 2.4-5.9s-.8-4.3-2.4-5.9a8 8 0 0 0-5.9-2.4c-2.3 0-4.3.8-5.9 2.4s-2.4 3.6-2.4 5.9.8 4.3 2.4 5.9a8 8 0 0 0 5.9 2.4 8 8 0 0 0 5.9-2.4z" />
      </svg>
    );
  }

  static google() {
    return (
      <svg height="20" width="19" xmlns="http://www.w3.org/2000/svg">
        <image
          fill="none"
          height="20"
          transform="translate(-599 -649)"
          width="19"
          x="599"
          xlinkHref="data:image/png;base64,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"
          y="649"
        />
      </svg>
    );
  }

  static heart() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M46.1 26l-2 2-19 19L4 26A13.6 13.6 0 0 1 4 6.9a13.6 13.6 0 0 1 19.1 0l2 2 2-2a13.6 13.6 0 0 1 19.1 0 13.7 13.7 0 0 1-.1 19.1z" />
      </svg>
    );
  }

  static heartOutline() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M25 47.3L4.1 26.4a14 14 0 0 1 0-19.7 14 14 0 0 1 19.7 0L25 7.8l1.2-1.2a14 14 0 0 1 19.7 0 14 14 0 0 1 0 19.7L25 47.3zM13.9 4.6c-3.1 0-6.1 1.2-8.5 3.5a11.9 11.9 0 0 0 0 16.9L25 44.5 44.5 25a11.9 11.9 0 0 0 0-16.9 11.9 11.9 0 0 0-16.9 0L25 10.7l-2.6-2.6a11.6 11.6 0 0 0-8.5-3.5z" />
      </svg>
    );
  }

  static logo() {
    return (
      <svg
        height="92"
        viewBox="0 0 85 92"
        width="85"
        xmlns="http://www.w3.org/2000/svg">
        <mask id="a" fill="#fff">
          <path d="m0 0h85v92h-85z" fill="#fff" fillRule="evenodd" />
        </mask>
        <path
          d="m59.5542553 25.8321569-17.0542553-11.9058824-17.0524468 11.9058824-2.0635106-2.9584314 19.1159574-13.34901962 19.117766 13.34901962zm0 16.2352941-17.0542553-11.9058824-17.0524468 11.9058824-2.0635106-2.9584314 19.1159574-13.3490196 19.117766 13.3490196zm1.0308511 37.305098-8.1382979 3.6078432v-16.2352942h-19.893617v16.2352942l-9.0425532-3.6078432v-25.2549019l18.9893617-13.5294118 18.0851064 12.627451zm-22.606383 5.4117647h9.0425532v-12.627451h-9.0425532zm36.0815957-59.0423529c-1.9712765-2.0564706-4.179468-3.8964706-6.5829787-5.5380392l-24.0730851-20.2039216-25.1744681 19.734902c-1.8428723 1.2086274-3.3439361 3.2109804-4.9010638 4.852549l1.2297872-1.2266667c-7.16170209 7.36-14.5585106 18.8870588-14.5585106 28.9529412 0 21.919451 19.0255319 39.6862745 42.5 39.6862745 23.4762766 0 42.5-17.7668235 42.5-39.6862745 0-10.2101961-4.1414894-19.5364706-10.9396809-26.5717647z"
          fill="#4ca1ff"
          fillRule="evenodd"
          mask="url(#a)"
        />
      </svg>
    );
  }

  static menu() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M48.3 39.7H1.7C.8 39.7 0 39 0 38s.7-1.7 1.7-1.7h46.6c.9 0 1.7.7 1.7 1.7s-.7 1.7-1.7 1.7zm0-12.7H1.7C.8 27 0 26.2 0 25.3c0-.9.7-1.7 1.7-1.7h46.6c.9 0 1.7.7 1.7 1.7 0 .9-.7 1.7-1.7 1.7zm0-12.8H1.7c-.9 0-1.7-.7-1.7-1.7s.7-1.7 1.7-1.7h46.6c.9 0 1.7.7 1.7 1.7s-.7 1.7-1.7 1.7z" />
      </svg>
    );
  }

  static notebookOutline() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M38.9 50H6.4V0H39c5 0 9.1 4.1 9.1 9.1V41c-.1 4.9-4.2 9-9.2 9zm-28.5-4.1h28.5a5 5 0 0 0 5-5V9.1a5 5 0 0 0-5-5H10.4v41.8z" />
        <path d="M.5 9h16.2v4.1H.5zm0 9.3h16.2v4.1H.5zm0 18.6h16.2V41H.5zm0-9.3h16.2v4.1H.5z" />
      </svg>
    );
  }

  static pencil() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M42.9 17.2L12.4 47.7c-.6.6-1.4 1-2.3 1.1l-9 .9c-.4 0-.8-.3-.7-.7l.9-9c.1-.9.5-1.7 1.1-2.3L32.9 7.2l10 10zm1.5-1.5l-10-10 4.4-4.4c.5-.5 1.4-.5 1.9 0l8.1 8.1c.5.5.5 1.4 0 1.9l-4.4 4.4z" />
      </svg>
    );
  }

  static phone() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M49.5 42c-1.3 3-3.5 5.4-6.3 7-1.1.7-2.4.8-3.7.9-2.3.1-4.6-.2-6.8-.8-5-1.3-9.6-3.7-13.7-6.7A50.9 50.9 0 0 1 3.6 24.6a34.8 34.8 0 0 1-3.4-10c-.3-1.7-.3-3.4-.1-5 .1-1 .4-2 .9-2.8A15 15 0 0 1 8 .6C9.1 0 10.2 0 11.3.2l1 .5c.5.5 1 .9 1.4 1.5 2.3 3.4 4.1 7.1 5.2 11.1l.3 1.7c.1 1.4-.5 2.4-1.6 3.2-1 .8-2.2 1.1-3.4 1.3l-1.3.2c.2.4.3.8.6 1.1l1.9 2.5c3.7 4.2 7.7 8.2 11.9 11.8l2 1.5c.2.2.5.2.9.4l.3-1.7c.2-.8.4-1.6.8-2.4.9-1.9 2.5-2.6 4.6-2.2a25 25 0 0 1 5.8 2c2.3 1 4.5 2.1 6.5 3.6l.2.1c1.8 1.7 2 3.6 1.1 5.6z" />
      </svg>
    );
  }

  static plus() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M48.1 23.1H26.9V1.9a1.9 1.9 0 1 0-3.8 0v21.3H1.9C.8 23.1 0 24 0 25s.8 1.9 1.9 1.9h21.3v21.3c0 1 .8 1.9 1.9 1.9s1.9-.8 1.9-1.9V26.9h21.3c1 0 1.9-.8 1.9-1.9s-1-1.9-2.1-1.9z" />
      </svg>
    );
  }

  static search() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M50 46.3L34.5 30.7a19.2 19.2 0 1 0-3.7 3.8L46.1 50l3.9-3.7zM3.4 19.2a15.8 15.8 0 0 1 31.6 0 15.8 15.8 0 0 1-31.6 0z" />
      </svg>
    );
  }

  static ticketOutline() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path
          d="M46.5 18v-5.1c0-.6-.5-1.2-1.2-1.2h-9v1.5h-3v-1.5H4.2c-.7 0-1.2.5-1.2 1.2V18c2.9.7 5.1 3.3 5.1 6.4S5.9 30 3 30.7v5.1c0 .7.5 1.2 1.2 1.2h29.2v-2.7h3V37h9c.6 0 1.2-.5 1.2-1.2v-5.1c-2.9-.7-5.1-3.3-5.1-6.4s2.1-5.7 5-6.3zM36.4 31.3h-3v-3h3v3zm0-6.1h-3v-3h3v3zm0-6h-3v-3h3v3z"
          fill="none"
        />
        <path d="M48 20.8h1.5v-7.9c0-2.3-1.9-4.2-4.2-4.2H4.2A4.2 4.2 0 0 0 0 12.9v7.9h1.5c2 0 3.5 1.6 3.5 3.5s-1.6 3.5-3.5 3.5H0v7.9C0 38.1 1.9 40 4.2 40h41.1c2.3 0 4.2-1.9 4.2-4.2v-7.9H48c-2 0-3.5-1.6-3.5-3.5s1.6-3.6 3.5-3.6zm-1.5 9.9v5.1c0 .6-.5 1.2-1.2 1.2h-9v-2.7h-3V37H4.2c-.7 0-1.2-.5-1.2-1.2v-5.1c2.9-.7 5.1-3.3 5.1-6.4S5.9 18.6 3 18v-5.1c0-.7.5-1.2 1.2-1.2h29.2v1.5h3v-1.5h9c.6 0 1.2.5 1.2 1.2V18c-2.9.7-5.1 3.3-5.1 6.4s2.1 5.6 5 6.3z" />
        <path d="M33.4 16.2h3v3h-3zm0 6h3v3h-3zm0 6.1h3v3h-3z" />
      </svg>
    );
  }

  static userOutline() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M40.5 49H10.8a3.5 3.5 0 0 1-3.5-3.5v-6.9c0-3.6 2.3-6.9 5.8-8h.2l1.8-.4a8.6 8.6 0 0 0 5.6-5.2 13 13 0 0 1-5.9-11.2c0-7 4.9-12.6 10.9-12.6s10.9 5.7 10.9 12.6c0 4.8-2.3 9.1-5.9 11.2a8.6 8.6 0 0 0 5.6 5.2l1.8.4h.2a8.6 8.6 0 0 1 5.8 8v6.9a3.7 3.7 0 0 1-3.6 3.5zM13.6 32.5a6.5 6.5 0 0 0-4.3 6.1v6.9c0 .8.7 1.5 1.5 1.5h29.7c.8 0 1.5-.7 1.5-1.5v-6.9c0-2.7-1.7-5.2-4.3-6.1l-2.1-.4a10.2 10.2 0 0 1-7.2-7.3l-.2-.8.7-.3c3.4-1.6 5.6-5.5 5.6-9.8 0-5.8-4-10.6-8.9-10.6s-8.9 4.8-8.9 10.6c0 4.3 2.2 8.2 5.6 9.8l.7.3-.2.8a9.9 9.9 0 0 1-1.5 3.3 9.7 9.7 0 0 1-5.7 4l-2 .4z" />
      </svg>
    );
  }

  static userOutlineNoBottom() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M44 49.8h-2v-9.9c0-2.9-1.8-5.5-4.6-6.5l-2.2-.4c-2.5-.7-4.5-2.2-6-4.2-.7-1-1.3-2.2-1.6-3.5l-.2-.8.7-.3c3.6-1.7 5.9-5.8 5.9-10.5 0-6.2-4.2-11.3-9.4-11.3s-9.5 5.1-9.5 11.3c0 4.6 2.3 8.7 5.9 10.5l.7.3-.2.8a8.6 8.6 0 0 1-1.6 3.5 11.4 11.4 0 0 1-8.2 4.7A7 7 0 0 0 7.1 40v9.9h-2V40c0-3.8 2.4-7.2 6-8.4h.2l2-.4a8.8 8.8 0 0 0 4.9-3.5c.4-.6.8-1.3 1-2.1a13.7 13.7 0 0 1-6.3-11.9C12.9 6.4 18 .4 24.4.4s11.4 6 11.4 13.3c0 5.1-2.4 9.6-6.3 11.9.2.8.6 1.4 1 2.1a9.1 9.1 0 0 0 4.9 3.5l2 .4h.2c3.6 1.2 6 4.6 6 8.4v9.8z" />
      </svg>
    );
  }

  static users() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
        <path d="M50 34.5a6.9 6.9 0 0 0-2.8-2l-1.8-.3a8.3 8.3 0 0 1-5.7-5.8c3.1-1.5 5.3-5.1 5.3-9.4 0-5.6-3.9-10.1-8.6-10.1-4.8 0-8.6 4.5-8.6 10.1 0 4.2 2.2 7.8 5.3 9.4-.3 1.2-.7 2-1.2 2.6a7.5 7.5 0 0 1-3.3 2.7l-1.1-.5-2-.4a9.7 9.7 0 0 1-5.2-3.6c-.5-.7-1-1.7-1.3-3 3.6-1.7 6.1-5.9 6.1-10.7C25.2 7.2 20.8 2 15.3 2 9.9 2 5.5 7.2 5.5 13.6c0 4.8 2.5 9 6.1 10.7a8.4 8.4 0 0 1-1.3 3 9.2 9.2 0 0 1-5.2 3.6l-2 .4a7.9 7.9 0 0 0-3.1 2 29.4 29.4 0 0 0 50 1.2z" />
      </svg>
    );
  }

  render() {
    const { icon, classNames } = this.props;
    const SvgContent = Icon[`${icon}`];
    return (
      <span className={`icon icon--${icon}${classNames}`}>
        <SvgContent />
      </span>
    );
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
  classNames: PropTypes.string
};

Icon.defaultProps = {
  icon: '',
  classNames: ''
};

export default Icon;
