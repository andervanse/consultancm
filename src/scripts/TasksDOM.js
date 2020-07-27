import Dialogs from './Dialogs.js'
import notification from './Notification.js'

var TasksDOM = function () {

    this.dialogs = new Dialogs()
    self = this

    this.addTask = function (task) {
        if (task && task.description) {  
          
          if (task.description.length <= 3) {
            notification('minimum of 4 characteres')
            return
          }
    
          var ulElement = document.querySelector('.list-control');
          var liElement = document.createElement('li')
    
          liElement.className = 'mdl-list__item'
          liElement.id = 'li'+task.id;
          var spanElement = document.createElement('span')
          spanElement.className = 'mdl-list__item-secondary-action'
          var labelElement = document.createElement('label')
          labelElement.className = 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'      
          labelElement.setAttribute('for', 'ipt'+task.id)
    
          var inputElement = document.createElement('input')
          inputElement.type = 'checkbox'      
          inputElement.id = 'ipt'+task.id
          inputElement.className = 'mdl-checkbox__input'
          labelElement.appendChild(inputElement)
    
          var spanTaskDescElement = document.createElement('span')
          spanTaskDescElement.className = 'mdl-list__item-primary-content'
          spanTaskDescElement.textContent = task.description
          spanElement.appendChild(labelElement)
    
          var spanChipElement = document.createElement('span')
          spanChipElement.className = 'mdl-chip'
          var spanChipTextElement = document.createElement('span')
          spanChipTextElement.className = 'mdl-chip__text'
          spanChipTextElement.textContent = '0 Set'
          spanChipElement.appendChild(spanChipTextElement)
                
          var linkDeleteElement = document.createElement('a')
          linkDeleteElement.href = '#'
          var imgDeleteElement = document.createElement('img')
          imgDeleteElement.src = '/images/baseline_remove_circle_outline_black_18.png'
          imgDeleteElement.dataset.id = task.id
          linkDeleteElement.appendChild(imgDeleteElement)
          linkDeleteElement.addEventListener('click', function (evt) {
            
          self.dialogs.bindDialogYesNo(function (anwser) {
              if (anwser) {
                task.onDelete(evt.target.dataset.id)
                evt.preventDefault()
                evt.target.parentElement.parentElement.remove()
              }
            })
          })
    
          liElement.appendChild(spanElement)
          liElement.appendChild(spanTaskDescElement)
          liElement.appendChild(spanChipElement)
          liElement.appendChild(linkDeleteElement)
          ulElement.appendChild(liElement)      
          componentHandler.upgradeElement(labelElement)
        }
    }

    return {
        addTask: this.addTask
    }
}

export default TasksDOM;