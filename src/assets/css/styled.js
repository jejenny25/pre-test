import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import icoClose from '../images/ico-close.png';

export const GlobalStyle = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video, button {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
  font-family: 'Spoqa Han Sans Neo', sans-serif;
	vertical-align: baseline;
  box-sizing: border-box;
}

html {
font-size: 62.5%; 
}


/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
	color:#000;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

a {
    text-decoration: none;
    color: inherit;
}

button {
    background-color:transparent; 
    cursor:pointer;
    box-sizing:border-box; 
    outline: 0;
    border:0;
		text-align:left;
}

input {box-sizing:border-box;}
input[type='checkbox'],input[type='radio'],select {appearance:none; -webkit-appearance:none; -moz-appearance:none; -o-appearance:none; outline: 0; box-sizing:border-box;}
select::-ms-expand {display:none;}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.btn .blind {
	display: block;
  position: absolute;
  left: -9999px;
  top: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
`;

export const AppBarStyled = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 19px 16px;
  width: 100%;
  height: 64px;
  background: #fff;
  .page-tit {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #16181b;
  }
  .btn-close {
    position: absolute;
    width: 16px;
    height: 16px;
    top: calc(50% - 8px);
    right: 20px;
    background: url(${icoClose});
  }
`;

export const BottomBarStyled = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 12px 20px;
  border-top: 1px solid #ebedef;
  & > div {
    width: 50%;
  }
  .time-area {
    display: flex;
    align-items: center;
    .rest-txt {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #16181b;
    }
    .rest-time {
      margin-left: 12px;
      font-weight: 700;
      font-size: 28px;
      line-height: 40px;
      text-align: right;
      color: #16181b;
    }
  }
  .btn-area.only-one {
    width: 100%;
  }
`;

export const BasicBtn = styled.button`
  :disabled {
    background: #ebedef;
    color: #d2d8e1;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  background: #00d37a;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
`;
