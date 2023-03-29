import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import Countdown from '../component/Countdown';
import Question from '../component/Question';
import Second from '../component/Second';
import { AppBarStyled, BottomBarStyled, BasicBtn } from '../assets/css/styled';

const QuizDetail = () => {
  const { state } = useLocation();
  let [start, setStart] = useState(false);
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    getQuestionList();
  }, []);

  const getQuestionList = async () => {
    try {
      const getData = await axios({
        method: 'get',
        url: `https://qualson-test.vercel.app/api/test/${state.quizId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(getData.data.data.content);
      if (getData.data !== null) {
        setQuestionList(getData.data.data.content);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const expiredTime = () => {
    console.log('test');
    //setIsActive(false);
  };
  return (
    <QuizDetailStyled>
      <Countdown setStart={setStart} />

      <AppBarStyled>
        <h2 className='page-tit'>테스트</h2>
        <button type='button' className='btn btn-close'>
          <span className='blind'>닫기</span>
        </button>
      </AppBarStyled>

      <div className='answer-counter'>
        <ul className='counter-list'>
          <li className='correct'></li>
          <li className='incorrect'></li>
          <li className='now'></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className='counter-num'>
          <span>3</span>/<span>7</span>
        </div>
      </div>

      <Question />

      <BottomBarStyled>
        <div className='time-area'>
          <p className='rest-txt'>남은 시간</p>
          <p className='rest-time'>
            {start ? (
              <Second
                second={45}
                expiredTime={expiredTime}
                type={'timer'}
                start={start}
              />
            ) : (
              '45'
            )}
            초
          </p>
        </div>
        <div className='btn-area'>
          <BasicBtn>
            <span>다 풀었어요</span>
          </BasicBtn>
        </div>
      </BottomBarStyled>
    </QuizDetailStyled>
  );
};

export default QuizDetail;

const QuizDetailStyled = styled.div`
  .answer-counter {
    padding: 0 16px;
    .counter-list {
      display: flex;
      li {
        width: 100%;
        height: 4px;
        border-radius: 4px;
        background: #ebedef;
      }
      li + li {
        margin-left: 3px;
      }
      li.correct {
        background: #59dc94;
      }
      li.incorrect {
        background: #ff414d;
      }
      li.now {
        background: #8c8e91;
      }
    }
    .counter-num {
      margin-top: 4px;
      text-align: right;
      font-size: 14px;
      line-height: 20px;
      text-align: right;
      color: #64696e;
    }
  }
`;
