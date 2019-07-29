<template>
  <div>
    <h1>{{ budget.name }}</h1>
    <div>{{ budget.period.substring(0, 10) }}</div>
  </div>
</template>

<script>
import { RepositoryFactory } from '../../api/RepositoryFactory'
const BudgetRepository = RepositoryFactory.get('budgets')

export default {
  name: 'Budget',
  data() {
    return {
      budget: { name: '', period: '' }
    }
  },
  mounted() {
    this.getBudget()
  },
  methods: {
    async getBudget() {
      const { data } = await BudgetRepository.getBudget(
        this.$route.params.budgetName
      )
      this.budget = data.budget
    }
  }
}
</script>
