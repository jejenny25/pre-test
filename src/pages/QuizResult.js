import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  AppBarStyled,
  BottomBarStyled,
  BasicBorderBtn,
  BasicBtn,
} from '../assets/css/styled';

import imgStampFail from '../assets/images/stamp-fail.png';
import imgStampGood from '../assets/images/stamp-good.png';
import imgStampSuccess from '../assets/images/stamp-success.png';
import imgStampWrong from '../assets/images/stamp-wrong.png';

import imgFail from '../assets/images/testresult-fail.png';

import imgGood1 from '../assets/images/testresult-good1.png';
import imgGood2 from '../assets/images/testresult-good2.png';
import imgGood3 from '../assets/images/testresult-good3.png';

import imgPerfect1 from '../assets/images/testresult-perfect1.png';
import imgPerfect2 from '../assets/images/testresult-perfect2.png';
import imgPerfect3 from '../assets/images/testresult-perfect3.png';

const QuizResult = () => {
  const curQuizId = useSelector((state) => state.QuizReducer.curQuizId);
  const answerList = useSelector((state) => state.QuizReducer.answerList);

  const correctNum = answerList.filter((v) => v === 'correct').length;
  const incorrectNum = answerList.filter((v) => v === 'incorrect').length;
  const [resultTxt, setResultTxt] = useState('');
  let resultState = '';
  const imgGoodArr = [imgGood1, imgGood2, imgGood3];
  const imgPerfectArr = [imgPerfect1, imgPerfect2, imgPerfect3];
  const [img, setImg] = useState('');

  useEffect(() => {
    // 3문제 이상 오답 시 실패, 2문제 이하의 오답이 있을 경우 성공입니다.
    if (answerList.length === correctNum) {
      //resultState = 'perfect';
      setResultTxt('완벽. 모두 맞혔어요!');

      const randomIndex = Math.floor(Math.random() * imgPerfectArr.length);
      setImg(imgPerfectArr[randomIndex]);
    } else if (incorrectNum > 2) {
      //resultState = 'fail';
      setResultTxt('아쉬워요... 다음에는 더 잘할 수 있을 거예요!');
      setImg(imgFail);
    } else if (incorrectNum <= 2) {
      //resultState = 'success';
      setResultTxt('좋아요. 멋진 점수에요!');
      const randomIndex = Math.floor(Math.random() * imgGoodArr.length);
      setImg(imgGoodArr[randomIndex]);
    }
  }, []);

  console.log(answerList);
  console.log(correctNum);
  console.log(incorrectNum);
  console.log(resultState);
  return (
    <QuizResultStyled>
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
        <div className='score-area'>
          <span>{correctNum}</span> /<span>{answerList.length}</span>
        </div>
      </div>
      <BottomBarStyled>
        {resultState === 'perfect' ? (
          <div className='btn-area only-one'>
            <BasicBtn>
              <span>확인</span>
            </BasicBtn>
          </div>
        ) : (
          <div className='btn-area has-two'>
            <BasicBorderBtn>
              <span>다시 풀어보기</span>
            </BasicBorderBtn>
            <BasicBtn>
              <span>확인</span>
            </BasicBtn>
          </div>
        )}
      </BottomBarStyled>
    </QuizResultStyled>
  );
};

export default QuizResult;

const QuizResultStyled = styled.div``;
