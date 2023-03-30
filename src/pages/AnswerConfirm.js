import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { solveQuiz } from '../store/reducers/quiz';

import CounterBar from '../component/CounterBar';
import { AppBarStyled, BottomBarStyled, BasicBtn } from '../assets/css/styled';

import imgCorrect from '../assets/images/img-correct.png';
import imgWrong from '../assets/images/img-wrong.png';

const AnswerCorrect = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizNum = useSelector((state) => state.QuizReducer.quizNum);
  const curQuizId = useSelector((state) => state.QuizReducer.curQuizId);
  const answerList = useSelector((state) => state.QuizReducer.answerList);

  answerList.splice(quizNum - 1, 1, state.correctYN ? 'correct' : 'incorrect');

  const goNext = () => {
    dispatch(solveQuiz(quizNum + 1, curQuizId, answerList, false));
    navigate('/quiz');
  };
  return (
    <AnswerCorrectStyled>
      <AppBarStyled>
        <h2 className='page-tit'>테스트</h2>
        <button type='button' className='btn btn-close'>
          <span className='blind'>닫기</span>
        </button>
      </AppBarStyled>

      <CounterBar />
      <div className='confirm-area'>
        {state.correctYN ? (
          <div className='correct-area'>
            <div className='img'>
              <img src={imgCorrect} alt='' />
            </div>
            <p className='txt'>
              <span>정답</span>이에요!
            </p>
          </div>
        ) : (
          <div className='wrong-area'>
            <div className='img'>
              <img src={imgWrong} alt='' />
            </div>
            <p className='txt'>
              <span>오답</span>이에요
            </p>
          </div>
        )}
      </div>

      <BottomBarStyled>
        <div className='btn-area only-one'>
          {quizNum === answerList.length ? (
            <BasicBtn>
              <span>결과 확인하기</span>
            </BasicBtn>
          ) : (
            <BasicBtn onClick={goNext}>
              <span>다음 문제</span>
            </BasicBtn>
          )}
        </div>
      </BottomBarStyled>
    </AnswerCorrectStyled>
  );
};

export default AnswerCorrect;

const AnswerCorrectStyled = styled.div`
  .confirm-area {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 150px);
    .img {
    }
    .txt {
      margin-top: 35px;
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      text-align: center;
    }
    .correct-area .txt span {
      color: #00d37a;
    }
    .wrong-area .txt span {
      color: #ff414d;
    }
  }
`;
