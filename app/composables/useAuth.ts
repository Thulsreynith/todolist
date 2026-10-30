type User = {
  username: string
  password: string
}

export const useAuth = () => {
  const users = useState<User[]>('auth-users', () => [])

  const isLoggedIn = useState<boolean>(
    'auth-is-logged-in',
    () => false
  )

  const username = useState<string>(
    'auth-username',
    () => ''
  )

  const register = (name: string, password: string) => {
    const cleanName = name.trim()

    if (!cleanName || !password) {
      return {
        ok: false,
        error: 'Please enter username and password.'
      }
    }

    if (users.value.some(user =>
      user.username.toLowerCase() === cleanName.toLowerCase()
    )) {
      return {
        ok: false,
        error: 'Username already exists.'
      }
    }

    if (password.length < 6) {
      return {
        ok: false,
        error: 'Password must be at least 6 characters.'
      }
    }

    users.value.push({
      username: cleanName,
      password
    })
    username.value = cleanName
    isLoggedIn.value = true

    return { ok: true, error: '' }
  }

  const login = (name: string, password: string) => {
    const cleanName = name.trim()

    const user = users.value.find(user =>
      user.username.toLowerCase() === cleanName.toLowerCase() &&
      user.password === password
    )

    if (!user) {
      return {
        ok: false,
        error: 'Invalid username or password.'
      }
    }

    username.value = user.username
    isLoggedIn.value = true

    return { ok: true, error: '' }
  }

  const logout = () => {
    isLoggedIn.value = false
    username.value = ''
  }

  return {
    users,
    isLoggedIn,
    username,
    register,
    login,
    logout
  }
}
