import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestionList, setAnswerList } from '../store/reducers/quiz';

import Countdown from '../component/Countdown';
import CounterBar from '../component/CounterBar';
import Question from '../component/Question';
import Second from '../component/Second';
import { AppBarStyled, BottomBarStyled, BasicBtn } from '../assets/css/styled';

const QuizDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [start, setStart] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const isFirst = useSelector((state) => state.QuizReducer.isFirst);
  const curQuizId = useSelector((state) => state.QuizReducer.curQuizId);
  const quizNum = useSelector((state) => state.QuizReducer.quizNum);
  const questionList = useSelector((state) => state.QuizReducer.questionList);

  const chkRef = useRef({});

  useEffect(() => {
    if (isFirst) {
      getQuestionList();
    } else {
      setStart(true);
    }
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
        dispatch(setQuestionList(getData.data.data.content));
        dispatch(
          setAnswerList(
            Array.from(
              { length: getData.data.data.content.length },
              (v) => 'yet'
            )
          )
        );
      }
    } catch (err) {
      alert('api 연결 문제');
      navigate('/');
      console.log(err);
    }
  };

  const expiredTime = () => {
    // 시간 만료
    chkRef.current.chkWord();
  };
  return (
    <QuizDetailStyled>
      {isFirst ? (
        <Countdown setStart={setStart} questionCnt={questionList.length} />
      ) : (
        ''
      )}

      <AppBarStyled>
        <h2 className='page-tit'>테스트</h2>
        <button type='button' className='btn btn-close'>
          <span className='blind'>닫기</span>
        </button>
      </AppBarStyled>

      {questionList.length > 0 && <CounterBar />}
      {questionList.length > 0 && (
        <Question
          question={questionList[quizNum - 1]}
          ref={chkRef}
          setCanNext={setCanNext}
        />
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
          <BasicBtn
            disabled={canNext === false ? 'disabled' : ''}
            onClick={() => chkRef.current.chkWord()}
          >
            <span>다 풀었어요</span>
          </BasicBtn>
        </div>
      </BottomBarStyled>
    </QuizDetailStyled>
  );
};

export default QuizDetail;

const QuizDetailStyled = styled.div``;
