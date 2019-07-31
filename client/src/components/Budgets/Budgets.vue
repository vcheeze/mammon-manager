<template>
  <div>
    <h1>Budgets</h1>
    <v-list two-line>
      <v-list-item v-for="budget in budgets" :key="budget.id">
        <v-list-item-content>
          <v-list-item-title>{{ budget.name }}</v-list-item-title>
          <v-list-item-subtitle>{{
            budget.period.substring(0, 10)
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- <BudgetListItem
      v-for="budget in budgets"
      :key="budget.id"
      :budget="budget"
    /> -->
  </div>
</template>
<script>
import { RepositoryFactory } from '../../api/RepositoryFactory'
const BudgetRepository = RepositoryFactory.get('budgets')

export default {
  name: 'Budgets',
  data() {
    return {
      budgets: []
    }
  },
  mounted() {
    this.loadBudgets()
  },
  methods: {
    async loadBudgets() {
      const { data } = await BudgetRepository.getAll()
      data.budgets.forEach(budget => {
        let period = new Date(budget.period)
        period.setDate(period.getDate() + 1)
      })
      // TODO add sorting by date to data.budgets
      this.budgets = data.budgets
    }
  }
}
</script>
