import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQuizId, isFirst } from '../store/reducers/quiz.js';

import styled from 'styled-components';
import { AppBarStyled } from '../assets/css/styled.js';
import icoArr from '../assets/images/ico-arr.png';

const QuizList = () => {
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const record = JSON.parse(localStorage.getItem('quizRecord'));

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const getData = await axios({
        method: 'get',
        url: 'https://qualson-test.vercel.app/api/test/list',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (getData.data !== null) {
        setQuizList(getData.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goDateFormat = (_date) => {
    let yyyy = _date.substring(0, 4);
    let mm = _date.substring(5, 7);
    let dd = _date.substring(8, 10);
    return `${yyyy}. ${mm}. ${dd}`;
  };

  const goDetail = (quizId) => {
    let item = undefined;
    if (record !== null) {
      item = record.find(
        (item) => item.solvedQuizId === quizId && item.isPerfect === true
      );
    }

    if (item !== undefined) {
      alert('만점을 받은 문제입니다.');
    } else {
      dispatch(setQuizId(quizId));
      dispatch(isFirst(true));
      navigate('/quiz');
    }
  };
  return (
    <QuizListStyled>
      <AppBarStyled>
        <h2 className='page-tit'>테스트 목록</h2>
      </AppBarStyled>

      <div className='subject-box'>
        <div className='tit-area'>
          <p className='subject-tag'>SPEAKING | Basic High</p>
          <h3 className='subject-tit'>
            <span>LV4.</span> 일상 영어 스킬업
          </h3>
          <p className='date-txt'>화,목 I PM 8:30 ~ 9:30</p>
        </div>
        <div className='desc-box'>
          <p className='txt'>
            6단계 스피킹 단계 중 네 번째 레벨이에요.
            <br />
            다양한 일상 상황에서 긴장 하지 않고 자연스럽게 소통하도록 연습해요.
          </p>
        </div>
      </div>

      <div className='list-wrap'>
        <ul className='list list-quiz'>
          {quizList.map((item) => (
            <li key={item.id}>
              {/* <Link to='/quiz' state={{ quizId: item.id }} className='list-btn'> */}
              <button
                type='button'
                onClick={() => goDetail(item.id)}
                className='list-btn'
              >
                <p className='tit'>{item.subtitle}</p>
                <p className='date'>{goDateFormat(item.startDatetime)}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </QuizListStyled>
  );
};

export default QuizList;

const QuizListStyled = styled.div`
  .subject-box {
    padding: 60px 20px 31px;
    background: #91e6b3;
    .subject-tag {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.04em;
      color: #00663a;
    }
    .subject-tit {
      margin-top: 4px;
      font-size: 34px;
      font-weight: 700;
      color: #000000;
      letter-spacing: -4px;
      span {
        font-size: 24px;
        line-height: 44px;
        letter-spacing: 0;
      }
    }
    .date-txt {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #000;
    }
    .desc-box {
      margin-top: 24px;
      padding: 12px 50px 12px 20px;
      background-color: #fff;
      border-radius: 6px;
      .txt {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -1.8px;
      }
    }
  }

  .list-wrap .list {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    li + li {
      border-top: 1px solid #eee;
    }
    .list-btn {
      position: relative;
      display: block;
      width: 100%;
      padding: 12px 35px 12px 16px;
      &:after {
        display: block;
        position: absolute;
        top: 50%;
        right: 16px;
        height: 12px;
        width: 7px;
        margin-top: -6px;
        background: url(${icoArr}) no-repeat;
        content: '';
      }
      .tit {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
      }
      .date {
        font-weight: 400;
        font-size: 12px;
        line-height: 24px;
        color: #555;
      }
    }
  }
`;
