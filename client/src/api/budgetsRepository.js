import Repository from './Repository'

const resource = '/budgets'

export default {
    getAll() {
        return Repository.get(`${resource}`)
    },
    getBudget(budgetId) {
        return Repository.get(`${resource}/${budgetId}`)
    },
    createBudget(payload) {
        return Repository.post(`${resource}`, payload)
    }
}