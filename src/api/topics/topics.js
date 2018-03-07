import axios from '../config'
import qs from 'qs'

export const limit = 25

// 获取主题
export function getTopics (tab, page) {
  return axios.get('topics', {
    params: {
      tab,
      page,
      limit
    }
  })
}

// 获取主题内容
export function getTopicContent (id) {
  return axios.get(`topic/${id}`)
}

// 收藏主题
export function collection ({accesstoken, topic_id}) {
  return axios.post('topic/collect', qs.stringify({accesstoken, topic_id}))
}

// 取消收藏
export function deCollect ({accesstoken, topic_id}) {
  return axios.post('topic/de_collect', qs.stringify({accesstoken, topic_id}))
}

// 新建主题
export function createTopic ({accesstoken, title, tab, content}) {
  return axios.post('topics', qs.stringify({accesstoken, title, tab, content}))
}
