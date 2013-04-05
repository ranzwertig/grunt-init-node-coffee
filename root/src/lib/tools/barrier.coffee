'use strict'
class Barrier

    constructor: (@parties, @barrierCallback, @abortCallback=->) ->
        @running = true
        @count = 0

    submit: =>
        if ++@count is @parties and @running
            @barrierCallback()

    abort: (customAbortCallback) =>
        if @running and customAbortCallback
            customAbortCallback()

        else if @running and @abortCallback
            @abortCallback()

        @running = false

    skip: =>
        @barrierCallback()

module.exports = Barrier
        