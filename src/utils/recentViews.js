const KEY = 'recentViews'
const MAX = 10

export function addRecentView(propertyId) {
    let list = JSON.parse(localStorage.getItem(KEY) || '[]')
    list.unshift(propertyId)
    list = list.slice(0, MAX)
    localStorage.setItem(KEY, JSON.stringify(list))
}

export function getRecentViews() {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
}