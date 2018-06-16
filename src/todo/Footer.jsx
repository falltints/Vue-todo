// 用js写html(虚拟DOM)
import '../assets/styles/footer.styl'

export default {
    data () {
        return {
            author: 'falltints'
        }
    },
    render () {
        return (
            <div class="footer">
                <span>Written by {this.author}</span>
            </div>
        )
    }
}