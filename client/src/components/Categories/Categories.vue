<template>
  <div>
    <h1>Categories</h1>
    <v-list>
      <v-list-item v-for="category in categories" :key="category.id">
        <v-list-item-content>
          <v-list-item-title>{{ category.name }}</v-list-item-title>
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
          Add Category
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid" @submit="addCategory">
            <v-text-field
              v-model="categoryName"
              label="Name"
              color="#216583"
              required
              height="42"
            ></v-text-field>
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
const CategoryRepository = RepositoryFactory.get('categories')

export default {
  name: 'Categories',
  data() {
    return {
      categories: [],
      dialog: false,
      valid: false,
      categoryName: '',
      snackbar: false,
      snackbarText: ''
    }
  },
  mounted() {
    this.loadCategories()
  },
  methods: {
    async loadCategories() {
      const { data } = await CategoryRepository.getAll()
      this.categories = data.categories
    },
    async addCategory(e) {
      e.preventDefault()

      const payload = {
        name: this.categoryName
      }
      const { data } = await CategoryRepository.createCategory(payload)
      console.log(data)
      // hide the dialog and clear form
      this.dialog = false
      this.clearForm()
      // show snackbar notification
      this.snackbarText = `Category created: <span class="new-doc">${data.category.name}</span>`
      this.snackbar = true
      // add the newly-created Category
      this.categories.push(data.category)
    },
    clearForm() {
      this.categoryName = ''
    }
  }
}
</script>
