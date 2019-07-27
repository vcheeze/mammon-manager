import BudgetsRepository from './budgetsRepository'
import CategoriesRepository from './categoriesRepository'

const repositories = {
    budgets: BudgetsRepository,
    categories: CategoriesRepository
}

export const RepositoryFactory = {
    get: name => repositories[name]
}
