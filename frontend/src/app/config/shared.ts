export function waitFor(sec: number) {
  return new Promise(resolve => {
    setTimeout(resolve, sec);
  })
}
