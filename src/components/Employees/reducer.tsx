interface action {
  type: string,
  payload: {
    data?: [] | Array<Object>,
    errorMessage?: '' | string
  }
}

interface state {
  errorMessage: string,
  isLoading: boolean,
  listData: any
}

function reducer (state: state, action: action): state {
  const { type, payload: { data = [], errorMessage = '' } } = action

  switch (type) {
    case 'loading':
      return {
        ...state,
        isLoading: true
      }
    case 'success':
      return {
        ...state,
        isLoading: false,
        errorMessage: '',
        listData: [...data]
      }
    case 'failure':
      return {
        ...state,
        isLoading: false,
        errorMessage
      }
    case 'add': {
      return {
        ...state,
        listData: [
          data,
          ...state.listData
        ]
      }
    }
    default:
      return state
  }
}

export const initialState = {
  errorMessage: '',
  isLoading: false,
  listData: []
}

export default reducer
