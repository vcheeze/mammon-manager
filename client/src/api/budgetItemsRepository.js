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
  deleteBudgetItem(budgetName, budgetItemId) {
    return Repository.delete(`${resource}/${budgetName}/${budgetItemId}`)
  }
}
