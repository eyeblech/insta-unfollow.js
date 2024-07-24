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
