<template>
  <div>
    <h1>Tags</h1>
    <v-list dense>
      <v-list-item v-for="tag in tags" :key="tag.name">
        <v-list-item-content>
          <v-text-field
            v-model="tag.name"
            :readonly="tag.readonly"
            :solo="tag.readonly"
            :flat="tag.readonly"
          ></v-text-field>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn v-if="tag.readonly" icon small @click="tag.readonly = false">
            <v-icon size="20" color="#333333">edit</v-icon>
          </v-btn>
          <v-btn v-if="!tag.readonly" icon small @click="updateTag(tag)">
            <v-icon size="20" color="#333333">done</v-icon>
          </v-btn>
          <v-btn icon small @click="removeTag(tag)">
            <v-icon size="20" color="#333333">delete</v-icon>
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
          Add Tag
          <v-btn icon color="#ffffff" @click="dialog = false">
            <v-icon color="#ffffff">close</v-icon>
          </v-btn>
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
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">
            cancel
          </v-btn>
          <v-btn type="submit" text>add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Snackbar that appears on form submission -->
    <v-snackbar v-model="snackbar">
      <!-- eslint-disable-next-line vue/no-v-html -->
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
  created() {
    this.loadTags()
  },
  methods: {
    async loadTags() {
      const { data } = await TagRepository.getAll()
      // add Boolean to toggele readonly state
      data.tags.forEach(tag => {
        tag.readonly = true
      })
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
      data.tag.readonly = true
      this._binaryInsert(data.tag, this.tags)
    },
    async removeTag(tag) {
      await TagRepository.deleteTag(encodeURIComponent(tag.name))
      this.tags = this.tags.filter(t => {
        return t.name !== tag.name
      })
    },
    async updateTag(tag) {
      tag.readonly = true
      const payload = {
        id: tag._id,
        newName: tag.name
      }
      const { data } = await TagRepository.updateTag(payload)
    },
    _clearForm() {
      this.tagName = ''
    },
    _binaryInsert(value, array, startVal, endVal) {
      const length = array.length
      const start = typeof startVal != 'undefined' ? startVal : 0
      const end = typeof endVal != 'undefined' ? endVal : length - 1
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
