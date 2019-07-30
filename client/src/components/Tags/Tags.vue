<template>
  <div>
    <h1>Tags</h1>
    <v-list>
      <v-list-item v-for="tag in tags" :key="tag.name">
        <v-list-item-content>
          <v-list-item-title>{{ tag.name }}</v-list-item-title>
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
            <v-btn depressed type="submit">add</v-btn>
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
    <!-- Snackbar that appears on form submission -->
    <v-snackbar v-model="snackbar">
      <span v-html="snackbarText"></span>
      <v-btn color="#f76262" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
// TODO validate form
// TODO check createTag call and display warning message if failed

import { RepositoryFactory } from '../../api/RepositoryFactory'
const TagRepository = RepositoryFactory.get('tags')

export default {
  name: 'Tags',
  data() {
    return {
      tags: [],
      dialog: false,
      valid: false,
      tagName: '',
      snackbar: false,
      snackbarText: ''
    }
  },
  mounted() {
    this.loadTags()
  },
  methods: {
    async loadTags() {
      const { data } = await TagRepository.getAll()
      this.tags = data.tags.sort((a, b) => {
        let a_name = a.name.toLowerCase(),
          b_name = b.name.toLowerCase()
        if (a_name > b_name) {
          return 1
        } else if (a_name < b_name) {
          return -1
        }
        return 0
      })
    },
    async addTag(e) {
      e.preventDefault()

      const payload = {
        name: this.tagName
      }
      const { data } = await TagRepository.createTag(payload)
      // hide the dialog and clear form
      this.dialog = false
      this._clearForm()
      // show snackbar notification
      this.snackbarText = `Tag created: <span class="new-doc">${data.tag.name}</span>`
      this.snackbar = true
      // add the newly-created Tag to our list
      this._binaryInsert(data.tag, this.tags)
      // this.tags.push(data.tag)
    },
    _clearForm() {
      this.tagName = ''
    },
    _binaryInsert(value, array, startVal, endVal) {
      const length = array.length
      const start = typeof startVal != 'undefined' ? startVal : 0
      const end = typeof endVal != 'undefined' ? endVal : 0
      const mid = start + Math.floor((end - start) / 2)

      if (length == 0) {
        array.push(value)
        return
      }

      if (value.name.toLowerCase() > array[end].name.toLowerCase()) {
        array.splice(end + 1, 0, value)
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
