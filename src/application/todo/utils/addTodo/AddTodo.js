import AddTodoPopup from '@/application/todo/utils/addTodo/AddTodoPopup.vue'
import {createApp} from 'vue'
import TodoService from '@/application/todo/services/TodoService.js'

// 创建唯一id
const id = 'app-todo-popup'
if (!document.getElementById(id)) {
    const div = document.createElement('div')
    div.id = id
    document.body.appendChild(div)
}

export default class AddTodo {

    /**
     * vue实例
     * @private
     */
    static _appInstance = null

    /**
     * 组件实例
     * @private
     */
    static _componentInstance = null

    static show(callback) {
        if (AddTodo._appInstance) {
            AddTodo._appInstance.unmount()
            AddTodo._componentInstance = null
        }
        AddTodo._appInstance = createApp(AddTodoPopup, {
            onConfirm: async content => {
                await TodoService.add(content)
                if (callback) {
                    callback(content)
                }
            }
        })
        AddTodo._componentInstance = AddTodo._appInstance.mount(`#${id}`)
        AddTodo._componentInstance.show()
    }
}
