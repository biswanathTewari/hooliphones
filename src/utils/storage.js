const prefix = 'cache'

const store = async (key, value) => {
  const item = {
    value,
    timeStamp: Date.now(),
  }

  try {
    localStorage.setItem(prefix + key, JSON.stringify(item))
  } catch (err) {
    console.log(err)
  }
}

const get = async key => {
  try {
    const value = localStorage.getItem(prefix + key)
    const item = JSON.parse(value)

    if (!item) return null

    return item.value
  } catch (err) {
    console.log(err)
  }
}

export default { store, get }
