<template>
  <div>
    <h1>Budgets</h1>
    <v-list two-line>
      <v-list-item
        v-for="budget in budgets"
        :key="budget.id"
        :href="'/budgets/' + budget.name"
      >
        <v-list-item-content>
          <v-list-item-title>{{ budget.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ budget.periodName }}</v-list-item-subtitle>
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
        <v-form v-model="valid" @submit="addBudget">
          <v-card-text>
            <v-text-field
              v-model="budgetName"
              label="Name"
              color="#216583"
              required
              height="42"
            ></v-text-field>
            <v-date-picker
              v-model="date"
              landscape
              full-width
              color="#fff1c1"
              type="month"
            ></v-date-picker>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="dialog = false">
              cancel
            </v-btn>
            <v-btn type="submit" text>add</v-btn>
          </v-card-actions>
        </v-form>
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
      budgets: [],
      dialog: false,
      valid: false,
      budgetName: '',
      date: new Date().toISOString().substr(0, 7),
      snackbar: false,
      snackbarText: ''
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
      console.log(this.budgets)
    },
    // make this async
    async addBudget(e) {
      e.preventDefault()

      const payload = {
        name: this.budgetName,
        period: this.date
      }
      const { data } = await BudgetRepository.createBudget(payload)
      // hide the dialog and clear form
      this.dialog = false
      this._clearForm()
      // show snackbar notification
      this.snackbarText = `Budget created: <span class="new-doc">${data.budget.name}</span>`
      this.snackbar = true
      // add the newly-created Tag to our list
      this.budgets.push(data.budget)
    },
    _clearForm() {
      this.budgetName = ''
      this.date = new Date().toISOString().substring(0, 7)
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
