<template>
    <div class="commenter__comment py-4 border-t border-40">
        <div class="font-light text-80 text-sm">
            <template v-if="hasCommenter">
                <router-link
                    :to="{
                      name: 'detail',
                      params: {
                        resourceName: 'users',
                        resourceId: commenterId,
                      },
                    }"
                                class="no-underline font-bold dim text-primary"
                    v-text="commenter"></router-link>
                said
            </template>

            <template v-else>
                Written
            </template>

            {{ date }}
        </div>

        <div class="mt-2" v-html="commentString"></div>
    </div>
</template>

<script>
    // require('moment-timezone');

    export default {
        props: {
            comment: {
                type: Object,
                required: true
            }
        },

        computed: {
            commentString() {
                return _.find(this.comment.fields, { attribute: 'comment' }).value;
            },

            commenter() {
                return _.find(this.comment.fields, { attribute: 'commenter' }).value;
            },
            commenterId() {
                return _.find(this.comment.fields, { attribute: 'commenter' }).belongsToId;
            },

            date() {
                let now = moment();
                let date = moment.utc(_.find(this.comment.fields, { attribute: 'created_at' }).value)
                    .tz(moment.tz.guess());

                if (date.isSame(now, 'minute')) {
                    return 'just now';
                }

                if (date.isSame(now, 'day')) {
                    return `at ${date.format('LT')}`;
                }

                if (date.isSame(now, 'year')) {
                    return `on ${date.format('MMM D')}`;
                }

                return `on ${date.format('ll')}`;
            },

            hasCommenter() {
                return Boolean(this.commenter);
            }
        }
    }
</script>
