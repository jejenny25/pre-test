import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setHint } from '../store/reducers/quiz';

import btnHint from '../assets/images/btn-hint.png';
import btnHintOff from '../assets/images/btn-hint-off.png';

const Question = forwardRef((props, parRef) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questionDetail = props.question;
  //console.log(questionDetail);
  const distractors = questionDetail.distractors;
  const correctAnswer = props.question.words;

  const [newDistractors, setNewDistractors] = useState([]);

  const [userAnswer, setUserAnswer] = useState([]);
  const [userAnswerIdx, setUserAnswerIdx] = useState([]);
  const hint = useSelector((state) => state.QuizReducer.hint);

  useEffect(() => {
    //setNewDistractors(correctAnswer);
    setNewDistractors(
      [...correctAnswer, ...distractors].sort(() => Math.random() - 0.5)
    );
  }, []);

  useEffect(() => {
    if (userAnswer.length > 0) {
      props.setCanNext(true);
    } else {
      props.setCanNext(false);
    }
  }, [userAnswer]);

  useImperativeHandle(parRef, () => ({
    chkWord,
  }));

  const goAnswer = (selWord, idx) => {
    let checked = userAnswerIdx.includes(selWord + idx);
    if (!checked) {
      setUserAnswerIdx((prev) => [...prev, selWord + idx]);
      setUserAnswer((prev) => [...prev, selWord]);
    } else {
      setUserAnswerIdx(userAnswerIdx.filter((el) => el !== selWord + idx));
      setUserAnswer(userAnswer.filter((el) => el !== selWord));
    }
  };

  const chkWord = () => {
    //setUserAnswer(['is', 'wi-fi', 'working', 'I', "can't", 'get', 'a,signal']);
    if (userAnswer.join() === correctAnswer.join()) {
      navigate('/confirm', {
        state: {
          correctYN: true,
        },
      });
    } else {
      navigate('/confirm', {
        state: {
          correctYN: false,
        },
      });
    }
  };

  const hintPlay = () => {
    if (hint > 0) {
      let audio = new Audio(questionDetail.tts);
      audio.play();
      dispatch(setHint(hint - 1));
    } else {
      alert('힌트는 최대 2회까지만 들을 수 있습니다.');
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
          {newDistractors.map((item, idx) => (
            <button
              type='button'
              className={`btn-word ${
                userAnswerIdx.includes(item + idx) ? 'clicked' : ''
              }`}
              key={idx}
              //id={item + idx}
              onClick={() => goAnswer(item, idx)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className='btn-hint-area'>
        <button type='button' className='btn-hint' onClick={() => hintPlay()}>
          <img src={hint > 0 ? btnHint : btnHintOff} alt='' />
          <span className='hint-cnt'>{hint}</span>
        </button>
      </div>
    </QuestionStyled>
  );
});

export default Question;

const QuestionStyled = styled.div`
  padding: 0 20px 105px;
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
