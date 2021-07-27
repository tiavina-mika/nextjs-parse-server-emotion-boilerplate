import { css, Global } from '@emotion/react';

const breakpoints = [576, 768, 992, 1200];

export const media = {
  min: breakpoints.map((bp) => `@media (min-width: ${bp}px)`),
  max: breakpoints.map((bp) => `@media (max-width: ${bp}px)`),
};

const getGlobalStyles = () => css`
      html,
      body {
        background: #f2f2f2;
        font-family: Lato, Regular, Helvetica, Arial, sans-serif;
        font-size: 16px;
        margin: 0;
        color: #191919;
      }
      * {
        box-sizing: border-box;
      }
      .flexRow {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        flex-wrap: wrap;
      }
      .flexColumn {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-wrap: nowrap;
      }
      .flexCenter {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
      }
      .flexStretch {
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
      .stretch {
        align-items: stretch;
      }
      .alignCenter {
        align-items: center;
      }
      .flexStart {
        align-items: flex-start;
      }
      .flexEnd {
        align-items: flex-end;
      }
      .spaceBetween {
        justify-content: space-between;
      }
      .spaceAround {
        justify-content: space-around;
      }
      .justifyStart {
        justify-content: flex-start;
      }
      .justifyEnd {
        justify-content: flex-end;
      }
      .justifyCenter {
        justify-content: center;
      }
      .stretchSelf {
        align-self: stretch;
      }
      .flexEndSelf {
        align-self: flex-end;
      }
      .centerSelf {
        align-self: center;
      }
      .flex1 {
        flex: 1;
      }
      .wrap {
        flex-wrap: wrap;
      }
      .nowrap {
        flex-wrap: nowrap;
      }
      .shrink0 {
        flex-shrink: 0;
      }
      .shrink1 {
        flex-shrink: 1;
      }

      .flexItem {
        padding: 10px;
      }
      /*------------------*/

      .textCenter {
        text-align: center;
      }

      .errorColor {
        color: #ec554f;
      }
      .ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .gridBorder {
        border-right: 1px solid #e2e2e2;
        border-bottom: 1px solid #e2e2e2;
      }
      .width100 {
        width: 100%;
      }
      .height100 {
        height: 100%;
      }
      .pointer {
        cursor: pointer;
      }
      .overflowHidden {
        overflow: hidden;
      }
      .overflowAuto {
        overflow: auto;
      }
      .positionRelative {
        position: relative;
      }
      .overParent {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .floatRight {
        float: right;
      }

      .hidden {
        opacity: 0;
      }
      .visible {
        opacity: 1;
      }
      .transition300ms {
        transition: all 300ms ease-in-out;
      }
      .m-r-5 {
        margin-right: 5px;
      }
      .m-r-8 {
        margin-right: 8px;
      }
      .m-r-10 {
        margin-right: 10px;
      }
      .m-r-15 {
        margin-right: 15px;
      }
      .m-r-20 {
        margin-right: 20px;
      }
      .m-r-25 {
        margin-right: 25px;
      }
      .m-t-10 {
        margin-top: 10px;
      }
      .m-t-15 {
        margin-top: 15px;
      }
      .m-t-20 {
        margin-top: 20px;
      }
      .m-t-25 {
        margin-top: 25px;
      }
      .m-t-50 {
        margin-top: 50px;
      }
      .m-l-5 {
        margin-left: 5px;
      }
      .m-l-8 {
        margin-left: 8px;
      }
      .m-l-10 {
        margin-left: 10px;
      }
      .m-l-15 {
        margin-left: 15px;
      }
      .m-l-20 {
        margin-left: 20px;
      }
      .m-l-25 {
        margin-left: 25px;
      }
      .m-b-3 {
        margin-bottom: 3px;
      }
      .m-b-5 {
        margin-bottom: 5px;
      }
      .m-b-8 {
        margin-bottom: 8px;
      }
      .m-b-10 {
        margin-bottom: 10px;
      }
      .m-b-15 {
        margin-bottom: 15px;
      }
      .m-b-25 {
        margin-bottom: 25px;
      }
      .m-t-0 {
        margin-top: 0;
      }
      .title12 {
        font-size: 12px;
      }
      .title14 {
        font-size: 14px;
      }
      .title18 {
        font-size: 18px;
      }
      .title22 {
        font-size: 22px;
      }
      .title28 {
        font-size: 28px;
      }
      .title38 {
        font-size: 38px;
      }
      .boxSizing {
        box-sizing: initial !important;
      }
      .r7 {
        border-radius: 7px;
      }
    `;

export const globalStyles = <Global styles={getGlobalStyles()} />;
