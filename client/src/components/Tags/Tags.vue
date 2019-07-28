<template>
    <div>
        <h1>Tags</h1>
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn dark depressed fab color="#f76262" v-on="on">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
            <v-card class="add-cat-card">
                <v-card-title primary-title>
                    Add Tag
                </v-card-title>
                <v-card-text>
                    <v-form v-model="valid">
                        <v-text-field
                            v-model="tagName"
                            label="Name"
                            color="#216583"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="categoryName"
                            label="category"
                            color="#216583"
                        ></v-text-field>
                        <v-btn depressed @click="addTag">submit</v-btn>
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
const TagRepository = RepositoryFactory.get('tags')

export default {
    name: 'Tags',
    data() {
        return {
            dialog: false,
            valid: false,
            tagName: '',
            categoryName: ''
        }
    },
    methods: {
        async addTag() {
            const payload = {
                name: this.tagName,
                category: this.categoryName
            }
            const { data } = await TagRepository.createTag(payload)
            console.log(data)
        }
    }
}
</script>
