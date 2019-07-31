<template>
  <div>
    <h1>Budgets</h1>
    <v-list two-line>
      <v-list-item v-for="budget in budgets" :key="budget.id" :href="'/budgets/' + budget.name">
        <v-list-item-content>
          <v-list-item-title>{{ budget.name }}</v-list-item-title>
          <v-list-item-subtitle>{{
            monthNames[budget.period.getMonth()] + ' ' + budget.period.getFullYear()
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialog" width="550">
      <template v-slot:activator="{ on }">
        <v-btn dark depressed fab color="#f76262" v-on="on">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <v-card class="dialog-card">
        <v-card-title primary-title>
          Add Budget
          <v-btn icon dark @click="dialog = false">
            <v-icon color="#ffffff">close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" @submit="addBudget">
            <v-text-field
              v-model="budgetName"
              label="Name"
              color="#216583"
              required
              height="42"
            ></v-text-field>
            <v-date-picker v-model="date" landscape full-width color="#fff1c1" type="month"></v-date-picker>
            <v-btn type="submit" depressed>add</v-btn>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar">
      <span v-html="snackbarText"></span>
      <v-btn color="#f76262" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { RepositoryFactory } from '../../api/RepositoryFactory'
const BudgetRepository = RepositoryFactory.get('budgets')

export default {
  name: 'Budgets',
  data() {
    return {
      budgets: [
        {
          name: 'Test1',
          period: new Date('2019/08/01')
        },
        {
          name: 'Test2',
          period: new Date('2019/07/01')
        }
      ],
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      dialog: false,
      valid: false,
      budgetName: '',
      date: new Date().toISOString().substr(0, 7),
      snackbar: false,
      snackbarText: ''
    }
  },
  mounted() {
    // this.loadBudgets()
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
    },
    // make this async
    addBudget() {
      console.log('adding budget!')
    }
  }
}
</script>

<style lang="scss">
  .v-picker.v-picker--date {
    margin-bottom: 1rem;
    .v-date-picker-title {
      color: #333333;
      .v-date-picker-title__date {
        font-size: 30px;
      }
    }
  }
</style>