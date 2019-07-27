import Home from './components/Home'
import BudgetsList from './components/Budgets/BudgetsList'
import Budget from './components/Budgets/Budget'

const routes = [
    { path: '/', component: Home },
    { path: '/budgets', component: BudgetsList },
    { path: '/budgets/:budget_name', component: Budget }
]

export default routes;