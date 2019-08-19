import Repository from './Repository'

const resource = '/transactions'

export default {
  getAll() {
    return Repository.get(`${resource}`)
  },
  getAllInBudget(budgetId) {
    return Repository.get(`${resource}/budget/${budgetId}`)
  },
  getTransaction(transactionName) {
    return Repository.get(`${resource}/${transactionName}`)
  },
  createTransaction(payload) {
    return Repository.post(`${resource}`, payload)
  },
  deleteTransaction(transactionName) {
    return Repository.delete(`${resource}/${transactionName}`)
  }
}
