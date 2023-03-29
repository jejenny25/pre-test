import React from 'react';
import styled from 'styled-components';

const Question = () => {
  return (
    <QuestionStyled>
      <div className='answer-kr'>
        <p>테스트 국문 문장 테스트 국문 문장</p>
      </div>

      <div className='answer-eng-area'></div>
    </QuestionStyled>
  );
};

export default Question;

const QuestionStyled = styled.div``;
