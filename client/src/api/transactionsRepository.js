import Repository from './Repository'

const resource = '/transactions'

export default {
  createTransaction(payload) {
    return Repository.post(`${resource}`, payload)
  },
  getAll() {
    return Repository.get(`${resource}`)
  },
  getAllInBudget(budgetId) {
    return Repository.get(`${resource}/budget/${budgetId}`)
  },
  getTransaction(transactionName) {
    return Repository.get(`${resource}/${transactionName}`)
  },
  updateTransaction(id, payload) {
    return Repository.patch(`${resource}/${id}`, payload)
  },
  deleteTransaction(transactionName) {
    return Repository.delete(`${resource}/${transactionName}`)
  }
}
