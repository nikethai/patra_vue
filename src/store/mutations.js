export default {
  addUser: (state, data) => (state.userInfo = data),
  setUser: (state, logged) => (state.logged = logged),
  removeUser: (state) => (state.logged = []),
  removeUserInfo: (state) => (state.userInfo = []),
  addTask: (state, newTask) => state.task.push(newTask),
  setTask: (state, Task) => state.task = Task,
  getTask: (state, task) => (state.viewTask = task),
  editTaskView: (state, { newVal, currTask }) => {
    // let index = state.task.findIndex(x => x.taskName === currTask.taskName);
    if (state.viewTask.taskId === currTask.taskId) {
      console.log("hello con cac");
      
      state.viewTask.taskName = newVal;
    }
  },
  deleteTask: (state, delItem) => {
    let task = state.task;
    task.splice(task.findIndex(i => i.id === delItem), 1);
  },
  addSheet: (state, Sheet) => state.sheet = Sheet,
  addMem: (state, mem) => state.mem = mem,
  setLoginDialog: state => (state.loginDialog = !state.loginDialog),
  setRegisterDialog: state => (state.registerDialog = !state.registerDialog),
  setSnackbar: (state, content) => {
    state.snackbar.status = content.status;
    state.snackbar.message = content.message;

  },
};
