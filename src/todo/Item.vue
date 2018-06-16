<template>
    <div :class="['todo-item', todo.completed ? 'completed' : '']">
        <input type="checkbox" class="toggle" v-model="todo.completed">
        <label>{{ todo.content }}</label>
        <button class="destroy" @click="deleteTodo"></button>
    </div>
</template>

<script>
export default {
    name: 'Item',
    props: {
        todo: {
            type: Object,
            required: true
        }
    },
    methods: {
        deleteTodo () {
            this.$emit('del', this.todo.id)
        }
    }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
.todo-item
    font-size 24px
    border-bottom 1px solid rgba(0, 0, 0, 0.06)
    background-color #ffffff
    height 50px
    line-height 50px
    display flex
    .destroy
        float left
        width 40px
        height 100%
        font-size 30px
        color #cc9a9a
        transition color 0.2s ease-out
        background-color transparent
        appearance none
        cursor pointer
    &:hover
        .destroy:after
            content '×'
    label
        flex 1
        white-space pre-line // 合并空白符序列，但是保留换行符。
        word-break break-all // 允许在单词内换行。
        padding-left 20px
        transition color 0.4s
    &.completed
        label
            color #d9d9d9
            text-decoration line-through

.toggle
    width 40px
    height 100%
    background-image url('../assets/images/round.svg')
    background-position center center
    background-repeat no-repeat
    appearance none
    &:checked
        background-image url('../assets/images/done.svg')
</style>