<template>
    <div id="app">
        <div class="cover"></div>
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>
<script>
import Header from './todo/Header.vue'
import Footer from './todo/Footer.jsx'
import Todo from './todo/Todo.vue'
export default {
    components: {
        Header,
        Footer,
        Todo
    }
}
</script>
<style type="text/stylus" scoped lang="stylus">
#app
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    .cover
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #999
        opacity .8
        z-index -1
</style>