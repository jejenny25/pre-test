export const setQuizStart = (quizStart) => ({
  type: 'SET_QUIZ_START',
  quizStart,
});

export const isFirst = (isFirst) => ({
  type: 'SET_IS_FIRST',
  isFirst,
});

export const setQuizId = (curQuizId) => ({
  type: 'SET_QUIZ_ID',
  curQuizId,
});

export const setQuestionList = (questionList) => ({
  type: 'SET_QUESTION_LIST',
  questionList,
});

export const setAnswerList = (answerList) => ({
  type: 'SET_ANSWER_LIST',
  answerList,
});

export const setHint = (hint) => ({
  type: 'SET_HINT',
  hint,
});

export const solveQuestion = (quizNum, curQuizId, answerList, isFirst) => ({
  type: 'SOLVE_QUESTION',
  quizNum,
  curQuizId,
  answerList,
  isFirst,
});

const initialState = {
  quizStart: false,
  isFirst: false,
  quizNum: 1, // 현재 풀고 있는 번호
  curQuizId: 0, // 현재 풀고 있는 퀴즈 아이디
  answerList: [], // 답 리스트
  questionList: [], //문제리스트
  hint: 2,
};

const QuizReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_QUIZ_START': {
      return {
        ...state,
        quizStart: action.quizStart,
      };
    }
    case 'SET_IS_FIRST': {
      return {
        ...state,
        isFirst: action.isFirst,
      };
    }
    case 'SET_QUIZ_ID': {
      return {
        ...state,
        curQuizId: action.curQuizId,
      };
    }
    case 'SET_QUESTION_LIST': {
      return {
        ...state,
        questionList: action.questionList,
      };
    }
    case 'SET_ANSWER_LIST': {
      return {
        ...state,
        answerList: action.answerList,
      };
    }
    case 'SET_HINT': {
      return {
        ...state,
        hint: action.hint,
      };
    }
    case 'SOLVE_QUESTION': {
      return {
        ...state,
        quizNum: action.quizNum,
        curQuizId: action.curQuizId,
        answerList: action.answerList,
        isFirst: action.isFirst,
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
