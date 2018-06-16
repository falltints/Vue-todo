<template>
    <section class="real-app">
        <input
                class="add-input"
                type="text"
                placeholder="接下来要做什么？"
                autofocus="autofocus"
                @keyup.enter="addTodo"
        >
        <!--autofocus设置为当页面加载时获得焦点-->
        <Item
                v-for="todo of filteredTodo"
                :key="todo.id" :todo="todo"
                @del="deleteTodo"
        ></Item>
        <Tabs
                :filter="filter"
                :todos="todos"
                @toggle="toggleFilter"
                @clearAllCompleted="clearAllCompleted"
        ></Tabs>
    </section>
</template>

<script>
import Item from './Item.vue'
import Tabs from './Tabs.vue'
let id = 0;
export default {
    name: 'Todo',
    components: {
        Item,
        Tabs
    },
    data () {
        return {
            todos: [],
            filter: 'all'
        }
    },
    computed : {
        filteredTodo () {
            if (this.filter === 'all') {
                return this.todos
            }
            const completed = this.filter === 'completed';
            return this.todos.filter(todo => todo.completed === completed);
        }
    },
    methods: {
        addTodo (e) {
            this.todos.unshift({
                id: id++,
                content: e.target.value.trim(),
                completed: false
            });
            e.target.value = ''; // 清空input框
        },
        deleteTodo (id) {
            this.todos.splice(this.todos.findIndex(todo => todo.id === id, 1));
        },
        toggleFilter (state) {
            this.filter = state;
        },
        clearAllCompleted () {
            this.todos = this.todos.filter(todo => !todo.completed);
        }
    }
}
</script>

<style lang="stylus" type="text/stylus" scoped>
.real-app
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
    .add-input
        box-sizing border-box
        padding 6px
        width 100%
        line-height 1.4em
        color inherit
        font-size 24px
        font-family inherit
        font-weight inherit
        border-bottom 1px solid #ccc
        box-shadow inset 0 1px 5px 0 rgba(0, 0, 0, 0.2) // inset: 内部阴影
</style>