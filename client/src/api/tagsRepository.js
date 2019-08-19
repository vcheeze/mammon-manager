import Repository from './Repository'

const resource = '/tags'

export default {
  createTag(payload) {
    return Repository.post(`${resource}`, payload)
  },
  getAll() {
    return Repository.get(`${resource}`)
  },
  getTag(tagName) {
    return Repository.get(`${resource}/${tagName}`)
  },
  updateTag(payload) {
    return Repository.get(`${resource}`, payload)
  },
  deleteTag(tagName) {
    return Repository.delete(`${resource}/${tagName}`)
  }
}
