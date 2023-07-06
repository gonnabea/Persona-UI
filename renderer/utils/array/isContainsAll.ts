const isContainsAll = <A>(parentArray: A[], childArray: A[]) => {
  return childArray.every((value: A) => {
    return parentArray.includes(value)
  })
}

export default isContainsAll
