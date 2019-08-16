<template>
  <div>
    <h1>Categories</h1>
    <v-list dense>
      <v-list-item v-for="category in categories" :key="category.id">
        <v-list-item-content>
          <v-list-item-title>{{ category.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon small @click="removeCategory(category)">
            <v-icon size="18" color="#333333">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
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
          <v-btn icon color="#ffffff" @click="dialog = false">
            <v-icon color="#ffffff">close</v-icon>
          </v-btn>
        </v-card-title>
        <v-form v-model="valid" @submit="addCategory">
          <v-card-text>
            <v-text-field
              v-model="categoryName"
              label="Name"
              color="#216583"
              required
              height="42"
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
      this.categories = data.categories.sort((a, b) => {
        let a_name = a.name.toLowerCase(),
          b_name = b.name.toLowerCase()
        if (a_name > b_name) {
          return 1
        } else if (a_name < b_name) {
          return -1
        }
        return 0
      })
      // console.log(this.categories)
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
      this._clearForm()
      // show snackbar notification
      this.snackbarText = `Category created: <span class="new-doc">${data.category.name}</span>`
      this.snackbar = true
      // add the newly-created Category
      this._binaryInsert(data.category, this.categories)
    },
    async removeCategory(category) {
      console.log('category', category)
      const { data } = await CategoryRepository.deleteCategory(category.name)
      console.log('Category deleted!', data)
      this.categories = this.categories.filter(cat => {
        return cat.name !== category.name
      })
    },
    _clearForm() {
      this.categoryName = ''
    },
    // referencing eloone's algo: https://gist.github.com/eloone/11342252
    _binaryInsert(value, array, startVal, endVal) {
      const length = array.length
      const start = typeof startVal != 'undefined' ? startVal : 0
      const end = typeof endVal != 'undefined' ? endVal : length - 1
      const mid = start + Math.floor((end - start) / 2)
      console.log('start: ', start, ' | ', 'end: ', end, ' | ', 'mid: ', mid)

      if (length == 0) {
        array.push(value)
        console.log('array empty...pushing value')
        return
      }

      if (value.name.toLowerCase() > array[end].name.toLowerCase()) {
        array.splice(end + 1, 0, value)
        console.log('new value is greater than last value')
        return
      }

      if (value.name.toLowerCase() < array[start].name.toLowerCase()) {
        array.splice(start, 0, value)
        return
      }

      if (start >= end) {
        return
      }

      if (value.name.toLowerCase() < array[mid].name.toLowerCase()) {
        this._binaryInsert(value, array, start, mid - 1)
        return
      }

      if (value.name.toLowerCase() > array[mid].name.toLowerCase()) {
        this._binaryInsert(value, array, mid + 1, end)
        return
      }
    }
  }
}
</script>
