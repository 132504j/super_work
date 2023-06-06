import AddTodoPopup from '@/application/todo/utils/addTodo/AddTodoPopup.vue'
import {createApp} from 'vue'

// 创建唯一id
const id = 'app-todo-popup'
if (!document.getElementById(id)) {
    const div = document.createElement('div')
    div.id = id
    document.body.appendChild(div)
}

export default class AddTodo {

    /**
     * @type {App<Element>}
     * @private
     */
    static _instance = null

    static show() {
        if (!AddTodo._instance) {
            AddTodo._instance = createApp(AddTodoPopup).mount(`#${id}`)
        }
        AddTodo._instance.show()
    }
}
