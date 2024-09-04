import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  console.log('Navigating to:', to.fullPath);

  // Start progress bar
  NProgress.start()

  // Set page title
  document.title = getPageTitle(to.meta.title)

  // Determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // If logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // Ensure progress bar ends
    } else {
      next() // Allow access to the route
    }
  } else {
    next() // Allow access to the route even without a token
  }
})

router.afterEach(() => {
  // Finish progress bar
  NProgress.done()
})
