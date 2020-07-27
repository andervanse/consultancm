

function notification (msg) {
    var snackbarContainer = document.getElementById('toast-notification')
    if (snackbarContainer && snackbarContainer.MaterialSnackbar) {
      var data = { message: msg, timeout: 1500 }
      snackbarContainer.MaterialSnackbar.showSnackbar(data)
    }
}

export default notification;