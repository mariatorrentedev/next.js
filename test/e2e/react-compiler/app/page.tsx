'use client'

export default function Page() {
  let heading = null
  // @ts-ignore Hack to see if react compiler is working
  const $_ = eval('$')
  if (Array.isArray($_)) {
    // console.log("useMemoCache", $_);
    heading = (
      <h1 className="text-9xl">
        {/* @ts-ignore */}
        React compiler is enabled with <strong>{$_.length}</strong> memo slots
      </h1>
    )
  }

  return (
    <>
      <div>
        {heading}
        <p>hello world</p>
      </div>
    </>
  )
}
