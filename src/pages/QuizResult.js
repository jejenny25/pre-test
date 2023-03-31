import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setHint, solveQuestion } from '../store/reducers/quiz.js';
import {
  AppBarStyled,
  BottomBarStyled,
  BasicBorderBtn,
  BasicBtn,
} from '../assets/css/styled';

import imgStampFail from '../assets/images/stamp-fail.png';
import imgStampGood from '../assets/images/stamp-good.png';
import imgStampPerfect from '../assets/images/stamp-success.png';
import imgStampWrong from '../assets/images/stamp-wrong.png';

import imgFail from '../assets/images/testresult-fail.png';

import imgGood1 from '../assets/images/testresult-good1.png';
import imgGood2 from '../assets/images/testresult-good2.png';
import imgGood3 from '../assets/images/testresult-good3.png';

import imgPerfect1 from '../assets/images/testresult-perfect1.png';
import imgPerfect2 from '../assets/images/testresult-perfect2.png';
import imgPerfect3 from '../assets/images/testresult-perfect3.png';

const QuizResult = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const curQuizId = useSelector((state) => state.QuizReducer.curQuizId);
  const answerList = useSelector((state) => state.QuizReducer.answerList);
  const correctNum = answerList.filter((v) => v === 'correct').length;
  const incorrectNum = answerList.filter((v) => v === 'incorrect').length;
  const [resultTxt, setResultTxt] = useState('');
  const imgGoodArr = [imgGood1, imgGood2, imgGood3];
  const imgPerfectArr = [imgPerfect1, imgPerfect2, imgPerfect3];
  const [img, setImg] = useState();
  const [imgStamp, setImgStamp] = useState();
  const [fontCol, setFontCol] = useState();

  const [record, setRecord] = useState(
    JSON.parse(localStorage.getItem('quizRecord'))
  );

  const [hasRecord, setHasRecord] = useState(false);
  const [solvedCnt, setSolvedCnt] = useState(1);

  useEffect(() => {
    // 3문제 이상 오답 시 실패, 2문제 이하의 오답이 있을 경우 성공입니다.
    if (answerList.length === correctNum) {
      setResultTxt('완벽. 모두 맞혔어요!');

      const randomIndex = Math.floor(Math.random() * imgPerfectArr.length);
      setImg(imgPerfectArr[randomIndex]);
      setImgStamp(imgStampPerfect);
      setFontCol('#0DB6FF');
    } else if (incorrectNum > 2) {
      setResultTxt('아쉬워요...\n다음에는 더 잘할 수 있을 거예요!');
      setImg(imgFail);
      setImgStamp(imgStampFail);
      setFontCol('#00D6C9');
    } else if (incorrectNum <= 2) {
      setResultTxt('좋아요. 멋진 점수에요!');
      const randomIndex = Math.floor(Math.random() * imgGoodArr.length);
      setImg(imgGoodArr[randomIndex]);
      setImgStamp(imgStampGood);
      setFontCol('#00D6C9');
    }

    // 해당 문제를 푼적이 있는지 체크
    if (record !== null) {
      const item = record.find((item) => item.solvedQuizId === curQuizId);
      if (item !== undefined) {
        // 풀었던 문제
        setHasRecord(true);
        setSolvedCnt(item.solvedCnt + 1);
        const tmp = record.map((item) =>
          item.solvedQuizId === curQuizId
            ? {
                ...item,
                solvedCnt: item.solvedCnt + 1,
                isPerfect: answerList.length === correctNum ? true : false,
              }
            : item
        );

        localStorage.setItem('quizRecord', JSON.stringify(tmp));
      } else {
        const newRecord = {
          solvedQuizId: curQuizId,
          solvedCnt: 1,
          isPerfect: answerList.length === correctNum ? true : false,
        };
        const temp = [...record, newRecord];
        localStorage.setItem('quizRecord', JSON.stringify(temp));
      }
    } else {
      const tempRecord = [
        {
          solvedQuizId: curQuizId,
          solvedCnt: 1,
          isPerfect: answerList.length === correctNum ? true : false,
        },
      ];
      localStorage.setItem('quizRecord', JSON.stringify(tempRecord));
    }
  }, []);

  const goList = () => {
    dispatch(solveQuestion(1, 0, [], true));
    dispatch(setHint(2));
    navigate('/');
  };

  const goQuizAgain = () => {
    dispatch(solveQuestion(1, curQuizId, [], true));
    dispatch(setHint(2));
    navigate('/quiz');
  };
  return (
    <QuizResultStyled fontCol={fontCol}>
      <AppBarStyled>
        <h2 className='page-tit'>테스트</h2>
        <button type='button' className='btn btn-close'>
          <span className='blind'>닫기</span>
        </button>
      </AppBarStyled>

      <div className='result-area'>
        <div className='result-img'>
          <img src={img} alt='' />
        </div>
        <div className='reult-txt'>
          <p>{resultTxt}</p>
        </div>
        <div className='stamp-area'>
          <ul className='stamp-list'>
            {answerList.map((item, idx) => (
              <li key={idx}>
                <img
                  src={item === 'correct' ? imgStamp : imgStampWrong}
                  alt=''
                />
              </li>
            ))}
          </ul>
        </div>
        <div className='score-area'>
          <span>{correctNum}</span>/<span>{answerList.length}</span>
        </div>
        {hasRecord ? (
          <div className='solve-cnt-area'>
            <p>{solvedCnt}번째 시도</p>
          </div>
        ) : (
          ''
        )}
      </div>
      <BottomBarStyled>
        {answerList.length === correctNum ? (
          <div className='btn-area only-one'>
            <BasicBtn onClick={() => goList()}>
              <span>확인</span>
            </BasicBtn>
          </div>
        ) : (
          <div className='btn-area has-two'>
            <BasicBorderBtn onClick={() => goQuizAgain()}>
              <span>다시 풀어보기</span>
            </BasicBorderBtn>
            <BasicBtn onClick={() => goList()}>
              <span>확인</span>
            </BasicBtn>
          </div>
        )}
      </BottomBarStyled>
    </QuizResultStyled>
  );
};

export default QuizResult;

const QuizResultStyled = styled.div`
  .result-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    height: calc(100vh - 150px);
    padding-top: 20px;
    .reult-txt {
      margin-top: 20px;
      white-space: pre-wrap;
      text-align: center;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      color: #16181b;
    }
    .stamp-area {
      margin-top: 16px;
      .stamp-list {
        display: flex;
        li + li {
          margin-left: 6px;
        }
      }
    }
    .score-area {
      margin-top: 16px;
      font-weight: 700;
      font-size: 36px;
      line-height: 48px;
      text-align: center;
      color: ${(props) => props.fontCol};
    }
    .solve-cnt-area {
      margin-top: 8px;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: ${(props) => props.fontCol};
    }
  }
`;
