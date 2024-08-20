export default function hidePassword(password) {
  if (!password) {
    return
  }

  let newPassword = ''

  for (let i = 0; i < password.length; i++) {
    newPassword += '*'
  }

  return newPassword
}
