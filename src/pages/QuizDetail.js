import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import Countdown from '../component/Countdown';
import Second from '../component/Second';
import { AppBarStyled, BottomBarStyled } from '../assets/css/styled';

const QuizDetail = () => {
  const { state } = useLocation();

  const expiredTime = () => {
    console.log('test');
    //setIsActive(false);
  };
  return (
    <QuizDetailStyled>
      <Countdown />

      <AppBarStyled>
        <h2 className='page-tit'>테스트</h2>
        <button type='button' className='btn btn-close'>
          <span className='blind'>닫기</span>
        </button>
      </AppBarStyled>

      <BottomBarStyled>
        <div className='time-area'>
          <p className='rest-txt'>남은 시간</p>
          <p className='rest-time'>
            <Second second={3} expiredTime={expiredTime} type={'timer'} /> 초
          </p>
        </div>
      </BottomBarStyled>
    </QuizDetailStyled>
  );
};

export default QuizDetail;

const QuizDetailStyled = styled.div``;
