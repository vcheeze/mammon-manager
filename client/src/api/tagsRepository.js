import Repository from './Repository'

const resource = '/tags'

export default {
    getAll() {
        return Repository.get(`${resource}`)
    },
    getTag(tagName) {
        return Repository.get(`${resource}/${tagName}`)
    },
    createTag(payload) {
        return Repository.post(`${resource}`, payload)
    }
}
