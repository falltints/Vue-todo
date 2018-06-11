<template>
    <div id="test">{{ test }}</div>
</template>
<script>
export default {
    name: 'App',
    data () {
        return {
            test: 'testing...'
        }
    }
}
</script>
<style>
#test {
    color: darkcyan;
    font-size: 20px;
    text-align: center;
}
</style>