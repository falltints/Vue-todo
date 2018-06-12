const autoprefixer = require('autoprefixer'); // 优化css代码，为一些属性加上前缀（兼容不同浏览器）

module.exports = {
    plugins: [
        autoprefixer()
    ]
};