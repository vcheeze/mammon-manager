import BudgetsRepository from './budgetsRepository'
import CategoriesRepository from './categoriesRepository'
import TagsRepository from './tagsRepository'
import BudgetItemsRepository from './budgetItemsRepository'
import TransactionsRepository from './transactionsRepository'

const repositories = {
  budgets: BudgetsRepository,
  categories: CategoriesRepository,
  tags: TagsRepository,
  budgetItems: BudgetItemsRepository,
  transactions: TransactionsRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
