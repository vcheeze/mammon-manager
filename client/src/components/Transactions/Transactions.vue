<template>
  <div>
    <h1>Transactions</h1>
    <v-data-table :headers="headers" :items="transactions" :items-per-page="20">
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editTransaction(item)">
          edit
        </v-icon>
        <v-icon small @click="deleteTransaction(item)">
          delete
        </v-icon>
      </template>
    </v-data-table>
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
              v-model="categoryId"
              label="Category"
              :items="budget.budgetItems"
              item-text="category.name"
              item-value="category._id"
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
const TransactionRepository = RepositoryFactory.get('transactions')

export default {
  name: 'Transactions',
  data() {
    return {
      budget: {},
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Category', value: 'categoryName' },
        { text: 'Amount', value: 'amount' },
        { text: 'Date', value: 'formattedDate' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      transactions: [],
      dialog: false,
      valid: false,
      transactionName: '',
      categoryId: '',
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
      // load all Transactions linked to this Budget
      this.loadTransactions()
    },
    async loadTransactions() {
      const { data } = await TransactionRepository.getAllInBudget(
        this.budget._id
      )
      this.transactions = data.transactions
      this.transactions.forEach(transaction => {
        transaction.categoryName = transaction.category.name
        transaction.formattedDate = transaction.date.substr(0, 10)
      })
      console.log(this.transactions)
    },
    async addTransaction(e) {
      e.preventDefault()

      const transaction = {
        name: this.transactionName,
        budgetId: this.budget._id,
        categoryId: this.categoryId,
        amount: this.amount,
        date: this.date
      }

      const { data } = await TransactionRepository.createTransaction(
        transaction
      )
      console.log(data)
      this.dialog = false
      this._clearForm()
      // show snackbar notification
      data.transaction.categoryName = data.transaction.category.name
      data.transaction.formattedDate = data.transaction.date.substr(0, 10)
      this.transactions.push(data.transaction)
    },
    async deleteTransaction(transaction) {
      await TransactionRepository.deleteTransaction(transaction.name)
      this.transactions = this.transactions.filter(txn => {
        return txn._id !== transaction._id
      })
    },
    editTransaction(transaction) {
      console.log('editing')
    },
    _clearForm() {
      this.transactionName = ''
      this.categoryId = ''
      this.amount = ''
      this.date = new Date().toISOString().substr(0, 10)
    }
  }
}
</script>
