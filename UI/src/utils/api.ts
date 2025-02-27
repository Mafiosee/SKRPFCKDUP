export const callClient = (eventName: string, data?: any): void => {
  if (data == null) {
    data = null
  }

  try {
    // @ts-expect-error qwe
    window.skyrimPlatform.sendMessage({ eventName, data })
  } catch (err) {
    console.log('Call client: ', {
      eventName,
      data,
    })
  }
}
