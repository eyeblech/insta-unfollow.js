# insta-unfollow.js

- Go to your profile on instagram.com (sign in if not already)
- Click on `XXX following` for the popup with the users you're following to appear
- Open Chrome Devtools and Paste the following into the Console and hit return:
```js
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
```

![unfollow](https://github.com/user-attachments/assets/a1be661f-8ff7-4a16-9f3a-04b3a8d091f8)


all thanks to - [@berstend](https://github.com/berstend) and - [@macedonga](https://github.com/macedonga)
