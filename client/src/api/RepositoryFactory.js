import BudgetsRepository from './budgetsRepository'
import CategoriesRepository from './categoriesRepository'
import TagsRepository from './tagsRepository'

const repositories = {
  budgets: BudgetsRepository,
  categories: CategoriesRepository,
  tags: TagsRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
