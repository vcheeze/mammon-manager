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
  updateBudgetItem(id, payload) {
    return Repository.patch(`${resource}/${id}`, payload)
  },
  deleteBudgetItem(budgetName, budgetItemId) {
    return Repository.delete(`${resource}/${budgetName}/${budgetItemId}`)
  }
}
