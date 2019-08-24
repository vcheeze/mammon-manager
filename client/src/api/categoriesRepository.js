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
  updateCategory(id, payload) {
    return Repository.patch(`${resource}/${id}`, payload)
  },
  deleteCategory(categoryName) {
    return Repository.delete(`${resource}/${categoryName}`)
  }
}
