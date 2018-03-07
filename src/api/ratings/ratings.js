import axios from '../config'
import qs from 'qs'

// 发评论
export function createRate ({topicId, accesstoken, content}) {
  return axios.post(`topic/${topicId}/replies`,
    qs.stringify({accesstoken, content}))
}

// 点赞
export function giveUp ({replyId, accesstoken}) {
  return axios.post(`reply/${replyId}/ups`,
    qs.stringify({accesstoken}))
}
