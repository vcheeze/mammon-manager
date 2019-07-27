<template>
    <div>
        <h1>Categories</h1>
            <v-btn
              absolute
              dark
              fab
              bottom
              right
              color="pink"
            >
                <v-icon>add</v-icon>
            </v-btn>
    </div>
</template>

<script>
import { RepositoryFactory } from "../../api/RepositoryFactory"
const CategoryRepository = RepositoryFactory.get("categories")

export default {
    name: 'Categories',
    data() {
        return {
            showDialog: false
        }
    },
    methods: {
        addCategory() {
            CategoryRepository.createCategory();
        }
    }
}
</script>
