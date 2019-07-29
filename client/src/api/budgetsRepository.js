import Repository from './Repository'

const resource = '/budgets'

export default {
  getAll() {
    return Repository.get(`${resource}`)
  },
  getBudget(budgetName) {
    return Repository.get(`${resource}/${budgetName}`)
  },
  createBudget(payload) {
    return Repository.post(`${resource}`, payload)
  }
}
