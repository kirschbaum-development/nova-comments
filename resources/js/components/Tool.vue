<template>
    <div>
        <h4 class="text-90 font-normal text-2xl mb-3">
            Comments
        </h4>

        <div class="bg-white dark:bg-gray-800 rounded-lg shadow pt-2">
            <div class="flex border-40 remove-bottom-border px-8">
                <div class="w-full pt-6 pb-2">
                    <h4 class="font-normal text-80">
                        Write new comment
                    </h4>

                    <textarea class="w-full form-control form-input form-input-bordered py-3 h-auto mt-2"
                        id="commenter"
                        dusk="commenter"
                        rows="5"
                        v-model="comment"
                        @keyup.enter.93="createComment">
                    </textarea>
                </div>
            </div>

            <div class="flex justify-between px-8 pb-4 border-b border-40">
                <div class="help-text">
                    On MacOS, press ⌘ + Enter to save
                </div>

                <button class="flex-shrink-0 shadow rounded focus:outline-none focus:ring bg-primary-500 hover:bg-primary-400 active:bg-primary-600 text-white dark:text-gray-800 inline-flex items-center font-bold px-4 h-9 text-sm flex-shrink-0 mb-2"
                    type="submit"
                    @click="createComment">
                    Save Comment
                </button>
            </div>

            <div class="flex border-b border-40 remove-bottom-border px-8" v-if="hasComments">
                <div class="w-full py-6">
                    <h3 class="text-90 font-bold text-lg mb-4">Comments</h3>

                    <comment :comment="comment" v-for="(comment, key) in data.resources" :key="key"></comment>
                </div>
            </div>

            <div class="bg-20 rounded-b" v-if="hasPagination">
                <nav class="flex justify-between items-center">
                    <button class="btn btn-link py-3 px-4"
                        :class="paginationClass(hasNextLink)"
                        :disabled="! hasNextLink"
                        @click="getComments(data.next_page_url)">
                        Older
                    </button>

                    <button class="btn btn-link py-3 px-4"
                        :class="paginationClass(hasPrevLink)"
                        :disabled="! hasPrevLink"
                        @click="getComments(data.prev_page_url)">
                        Newer
                    </button>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    import Comment from './Comment';

    export default {
        props: ['resourceName', 'resourceId', 'field'],

        components: { Comment },

        data() {
            return {
                baseCommentUri: '/nova-api/comments',
                comment: '',
                data: {
                    next_page_url: '',
                    prev_page_url: '',
                    resources: {}
                }
            }
        },

        mounted() {
            this.getComments(this.commentsUri);
        },

        computed: {
            commentsUri() {
                return `${this.baseCommentUri}?page=1`;
            },

            hasComments() {
                return Boolean(this.data.resources.length);
            },

            hasNextLink() {
                return Boolean(this.data.next_page_url);
            },

            hasPrevLink() {
                return Boolean(this.data.prev_page_url);
            },

            hasPagination() {
                return this.hasNextLink || this.hasPrevLink;
            },

            queryParams() {
                return `&orderBy=created_at&orderByDirection=desc&viaResource=${this.resourceName}&viaResourceId=${this.resourceId}&viaRelationship=comments&relationshipType=hasMany`;
            }
        },

        methods: {
            createComment() {
                if (! this.comment) {
                    return false;
                }

                let payload = {
                    comment: this.comment,
                    viaResource: this.resourceName,
                    viaResourceId: this.resourceId,
                    viaRelationship: 'comments',
                };

                Nova.request().post(this.baseCommentUri, payload)
                    .then(() => {
                        this.getComments(this.commentsUri);

                        this.resetComment();

                        Nova.success(`A new comment has been created.`);
                    })
                    .catch(response => Nova.error(response));
            },

            getComments(uri) {
                Nova.request().get(`${uri}${this.queryParams}`)
                    .then(({ data }) => this.data = data);
            },

            paginationClass(isActive) {
                return isActive
                    ? 'text-primary dim'
                    : 'text-80 opacity-50';
            },

            resetComment() {
                this.comment = '';
            }
        }
    }
</script>
