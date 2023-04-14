
function showCopiedMessage(e) {
  const message = document.createElement('div');
  message.textContent = 'URLがコピーされました!';
  message.classList.add('copied-message');
  message.style.left = `${e.pageX + 20}px`;
  message.style.top = `${e.pageY + 20}px`;
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 2000);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Unable to copy text to clipboard', err);
  }
}

function url() {
  const copyUrlBtns = document.querySelectorAll(".copy-url");

  copyUrlBtns.forEach(function (copyUrlBtn) {
    copyUrlBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const loungeUrl = this.getAttribute("data-url");
      console.log(loungeUrl);
      copyToClipboard(loungeUrl);
      showCopiedMessage(e);
    });
  });
}

window.addEventListener('load', url);