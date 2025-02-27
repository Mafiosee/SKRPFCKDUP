export const callClient = (eventName: string, data?: any): void => {
  if (data == null) {
    data = null
  }

  console.log('Call client: ', {
    eventName,
    data,
  })
  try {
    // @ts-expect-error qwe
    window.skyrimPlatform.sendMessage({ eventName, data })
  } catch (err) {
    /* empty */
  }
}
