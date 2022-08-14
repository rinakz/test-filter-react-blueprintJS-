import axios from "axios"
import { POSTS } from './type'

export const posts = (data) => ({
  type: POSTS,
  payload: data
})


export const getPosts = (page) =>  async (dispatch) => {
  const response = await axios(`https://jsonplaceholder.typicode.com/posts?_limit=${page}`)
  dispatch(posts(response.data))
}
