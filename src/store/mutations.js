export default {
    addUser: (state, data) => (state.logged.push(data)),
    setUser: (state, logged) => (state.logged = logged),
    addTask: (state, newTask) => (state.task.push(newTask)),
    deleteTask: (state, delItem) => {
        let task = state.task;
        task.splice(task.findIndex(i => i.id == delItem), 1);
    },
    getTask: (state, task) => (state.viewTask = task),
    setLoginDialog: (state ) => (state.loginDialog = !state.loginDialog),
    setRegisterDialog: (state ) => (state.registerDialog = !state.registerDialog),
    setUserInfo: (state) => (state.userInfo = !state.userInfo),
}