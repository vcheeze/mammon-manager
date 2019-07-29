import Repository from './Repository'

const resource = '/categories'

export default {
  getAll() {
    return Repository.get(`${resource}`)
  },
  getCategory(categoryName) {
    return Repository.get(`${resource}/${categoryName}`)
  },
  createCategory(payload) {
    return Repository.post(`${resource}`, payload)
  }
}
