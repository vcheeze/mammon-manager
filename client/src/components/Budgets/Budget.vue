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
    <v-dialog v-model="dialog" width="550">
      <template v-slot:activator="{ on }">
        <v-btn dark depressed fab color="#f76262" v-on="on">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <v-card class="dialog-card">
        <v-card-title primary-title>
          Add Budget Item
          <v-btn icon dark @click="dialog = false">
            <v-icon color="#ffffff">close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form v-model="valid" @submit="addBudgetItem">
          <v-card-text>
            <v-autocomplete
              v-model="categoryId"
              label="Category"
              :items="categories"
              item-text="name"
              item-value="_id"
              color="#216583"
              required
              height="42"
            ></v-autocomplete>
            <v-text-field
              v-model="allotted"
              label="I can spend:"
              color="#216583"
              required
            ></v-text-field>
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
const CategoryRepository = RepositoryFactory.get('categories')
const BudgetItemRepository = RepositoryFactory.get('budgetItems')

export default {
  name: 'Budget',
  data() {
    return {
      budget: {},
      categories: [],
      categoryId: '',
      alloted: '',
    }
  },
  mounted() {
    this.getBudget()
    this.loadCategories()
  },
  methods: {
    async getBudget() {
      const { data } = await BudgetRepository.getBudget(
        this.$route.params.budgetName
      )
      this.budget = data.budget
    },
    async loadCategories() {
      const { data } = await CategoryRepository.getAll()
      this.categories = data.categories
      
    },
    async addBudgetItem(e) {
      e.preventDefault()

      const payload = {
        budget: this.budget._id,
        category: this.categoryId,
        alloted: this.alloted
      }
      const { data } = await BudgetItemRepository.createBudgetItem(payload)
      // hide the dialog and clear form
      this.dialog = false
      this._clearForm()
      // show snackbar notification
      this.snackbarText = `BudgetItem created: <span class="new-doc">${data.budgetItem.name}</span>`
      this.snackbar = true
      // add the newly-created BudgetItem to the current Budget
      this.budget.budgetItems.push(data.budgetItem)
    },
    _clearForm() {
      this.categoryId = ''
      this.alloted = ''
    }
  }
}
</script>
