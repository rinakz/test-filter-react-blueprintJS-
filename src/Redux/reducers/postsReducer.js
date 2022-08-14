import { POSTS } from '../type'

export const postsReducer = (state = [], action) => {
  const {type, payload} = action
  switch (type) {
    case POSTS:
      return payload
    default:
      return state
  }
}
