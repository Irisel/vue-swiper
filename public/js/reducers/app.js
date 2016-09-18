import { combineReducers } from 'redux'
import elong from './elong'
import layer from './layer'
import plugin from './plugin'

export default combineReducers({
  elong,
  layer,
  plugin
})