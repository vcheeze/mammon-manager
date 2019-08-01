import Repository from './Repository'

const resource = '/budgetItems'

export default {
  createBudgetItem(payload) {
    return Repository.post(`${resource}`, payload)
  },
  getAll() {
    return Repository.get(`${resource}`)
  },
  getBudgetItem(budgetItemName) {
    return Repository.get(`${resource}/${budgetItemName}`)
  },
  deleteBudgetItem(budgetItemName) {
    return Repository.delete(`${resource}/${budgetItemName}`)
  }
}
