export default {
  allUsers: state => state.logged,
  allTask: state => state.task,
  allSheet: state => state.sheet,
  getUserInfo: state => state.userInfo,
  getTaskView: state => state.viewTask,
  getMem: state => state.mem,
  isLoginPressed: state => state.loginDialog,
  isRegisterPressed: state => state.registerDialog,
};
