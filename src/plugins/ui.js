import Vue from 'vue'
import VueLetterAvatar from 'vue-letter-avatar'
import { Loading, Message, EmptyTip, CheckModal } from '@/components/public'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(VueLetterAvatar)
Vue.component("cx-loading", Loading)
Vue.component("cx-message", Message)
Vue.component('cx-empty-tip', EmptyTip)
Vue.component('cx-check-modal', CheckModal)
