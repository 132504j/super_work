import sports2 from '../../assets/images/sports2.png'
import todoLine from '../../assets/images/todo-line.png'
import rl from '../../assets/images/rl.png'


export default {
    /**
     *
     * @returns {Promise<[{iconBackgroundColor: string, icon: *, name: string},{routePath: string, iconBackgroundColor: string, icon: *, name: string},{iconBackgroundColor: string, icon: *, name: string}]>}
     */
    async getAllApp() {
        return [
            {icon: todoLine, name: 'Todo', iconBackgroundColor: 'var(--theme-color)', routePath: '/todo'},
            {icon: sports2, name: '运动打卡', iconBackgroundColor: 'var(--ion-color-danger)'},
            {icon: rl, name: '日历', iconBackgroundColor: 'var(--ion-color-success)'}
        ]
    }
}
