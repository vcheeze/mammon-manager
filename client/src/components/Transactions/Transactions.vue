<template>
  <div>
    <h1>Transactions</h1>
    <v-list>
      <v-list-item v-for="transaction in transactions" :key="transaction.name">
        <v-list-item-content>
          <v-list-item-title>{{ transaction.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn dark depressed fab color="#f76262" v-on="on">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <v-card class="dialog-card">
        <v-card-title primary-title>
          Add Transaction
          <v-btn icon color="#ffffff" @click="dialog = false">
            <v-icon color="#ffffff">close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form v-model="valid" @submit="addTransaction">
          <v-card-text>
            <v-text-field
              v-model="transactionName"
              label="Name"
              color="#216583"
              required
            ></v-text-field>
            <v-autocomplete
              v-model="budgetItemId"
              label="Category"
              :items="budget.budgetItems"
              item-text="category.name"
              item-value="_id"
              color="#216583"
              required
            ></v-autocomplete>
            <v-text-field
              v-model="amount"
              label="I spent"
              suffix="AED"
              color="#216583"
              required
            ></v-text-field>
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                @input="dateMenu = false"
              ></v-date-picker>
            </v-menu>
            <!-- TODO add Tags and Account fields -->
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
  </div>
</template>

<script>
import { RepositoryFactory } from '../../api/RepositoryFactory'
const BudgetRepository = RepositoryFactory.get('budgets')

export default {
  name: 'Transactions',
  data() {
    return {
      budget: {},
      transactions: [{ name: '1' }, { name: '2' }],
      dialog: false,
      valid: false,
      transactionName: '',
      budgetItemId: '',
      amount: '',
      dateMenu: false,
      date: new Date().toISOString().substr(0, 10)
    }
  },
  created() {
    this.loadActiveBudget()
  },
  methods: {
    async loadActiveBudget() {
      const { data } = await BudgetRepository.getActiveBudget()
      this.budget = data.budget
    },
    async addTransaction(e) {
      e.preventDefault()

      await console.log('adding transaction!')
    }
  }
}
</script>
