'use strict'

import Clock from './Clock.js'
import { status, timeDirection } from './Enums.js'

function Countdown (name, seconds, stepNumber) {
  this.clock = new Clock(name, seconds, timeDirection.BACKWARD, stepNumber)
  var subscriber = function (eventArgs) {
    var startBeepAt = eventArgs.initialSeconds - (eventArgs.initialSeconds - 2)
    if (
      startBeepAt >= eventArgs.totalSeconds ||
      eventArgs.status == status.ENDED
    ) {
      import ('./Beep.js').then(function (m) {
        var beep = new m.default()
        beep.beep()
      })
    }
  }

  this.clock.subscribe(subscriber)

  this.subscribe = function (fn) {
    this.clock.subscribe(fn)
  }
  this.unsubscribe = function (fn) {
    this.clock.unsubscribe(fn)
  }
  this.start = function () {
    this.clock.start()
  }
  this.pause = function () {
    this.clock.pause()
  }
  this.resume = function () {
    this.clock.resume()
  }
  this.reset = function () {
    this.clock.reset()
  }
}

export default Countdown
