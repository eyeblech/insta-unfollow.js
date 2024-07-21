(async function(){
  const UNFOLLOW_LIMIT = 800
  const delay = (ms) => new Promise(_ => setTimeout(_, ms))
  const findButton = (txt) => [...document.querySelectorAll("button").entries()].map(([pos, btn]) => btn).filter(btn => btn.innerText === txt)[0]

  console.log("Start")
  for (let i = 0; i < UNFOLLOW_LIMIT; i++) {
    const $next = findButton("Following")          
    if (!$next) { continue }
    $next.scrollIntoViewIfNeeded()  
    $next.click()
    await delay(100)
    $confirm = findButton("Unfollow")    
    if ($confirm) {
      $confirm.click()
    }

    await delay(20 * 1000) // Wait 20s, 200 unfollows per hour limit
    console.log(`Unfollowed #${i}`)
  }

  console.log("The end")
})()
