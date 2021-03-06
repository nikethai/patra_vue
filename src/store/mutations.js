export default {
  addUser: (state, data) => (state.userInfo = data),
  setUser: (state, logged) => (state.logged = logged),
  removeUser: (state) => (state.logged = []),
  removeUserInfo: (state) => (state.userInfo = []),
  addTask: (state, newTask) => state.task.push(newTask),
  setTask: (state, Task) => state.task = Task,
  getTask: (state, task) => (state.viewTask = task),
  getTaskByIndex: (state, index) => (state.viewTaskByIndex = index),
  editTaskView: (state, { newVal, currTask }) => {
    // let index = state.task.findIndex(x => x.taskName === currTask.taskName);
    if (state.viewTask.taskId === currTask.taskId) {
      console.log("Co tag id hen");
      
      state.viewTask.taskName = newVal;
    }
  },
  // editTask: (state, { newVal, currTask }) => {
  //   // let index = state.task.findIndex(x => x.taskName === currTask.taskName);
  //   if (state.viewTask.taskId === currTask.taskId) {
  //     console.log("hello con cac");
      
  //     state.viewTask.taskName = newVal;
  //   }
  // },
  submitComment: (state,{taskId,content}) => {
    if (state.viewTask.taskId === taskId && state.userInfo.name != null){
      
      console.log("right taskID");
      state.viewTask.comments.push()
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
  setEditButtonClick: state => (state.editButtonClicked = !state.editButtonClicked),
  setSnackbar: (state, content) => {
    state.snackbar.status = content.status;
    state.snackbar.message = content.message;

  },
  closeSnackbar: (state) => {
    state.snackbar.status = false;
  },
};
