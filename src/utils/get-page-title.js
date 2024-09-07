import defaultSettings from '@/settings'

const title = defaultSettings.title || '南京千川产品管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
