export default function truncateString(str, maxLength) {
  if (!str) {
    return
  }

  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...'
  }
  
  return str
}
