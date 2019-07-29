<template>
  <div>
    <h1>Categories</h1>
    <v-card v-for="category in categories" :key="category.name">
      <v-card-title>{{ category.name }}</v-card-title>
      <v-card-text>
        <v-combobox
          v-model="category.tags"
          :items="category.tags"
          color="#216583"
          chips
          deletable-chips
          multiple
          hide-selected
          label="tags"
        ></v-combobox>
      </v-card-text>
    </v-card>
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
          <v-form v-model="valid">
            <v-text-field
              v-model="categoryName"
              label="Name"
              color="#216583"
              required
              height="42"
            ></v-text-field>
            <v-combobox
              v-model="select"
              :items="tags"
              color="#216583"
              chips
              deletable-chips
              multiple
              hide-selected
              label="tags"
            ></v-combobox>
            <v-btn depressed @click="addCategory">submit</v-btn>
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
  </div>
</template>

<script>
import { RepositoryFactory } from '../../api/RepositoryFactory'
const CategoryRepository = RepositoryFactory.get('categories')

export default {
  name: 'Categories',
  data() {
    return {
      categories: [
        {
          name: 'Transportation',
          tags: ['Public Transport', 'Fuel', 'Maintenance', 'Fines']
        }
      ],
      dialog: false,
      valid: false,
      categoryName: '',
      select: [],
      tags: []
    }
  },
  watch: {
    select() {
      console.log(this.select)
    }
  },
  methods: {
    async addCategory() {
      const payload = {
        name: this.categoryName,
        tags: this.select
      }
      const { data } = await CategoryRepository.createCategory(payload)
      console.log(data)
    }
  }
}
</script>
