export default {
  addUser: (state, data) => (state.userInfo = data),
  setUser: (state, logged) => (state.logged = logged),
  removeUser: (state) => (state.logged = []),
  removeUserInfo: (state) => (state.userInfo = []),
  addSheet: (state, Sheet) => state.sheet = Sheet,
  addTask: (state, newTask) => state.task.push(newTask),
  setTask: (state, task) => state.task = task,
  deleteTask: (state, delItem) => {
    let task = state.task;
    task.splice(task.findIndex(i => i.id === delItem), 1);
  },
  getTask: (state, task) => (state.viewTask = task),
  setLoginDialog: state => (state.loginDialog = !state.loginDialog),
  setRegisterDialog: state => (state.registerDialog = !state.registerDialog),
};
