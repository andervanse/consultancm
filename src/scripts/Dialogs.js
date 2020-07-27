var Dialogs = function () {
  this.bindDialog = function (className, id, evtBtnOK) {
    var drawer = document.querySelector('.mdl-layout')
    var dialog = document.getElementById(id)
    var showDialogButtons = document.querySelectorAll('.' + className)

    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog)
    }

    showDialogButtons.forEach(function (btn) {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault()

        if (drawer.MaterialLayout.drawer_.classList.contains('is-visible')) {
          drawer.MaterialLayout.drawer_.classList.remove('is-visible')
          drawer.MaterialLayout.obfuscator_.classList.remove('is-visible')
        }
        dialog.removeAttribute('hidden')
        dialog.showModal()
      })
    })

    dialog.querySelector('.close').addEventListener('click', function (evt) {
      evt.preventDefault()
      dialog.close()
      dialog.setAttribute('hidden', true)
    })

    if (evtBtnOK) {
      dialog.querySelector('.ok').addEventListener('click', function (evt) {
        evt.dialog = dialog
        evtBtnOK(evt)
      })
    }
  }

  this.bindDialogYesNo = function (callback) {
    var dialog = document.getElementById('dlgYesNo')

    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog)
    }

    var btnYes = document.querySelector('#dlgYesNo .mdl-button.yes')
    btnYes.addEventListener('click', function (evt) {
      evt.preventDefault()
      callback(true)
      dialog.close()
      dialog.setAttribute('hidden', true)
    })
    var btnNo = document.querySelector('#dlgYesNo .mdl-button.no')
    btnNo.addEventListener('click', function (evt) {
      evt.preventDefault()
      callback(false)
      dialog.close()
      dialog.setAttribute('hidden', true)
    })

    dialog.removeAttribute('hidden')
    dialog.showModal()
  }

  return {
    bindDialog: this.bindDialog,
    bindDialogYesNo: this.bindDialogYesNo
  }
}

export default Dialogs
