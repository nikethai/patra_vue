export default {
  allUsers: state => state.logged,
  allTask: state => state.task,
  allSheet: state => state.sheet,
  getUserInfo: state => state.userInfo,
  getTaskView: state => state.viewTask,
  getTaskViewByIndex: state => state.viewTaskByIndex,
  getMem: state => state.mem,
  isLoginPressed: state => state.loginDialog,
  isRegisterPressed: state => state.registerDialog,
  isSnackbar: state => state.snackbar,
  isEditButtonClicked: state => state.editButtonClicked,
  getTaskViewStatus: state => {
    if (state.viewTask) {
      if (state.viewTask.statusId === 0) {
        return 'PENDING';
      } else if (state.viewTask.statusId === 1) {
        return 'IN PROGRESS';
      } else if (state.viewTask.statusId === 2) {
        return 'SUBMITTED';
      } else if (state.viewTask.statusId === 3) {
        return 'DONE';
      }
    }
  }
};
