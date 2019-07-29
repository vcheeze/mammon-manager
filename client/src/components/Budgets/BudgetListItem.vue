<template>
  <div class="budget">
    <div>{{ budget.name }}</div>
    <div>{{ budgetPeriod }}</div>
    <router-link :to="'/budgets/' + budget.name">Go to Budget</router-link>
  </div>
</template>
<script>
export default {
  name: 'BudgetListItem',
  props: {
    budget: {
      type: Object,
      required: true
    }
  },
  computed: {
    budgetPeriod() {
      return this.budget.period.substring(0, 10)
    }
  }
}
</script>
