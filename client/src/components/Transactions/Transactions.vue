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
          {{ dialogTitle }}
          <v-btn icon color="#ffffff" @click="dialog = false">
            <v-icon color="#ffffff">close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form v-model="valid" @submit="saveTransaction">
          <v-card-text>
            <v-text-field
              v-model="tagToEdit.name"
              label="Name"
              color="#216583"
              required
            ></v-text-field>
            <v-autocomplete
              v-model="tagToEdit.category"
              label="Category"
              :items="budget.budgetItems"
              item-text="category.name"
              item-value="category._id"
              color="#216583"
              required
            ></v-autocomplete>
            <v-text-field
              v-model="tagToEdit.amount"
              label="I spent"
              suffix="AED"
              color="#216583"
              required
            ></v-text-field>
            <v-menu
              v-model="tagToEdit.dateMenu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="tagToEdit.date"
                  label="Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="tagToEdit.date"
                @input="tagToEdit.dateMenu = false"
              ></v-date-picker>
            </v-menu>
            <!-- TODO add Account fields -->
            <v-combobox
              v-model="tagToEdit.tags"
              label="Tags"
              :items="tags"
              item-text="name"
              item-value="_id"
              color="#216583"
              chips
              deletable-chips
              dense
              multiple
            ></v-combobox>
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
const TagRepository = RepositoryFactory.get('tags')

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
      tags: [],
      dialog: false,
      valid: false,
      editedIndex: -1,
      tagToEdit: {
        name: '',
        category: '',
        amount: '',
        dateMenu: false,
        date: new Date().toISOString().substr(0, 10),
        tags: []
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.editedIndex === -1 ? 'Add Transaction' : 'Edit Transaction'
    }
  },
  created() {
    this.loadActiveBudget()
    this.loadTags()
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
    },
    async loadTags() {
      const { data } = await TagRepository.getAll()
      this.tags = data.tags
    },
    // TODO distinguish between save and update calls
    async saveTransaction(e) {
      e.preventDefault()

      const txn = {
        name: this.tagToEdit.name,
        budgetId: this.budget._id,
        categoryId: this.tagToEdit.category,
        amount: this.tagToEdit.amount,
        date: this.tagToEdit.date,
        tags: this.tagToEdit.tags
      }

      let data
      if (this.editedIndex === -1) {
        ;({ data } = await TransactionRepository.createTransaction(txn))
      } else {
        const id = this.transactions[this.editedIndex]._id
        ;({ data } = await TransactionRepository.updateTransaction(id, txn))
      }

      this.dialog = false
      this._clearForm()
      // show snackbar notification
      // eslint-disable-next-line no-undef
      data.transaction.categoryName = data.transaction.category.name
      // eslint-disable-next-line no-undef
      data.transaction.formattedDate = data.transaction.date.substr(0, 10)
      // eslint-disable-next-line no-undef
      this.transactions.push(data.transaction)
    },
    async deleteTransaction(transaction) {
      await TransactionRepository.deleteTransaction(transaction.name)
      this.transactions = this.transactions.filter(txn => {
        return txn._id !== transaction._id
      })
    },
    editTransaction(transaction) {
      this.editedIndex = this.transactions.indexOf(transaction)
      const txn = {
        name: transaction.name,
        category: transaction.category._id,
        amount: transaction.amount,
        dateMenu: false,
        date: new Date(transaction.date).toISOString().substr(0, 10),
        tags: transaction.tags
      }
      this.tagToEdit = Object.assign({}, txn)
      this.dialog = true
    },
    _clearForm() {
      this.tagToEdit.name = ''
      this.tagToEdit.category = ''
      this.tagToEdit.amount = ''
      this.tagToEdit.date = new Date().toISOString().substr(0, 10)
    }
  }
}
</script>

<style lang="scss">
.v-data-table {
  margin: 1rem;
}
</style>
