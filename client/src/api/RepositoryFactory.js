import BudgetsRepository from './budgetsRepository'

const repositories = {
    budgets: BudgetsRepository
}

export const RepositoryFactory = {
    get: name => repositories[name]
}