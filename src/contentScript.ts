console.log("content");

chrome.runtime.onMessage.addListener(() => {
  const links = document.getElementsByTagName("a");
  chrome.runtime.sendMessage({
    urlList: [...links].map((a: HTMLAnchorElement) => a.href).filter(x => x)
  });
});
