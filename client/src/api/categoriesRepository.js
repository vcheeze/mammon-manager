import Repository from './Repository'

const resource = '/categories'

export default {
  createCategory(payload) {
    return Repository.post(`${resource}`, payload)
  },
  getAll() {
    return Repository.get(`${resource}`)
  },
  getCategory(categoryName) {
    return Repository.get(`${resource}/${categoryName}`)
  },
  updateCategory(payload) {
    return Repository.patch(`${resource}`, payload)
  },
  deleteCategory(categoryName) {
    return Repository.delete(`${resource}/${categoryName}`)
  }
}
