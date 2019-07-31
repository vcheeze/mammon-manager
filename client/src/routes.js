import Home from './components/Home'
import Budgets from './components/Budgets/Budgets'
import Budget from './components/Budgets/Budget'
import Categories from './components/Categories/Categories'
import Tags from './components/Tags/Tags'

const routes = [
  { path: '/', component: Home },
  { path: '/budgets', component: Budgets },
  { path: '/budgets/:budgetName', component: Budget },
  { path: '/categories', component: Categories },
  { path: '/tags', component: Tags }
]

export default routes
