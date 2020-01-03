import defaultSettings from '@/settings'

const title = defaultSettings.title || '家政服务预约平台e'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
