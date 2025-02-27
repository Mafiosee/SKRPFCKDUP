type Props = {
  value: string
  setFunc: (value: string | number) => void
  checkFunc?: (value: number) => boolean
}

export const onChangeInput = ({
  value,
  setFunc,
  checkFunc = () => true,
}: Props): void => {
  if (!value.length) {
    return setFunc('')
  }
  const intValue = parseInt(value)
  if (isNaN(intValue) || !checkFunc(intValue)) {
    return
  }
  setFunc(intValue)
}
