<template>
  <div>
    <h1>Tags</h1>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn dark depressed fab color="#f76262" v-on="on">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <v-card class="dialog-card">
        <v-card-title primary-title>
          Add Tag
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit="addTag">
            <!-- the v-if for the text field is a workaround for autofocus -->
            <!-- which only autofocuses on initial render -->
            <v-text-field
              v-if="dialog"
              v-model="tagName"
              label="Name"
              color="#216583"
              autofocus
              required
            ></v-text-field>
            <v-text-field
              v-model="categoryName"
              label="category"
              color="#216583"
            ></v-text-field>
            <v-btn depressed type="submit">submit</v-btn>
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
const TagRepository = RepositoryFactory.get('tags')

export default {
  name: 'Tags',
  data() {
    return {
      dialog: false,
      snackbar: false,
      snackbarText: '',
      valid: false,
      tagName: '',
      categoryName: ''
    }
  },
  methods: {
    async addTag(e) {
      e.preventDefault()

      const payload = {
        name: this.tagName,
        category: this.categoryName
      }
      const { data } = await TagRepository.createTag(payload)
      // hide the dialog and clear form
      this.dialog = false
      this.clearForm()
      // show snackbar notification
      this.snackbarText = `New Tag created: <span class="created-tag">${
        data.tag.name
      }</span>`
      this.snackbar = true
    },
    clearForm() {
      this.tagName = ''
      this.categoryName = ''
    }
  }
}
</script>

<style lang="scss">
.created-tag {
  font-weight: bold;
}
</style>
