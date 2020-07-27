'use strict'

import SendContactEmail from './send-contact-email.js'
import Dialogs from './Dialogs.js'
import notification from './Notification.js'
import SearchNCM from './SearchNCM.js'

function App () {
  this.dialogs = new Dialogs()
  this.edtNCM = document.getElementById('edtNCM')
  this.btnSearch = document.getElementById('btn-search')
  this.lblResultado = document.getElementById('resultado-pesquisa')
  this.table = document.getElementById('ncmTable')
  this.table.setAttribute('hidden', true)
  var self = this

  self.initialize = function () {

    self.edtNCM.addEventListener('keyup', function (evt) {
      if (evt.target.value === '') {
        self.lblResultado.textContent = ''
      }

    })

    self.btnSearch.addEventListener('click', function (evt) {
      evt.preventDefault()
      console.log('NCM:', self.edtNCM.value)

      if (!self.edtNCM.value) {
        return
      }

      var value = self.edtNCM.value.toString().replace('.', '')
      var pattern = /^\d+$/;
      if (!pattern.test(value)) {
        notification('Digite apenas dígitos numéricos')
        return
      }

      var tbodyElement = document.querySelector('.mdl-data-table tbody')
      for (i = 0; i < tbodyElement.children.length; i++) {
        tbodyElement.children[i].remove()
      }
      var trElement
      var tdNumberElement,
        tdCodigoElement,
        tdDescElement,
        tdVigenteElement,
        tdInclusaoElement,
        tdNormaInclusaoElement,
        tdExclusaoElement,
        tdNormaExclusaoElement
      var i
      var search = new SearchNCM()
      search.search(self.edtNCM.value).then(function (data) {
        console.log(data)

        if (data.length == 0) {
          self.lblResultado.textContent = 'Sua pesquisa não retornou nenhum registro'
          return
        }

        self.table.removeAttribute('hidden', false)

        for (i = 0; i < data.length; i++) {
          if (i <= 20) {
            trElement = document.createElement('tr')
            tdNumberElement = document.createElement('td')
            tdNumberElement.textContent = (i + 1)
            tdCodigoElement = document.createElement('td')
            tdCodigoElement.className = 'mdl-data-table__cell--non-numeric'
            tdCodigoElement.textContent = data[i]['codigo-ncm']
            tdDescElement = document.createElement('td')
            tdDescElement.className = 'mdl-data-table__cell--non-numeric'
            tdDescElement.textContent = data[i]['nome-pt']
            tdVigenteElement = document.createElement('td')
            tdVigenteElement.textContent = data[i]['vigente']
            tdInclusaoElement = document.createElement('td')
            tdInclusaoElement.textContent = data[i]['inclusao']
            tdNormaInclusaoElement = document.createElement('td')
            tdNormaInclusaoElement.textContent = data[i]['norma-inclusao']
            tdExclusaoElement = document.createElement('td')
            tdExclusaoElement.textContent = data[i]['exclusao']
            tdNormaExclusaoElement = document.createElement('td')
            tdNormaExclusaoElement.textContent = data[i]['norma-exclusao']

            trElement.appendChild(tdNumberElement)
            trElement.appendChild(tdCodigoElement)
            trElement.appendChild(tdDescElement)
            trElement.appendChild(tdVigenteElement)
            trElement.appendChild(tdInclusaoElement)
            trElement.appendChild(tdNormaInclusaoElement)
            trElement.appendChild(tdExclusaoElement)
            trElement.appendChild(tdNormaExclusaoElement)

            tbodyElement.appendChild(trElement)
            self.lblResultado.textContent = 'Sua pesquisa retornou ' + (i + 1) + ' registro' + (i + 1 > 1 ? 's' : '')
          } else {
            self.lblResultado.textContent = 'Sua pesquisa retornou 20+ registros'
          }
        }
      })
    })

    self.dialogs.bindDialog('contact-link', 'dlgContact', function (evt) {
      evt.preventDefault()
      var name = document.getElementById('name').value
      var email = document.getElementById('email').value
      var comment = document.getElementById('comment').value
      var data = { name, email, comment }
      var contact = new SendContactEmail()
      contact.submit(data).then(function (response) {
        notification(response.message)
        if (response.success) evt.dialog.close()
      })
    })
  }

  return {
    init: this.initialize
  }
}

export default App
