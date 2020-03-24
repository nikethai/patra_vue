export default {
  allUsers: state => state.logged,
  allTask: state => state.task,
  getTaskView: state => state.viewTask,
  isLoginPressed: state => state.loginDialog,
  isRegisterPressed: state => state.registerDialog,
};
