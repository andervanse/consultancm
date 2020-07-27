'use strict'

import { status, timeDirection } from './Enums.js'

function Clock (name, initialSeconds, direction, stepNumber) {
  this.name = name
  this.initialSeconds = initialSeconds
  this.totalSeconds = initialSeconds
  this.direction = direction
  this.stepNumber = stepNumber
  this.minutes = 0
  this.seconds = 0
  this.status = status.PAUSED
  this.eventHandlers = []
  this.startedAt = null
  this.finishedAt = null

  this.subscribe = function (fn) {
    this.eventHandlers.push(fn)
  }

  this.unsubscribe = function (fn) {
    this.eventHandlers = this.eventHandlers.filter(function (item) {
      if (item != fn) {
        return item
      }
    })
  }

  this.fireEvent = function (o, thisObj) {
    var scope = thisObj || window
    this.eventHandlers.forEach(function (item) {
      item.call(scope, o, scope)
    })
  }

  this.start = function () {
    if (!this.startedAt) {
      this.startedAt = new Date()
    }

    if (!this.interval) {
      var self = this
      this.interval = setInterval(function () {
        if (self.direction == timeDirection.BACKWARD) {
          self.totalSeconds -= 1
        } else {
          self.totalSeconds += 1
        }
        self.minutes = Math.floor((self.totalSeconds / 60) % 60)
        self.seconds = parseInt(self.totalSeconds % 60)

        if (self.minutes == 0 && self.seconds == 0) {
          self.finishedAt = new Date()
          self.status = status.ENDED
          clearInterval(self.interval)
          delete self.interval
          self.totalSeconds = self.initialSeconds
        } else {
          self.status = status.RUNNING
        }

        self.fireEvent(
          {
            name: self.name,
            intervalNumber: self.interval,
            initialSeconds: self.initialSeconds,
            totalSeconds: self.totalSeconds,
            minutes: self.minutes,
            seconds: self.seconds,
            status: self.status,
            stepNumber: self.stepNumber,
            startedAt: self.startedAt,
            finishedAt: self.finishedAt
          },
          self
        )
      }, 1000)
    }
  }
  
  this.reset = function () {
      this.minutes = this.initialSeconds / 60
      this.seconds = 0
      this.fireEvent(
        {
          name: this.name,
          intervalNumber: this.interval,
          initialSeconds: this.initialSeconds,
          totalSeconds: this.totalSeconds,
          minutes: this.minutes,
          seconds: this.seconds,
          status: this.status,
          stepNumber: this.stepNumber,
          startedAt: this.startedAt,
          finishedAt: this.finishedAt
        },
        this
      )
      this.totalSeconds = this.initialSeconds
      this.pause()
    }

    this.pause = function () {
      this.status = status.PAUSED
      this.fireEvent(
        {
          name: this.name,
          intervalNumber: this.interval,
          initialSeconds: this.initialSeconds,
          totalSeconds: this.totalSeconds,
          minutes: this.minutes,
          seconds: this.seconds,
          status: this.status,
          stepNumber: this.stepNumber,
          startedAt: this.startedAt,
          finishedAt: this.finishedAt
        },
        this
      )
      clearInterval(this.interval)
      delete this.interval
    }
    
    this.resume = function () {
      this.status = status.RUNNING
      this.start()
    }
}

export default Clock
