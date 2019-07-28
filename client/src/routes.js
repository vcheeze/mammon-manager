import Home from './components/Home'
import BudgetsList from './components/Budgets/BudgetsList'
import Budget from './components/Budgets/Budget'
import Categories from './components/Categories/Categories'
import Tags from './components/Tags/Tags'

const routes = [
    { path: '/', component: Home },
    { path: '/budgets', component: BudgetsList },
    { path: '/budgets/:budget_name', component: Budget },
    { path: '/categories', component: Categories },
    { path: '/tags', component: Tags }
]

export default routes