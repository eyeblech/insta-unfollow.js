# insta-unfollow.js

- Go to your profile on instagram.com (sign in if not already)
- Click on `XXX following` for the popup with the users you're following to appear
- Open Chrome Devtools and Paste the following into the Console and hit return:
```js
(async function() {
  const UNFOLLOW_LIMIT = 800;
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const findButton = (txt) => [...document.querySelectorAll("button")].find(btn => btn.innerText === txt);

  console.log("Start");

  for (let i = 0; i < UNFOLLOW_LIMIT; i++) {
    const $next = findButton("Following");
    if (!$next) {
      console.log(`No more users to unfollow, stopping at ${i} unfollows.`);
      break;
    }

    $next.scrollIntoViewIfNeeded();
    $next.click();
    await delay(100);

    let $confirm = findButton("Unfollow");
    if ($confirm) {
      $confirm.click();
      await delay(100);

      // Verify if the unfollow was successful
      $confirm = findButton("Follow");
      if ($confirm) {
        console.log(`Unfollowed #${i + 1}`);
      } else {
        console.log(`Failed to unfollow #${i + 1}`);
        i--; // Do not count this as a successful unfollow
      }
    } else {
      console.log(`Failed to find the "Unfollow" confirmation button for #${i + 1}`);
      i--; // Do not count this as a successful unfollow
    }

    await delay(20 * 1000); // Wait 20 seconds, Instagram allows about 200 unfollows per hour
  }

  console.log("The end");
})();

```

![unfollow](https://github.com/user-attachments/assets/a1be661f-8ff7-4a16-9f3a-04b3a8d091f8)

* better and improved code

* reference - [@berstend](https://gist.github.com/berstend/752e7b54fd0bbd8b672882459d149b60)   and    [@macedonga](https://gist.github.com/berstend/752e7b54fd0bbd8b672882459d149b60?permalink_comment_id=4716223#gistcomment-4716223)
