<template>
  <div>
    <h1>Budgets</h1>
    <BudgetListItem
      v-for="budget in budgets"
      :key="budget.id"
      :budget="budget"
    />
  </div>
</template>
<script>
import { RepositoryFactory } from '../../api/RepositoryFactory'
const BudgetRepository = RepositoryFactory.get('budgets')
import BudgetListItem from './BudgetListItem'

export default {
  name: 'BudgetsList',
  components: {
    BudgetListItem
  },
  data() {
    return {
      budgets: null
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const { data } = await BudgetRepository.getAll()
      this.budgets = data.budgets
    }
  }
}
</script>
