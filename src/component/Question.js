import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import btnHint from '../assets/images/btn-hint.png';
import btnHintOff from '../assets/images/btn-hint-off.png';

const Question = (props) => {
  const questionDetail = props.question;
  const distractors = questionDetail.distractors;
  const [userAnswer, setUserAnswer] = useState([]);
  const correctAnswer = props.question.words;
  const navigate = useNavigate();

  useEffect(() => {
    //setUserAnswer(['is', 'wi-fi', 'working', 'I', "can't", 'get', 'a,signal']);
    if (userAnswer.join() === correctAnswer.join()) {
      alert('정답입ㄴ디ㅏ');
      navigate('/correct', {
        state: {
          correctYN: true,
        },
      });
    } else if (distractors.length === userAnswer.length) {
      alert('정답은 아니지만 낱말카드 다씀');
      navigate('/correct', {
        state: {
          correctYN: true,
        },
      });
    }
  }, [userAnswer]);

  const goAnswer = (selWord) => {
    let checked = userAnswer.includes(selWord);
    if (!checked) {
      setUserAnswer((prev) => [...prev, selWord]);
    } else {
      setUserAnswer(userAnswer.filter((el) => el !== selWord));
    }
  };

  return (
    <QuestionStyled>
      <div className='answer-kr'>
        <p>{questionDetail.answerKr}</p>
      </div>

      <div className='answer-eng-area'>
        <ul className='eng-answer-list-fake'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div className='eng-answer-list'>
          {userAnswer.map((item, idx) => (
            <button type='button' className='btn-word' key={idx}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className='distractor-wrap'>
        <div className='distractor-list'>
          {distractors.map((item, idx) => (
            <button
              type='button'
              className={`btn-word ${
                userAnswer.includes(item) ? 'clicked' : ''
              }`}
              key={idx}
              onClick={() => goAnswer(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className='btn-hint-area'>
        <button type='button' className='btn-hint'>
          <span className='hint-cnt'>2</span>
        </button>
      </div>
    </QuestionStyled>
  );
};

export default Question;

const QuestionStyled = styled.div`
  padding: 0 20px;
  .answer-kr {
    margin-top: 8px;
    p {
      font-weight: 700;
      font-size: 20px;
      line-height: 28px;
      color: #16181b;
    }
  }

  .btn-word {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    padding: 13px 16px;
    background: #ffffff;
    border: 1px solid #d2d8e1;
    border-radius: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    color: #16181b;
  }
  .answer-eng-area {
    position: relative;
    margin-top: 30px;
    .eng-answer-list-fake {
      li {
        height: 52px;
        border-bottom: 1px solid #64696e;
      }
    }
    .eng-answer-list {
      position: absolute;
      display: flex;
      flex-wrap: wrap;
      top: 0;
      left: 0;
    }
  }

  .distractor-wrap {
    margin-top: 16px;
    padding: 4px;
    background: #f3f4f6;
    border-radius: 8px;
    .distractor-list {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      .btn-word.clicked {
        background: #ebedef;
        border: 1px solid #ebedef;
        color: #d2d8e1;
      }
    }
  }

  .btn-hint-area {
    position: fixed;
    right: 20px;
    bottom: 90px;
    .btn-hint {
      position: relative;
      width: 64px;
      height: 64px;
      background: url(${btnHint});
      .hint-cnt {
        display: block;
        position: absolute;
        width: 24px;
        height: 24px;
        top: -5px;
        right: -2px;
        background: #ee7c54ff;
        border-radius: 50%;
        font-weight: 500;
        font-size: 12px;
        text-align: center;
        line-height: 24px;
        letter-spacing: 0.15px;
        color: #ffffff;
      }
    }
  }
`;
