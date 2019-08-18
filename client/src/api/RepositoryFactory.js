import BudgetsRepository from './budgetsRepository'
import CategoriesRepository from './categoriesRepository'
import TagsRepository from './tagsRepository'
import BudgetItemsRepository from './budgetItemsRepository'

const repositories = {
  budgets: BudgetsRepository,
  categories: CategoriesRepository,
  tags: TagsRepository,
  budgetItems: BudgetItemsRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
