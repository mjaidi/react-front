import { actionTypes } from "./actions";

const getInitialState = () => ({
  messageQeue: [],
  activeMessage: undefined,
  open: false
});

const landing = (state = getInitialState(), { type, payload }) => {
  switch (type) {
    case actionTypes.NEW_MESSAGE:
      state.messageQeue.push({
        ...payload,
        key: new Date().getTime()
      });
      return {
        ...state,
        messageQeue: state.messageQeue
      };
    case actionTypes.PROCESS_MESSAGES:
      if (state.messageQeue.length > 0) {
        state.activeMessage = state.messageQeue.shift();
        state.open = true;
      }
      return {
        ...state,
        messageQeue: state.messageQeue,
        activeMessage: state.activeMessage,
        open: state.open
      };
    case actionTypes.CLOSE:
      return { ...state, open: false };
    default:
      return state;
  }
};

export default landing;
