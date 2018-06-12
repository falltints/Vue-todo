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
    color: white;
    font-size: 30px;
    text-align: center;
    font-family: "Lucida Handwriting";
    letter-spacing: 3px;
}
</style>