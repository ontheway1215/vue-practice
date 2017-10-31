import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Search from '@/components/search'
import Gifdetail from '@/components/gifdetail'
import Agreement from '@/components/agreement'
import Scroller from '@/components/scroller'
import U from '@/components/u'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/search/:id',
      name: 'Search',
      component: Search
    },
    {
      path: '/gifdetail/:id',
      name: 'Gifdetail',
      component: Gifdetail
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/scroller',
      name: 'Scroller',
      component: Scroller
    },
    {
      path: '/u/:id',
      name: 'U',
      component: U
    }
  ]
})
