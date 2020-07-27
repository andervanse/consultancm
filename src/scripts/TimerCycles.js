'use strict'

import Countdown from './Countdown.js'
import { status } from './Enums.js'

function TimerCycles (updateEvent, secondsPerWork, secondsPerBreak, totalCycles) {
  this.secondsPerWork = secondsPerWork
  this.secondsPerBreak = secondsPerBreak
  this.totalCycles = totalCycles
  this.currentCountdown = null
  this.promises = []

  var self = this

  var setSubscribes = function (countdown, resolve) {
    countdown.subscribe(updateEvent)
    countdown.subscribe(function (eventArgs, obj) {
      //console.log('tick', obj)
      self.currentCountdown = obj
      if (eventArgs.status == status.ENDED) {
        resolve()
      }
    })
    countdown.start()
  }

  var createWorkCountdownPromise = function (stepNumber) {
    return new Promise(function (resolve, reject) {
      setSubscribes(new Countdown('WORK', self.secondsPerWork, stepNumber),
        resolve
      )
    })
  }

  var createBreakCountdownPromise = function (stepNumber) {
    return new Promise(function (resolve, reject) {
      var seconds = self.secondsPerBreak
      setSubscribes(new Countdown('REST', seconds, stepNumber), resolve)
    })
  }

  var executeSequentially = function (promises) {
    var result = Promise.resolve()
    promises.forEach(function (promise) {
      result = result.then(promise)
    })
    return result
  }

  this.startCyle = function () {
    self.promises = []
    var i = 0
    var workStepNumber = 1
    var breakStepNumber = 2

    for (i = 0; i < self.totalCycles; i++) {
      self.promises.push(createWorkCountdownPromise.bind(null, workStepNumber))
      self.promises.push(createBreakCountdownPromise.bind(null, breakStepNumber)
      )
      workStepNumber = breakStepNumber + 1
      breakStepNumber = workStepNumber + 1
    }
    executeSequentially(self.promises)
  }

  this.resume = function () {
    if (self.currentCountdown) {
      self.currentCountdown.resume()
    }
  }

  this.pause = function () {
    if (self.currentCountdown) {
      self.currentCountdown.pause()
    }
  }

  this.reset = function () {
    if (self.currentCountdown) {
      self.currentCountdown.reset()
    }
  }  

  this.setCycle = function (secondsPerWork, secondsPerBreak, totalCycles) {
    self.totalCycles = totalCycles
    self.secondsPerWork = secondsPerWork
    self.secondsPerBreak = secondsPerBreak

    if (self.currentCountdown) {
      self.currentCountdown.pause()
    }
  }
}

export default TimerCycles
