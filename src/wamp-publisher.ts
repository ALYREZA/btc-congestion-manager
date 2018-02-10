import { minDiff$, minedTxsSummary$, minsFromLastBlock$ } from './fee-estimator'
import { Observable } from 'rxjs'
import { config } from '../config'
import { Client } from 'thruway.js'

const wamp = new Client(config.wamp.url, config.wamp.realm)

wamp.publish('com.fee.minsfromlastblock', minsFromLastBlock$)
wamp.publish('com.fee.minedtxssummary', minedTxsSummary$)
wamp.publish(
  'com.fee.deals',
  minDiff$
    .retryWhen(errors =>
      errors
        .do(err => console.error(`Error: ${err}`))
        .delayWhen(val => Observable.timer(config.constants.timeRes * 10)))
)
