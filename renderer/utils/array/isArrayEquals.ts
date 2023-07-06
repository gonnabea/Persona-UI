const isArrayEquals = <A>(a: A[], b: A[]) => {
  if (a.toString() === b.toString()) return true

  return false
}

export default isArrayEquals
