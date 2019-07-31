<template>
  <div>
    <h1>{{ budget.name }}</h1>
    <div>{{ budget.periodName }}</div>
    <v-list three-line>
      <v-list-item
        v-for="budgetItem in budget.budgetItems"
        :key="budgetItem.id"
      >
        <v-list-item-content>
          <v-list-item-title>{{ budgetItem.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ budgetItem.category }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{
            budgetItem.actual + '/' + budgetItem.allotted
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { RepositoryFactory } from '../../api/RepositoryFactory'
const BudgetRepository = RepositoryFactory.get('budgets')

export default {
  name: 'Budget',
  data() {
    return {
      budget: {}
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
