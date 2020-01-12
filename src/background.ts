import axios from "axios";
console.log("background");

chrome.runtime.onMessage.addListener(async ({ urlList }) => {
  if (!urlList) return;
  console.log(
    (await Promise.all((urlList as string[]).map(url => axios.get(url)))).map(
      x => x.data
    )
  );
});
