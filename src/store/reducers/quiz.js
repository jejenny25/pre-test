export const setQuizitem = (curQuizId, answerList) => ({
  type: 'SET_QUIZ',
  curQuizId,
  answerList,
});

export const solveQuiz = (quizNum, curQuizId, answerList) => ({
  type: 'SOLVE_QUIZ',
  quizNum,
  curQuizId,
  answerList,
});

const initialState = {
  quizNum: 1, // 현재 풀고 있는 번호
  curQuizId: 0, // 현재 풀고 있는 퀴즈 아이디
  answerList: [], // 답 리스트
};

const QuizReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUIZ': {
      return {
        ...state,
        curQuizId: action.curQuizId,
        answerList: action.answerList,
      };
    }
    case 'SOLVE_QUIZ': {
      return {
        ...state,
        quizNum: action.quizNum,
        curQuizId: action.curQuizId,
        answerList: action.answerList,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default QuizReducer;
