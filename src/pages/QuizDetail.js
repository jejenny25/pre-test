import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setQuizitem } from '../store/reducers/quiz';

import Countdown from '../component/Countdown';
import CounterBar from '../component/CounterBar';
import Question from '../component/Question';
import Second from '../component/Second';
import { AppBarStyled, BottomBarStyled, BasicBtn } from '../assets/css/styled';

const QuizDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [start, setStart] = useState(false);
  const curQuizId = state.quizId;
  const [questionList, setQuestionList] = useState([]);
  const [questionCnt, setQuestionCnt] = useState(1);
  const [answerList, setAnswerList] = useState([]);
  const quizNum = useSelector((state) => state.QuizReducer.quizNum);

  dispatch(setQuizitem(curQuizId, answerList));

  useEffect(() => {
    getQuestionList();
  }, []);

  const getQuestionList = async () => {
    try {
      const getData = await axios({
        method: 'get',
        url: `https://qualson-test.vercel.app/api/test/${curQuizId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //console.log(getData.data.data.content);
      if (getData.data !== null) {
        setQuestionList(Object.values(getData.data.data.content));
        setQuestionCnt(getData.data.data.content.length);
        setAnswerList(
          Array.from({ length: getData.data.data.content.length }, (v) => 'yet')
        );
      }
    } catch (err) {
      alert('api 연결 문제');
      navigate(-1);
      console.log(err);
    }
  };

  const expiredTime = () => {
    console.log('시간만료되었을 때');
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

      {answerList.length > 0 && <CounterBar />}

      {questionList.length > 0 && (
        <Question question={questionList[quizNum - 1]} />
      )}

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

const QuizDetailStyled = styled.div``;
