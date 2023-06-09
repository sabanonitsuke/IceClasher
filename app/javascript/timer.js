function timer() {
  const resetBtn = document.getElementById('reset-btn');
  const playBtn = document.getElementById('play-btn');
  const nextBtn = document.getElementById('next-btn');
  const memberDisplay = document.getElementById('member-display');
  const topicDisplay = document.getElementById('topic-display');
  const people = document.getElementById('people');
  const memberSubmit = document.getElementById('member-submit');
  const topicSubmit = document.getElementById('topic-submit');
  const loungeId = document.getElementById('lounge-main').dataset.lounge_id;
  const doubleLine = document.getElementById('double-line');
  const timerElement = document.getElementById("seconds");
  let timeLeft = parseInt(timerElement.dataset.time);
  const timeLeftDef = timeLeft
  let timerInterval;

  updateMembers();
  updateTopics();
  updateMemberItems();
  updateTopicItems();
  updatePeople();
  if (members.length >= 1) {
    next();
  }

  // 実行処理
  function updateMembers() {
    members = Array.from(document.querySelectorAll('#member-list li')).map(li => li.textContent);
    usedMembers = [];
  }

  function updateTopics() {
    topics = Array.from(document.querySelectorAll('#topic-list li')).map(li => li.textContent);
  }

  function updateMemberItems() {
    const memberDelBtns = document.querySelectorAll(".member-del-btn");
    memberDelBtns.forEach(function (memberDelBtn) {
      if (memberDelBtn.dataset.listenerAdded !== 'true') {
        memberDelBtn.dataset.listenerAdded = 'true'
        memberDelBtn.addEventListener('click', function () {
          const memberId = memberDelBtn.getAttribute("data-member_id");
          const XHR = new XMLHttpRequest();
          XHR.open("DELETE", `/lounges/${loungeId}/members/${memberId}`, true);
          const token = document.querySelector('meta[name="csrf-token"]').content;
          XHR.setRequestHeader('X-CSRF-Token', token);
          XHR.send();
          XHR.onload = () => {
            if (XHR.status === 204) {
              memberDelBtn.parentElement.remove();
              reset();
            } else {
              alert(`Error ${XHR.status}: ${XHR.statusText}`);
            };
          };
        });
      }
    });
  }

  function updateTopicItems() {
    const topicDelBtns = document.querySelectorAll(".topic-del-btn");
    topicDelBtns.forEach(function (topicDelBtn) {
      if (topicDelBtn.dataset.listenerAdded !== 'true') {
        topicDelBtn.dataset.listenerAdded = 'true'
        topicDelBtn.addEventListener('click', function () {
          const topicId = topicDelBtn.getAttribute("data-topic_id");
          const XHR = new XMLHttpRequest();
          XHR.open("DELETE", `/lounges/${loungeId}/topics/${topicId}`, true);
          const token = document.querySelector('meta[name="csrf-token"]').content;
          XHR.setRequestHeader('X-CSRF-Token', token);
          XHR.send();
          XHR.onload = () => {
            if (XHR.status === 204) {
              topicDelBtn.parentElement.remove();
              reset();
            } else {
              alert(`Error ${XHR.status}: ${XHR.statusText}`);
            };
          };
        });
      }
    });
  }

  function updatePeople() {
    people.innerHTML = members.length
  };

  function reset() {
    memberDisplay.textContent = "メンバーをここに表示"
    topicDisplay.textContent = "トピックをここに表示"
    updateMembers();
    updateMemberItems();
    updatePeople();
    timerElement.textContent = timeLeftDef;
    timeLeft = timeLeftDef
    playBtn.classList.remove('active');
    clearInterval(timerInterval);
    doubleLine.classList.remove('finish');
    people.classList.remove('finish');
    timerElement.classList.remove('finish');
    memberDisplay.classList.remove('finish');
    topicDisplay.classList.remove('finish');
    next();
  };

  function updateTimer() {
    timeLeft -= 1;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      next(true);
    }
  };

  function next(soundPlay) {
    if (members.length === 0) {
      memberDisplay.textContent = '終了＼(^o^)／';
      topicDisplay.textContent = '終了＼(^o^)／';
      people.innerHTML = "0"
      clearInterval(timerInterval);
      timerElement.textContent = 0;
      playBtn.classList.remove('active');
      memberDisplay.classList.add('finish');
      topicDisplay.classList.add('finish');
      doubleLine.classList.add('finish');
      people.classList.add('finish');
      timerElement.classList.add('finish');
      if (soundPlay === true) {
        playThe('kankan-sound');
      }
      return;
    }
    updatePeople();
    const randomIndex = Math.floor(Math.random() * members.length);
    const selectedName = members[randomIndex];
    memberDisplay.textContent = selectedName;
    usedMembers.push(selectedName);
    members.splice(randomIndex, 1);

    const randomIdex2 = Math.floor(Math.random() * topics.length);
    const selectedName2 = topics[randomIdex2];
    topicDisplay.textContent = selectedName2;
    timeLeft = timeLeftDef
    timerElement.textContent = timeLeft;
    if (soundPlay === true) {
      playThe('kan-sound');
    }
  }

  function playThe(audioId) {
    const audio = document.getElementById(audioId);
    audio.play();
  }

  // ボタンイベント
  memberSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    const memberForm = document.getElementById('member-form');
    const formData = new FormData(memberForm);
    if (formData.get('name') === "") {
      alert(`値を入力してください`);
      return null;
    };
    const XHR = new XMLHttpRequest();
    XHR.open("POST", `/lounges/${loungeId}/members`, true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const formText = document.getElementById('member-text');
      const list = document.getElementById("member-list");
      const item = XHR.response.member;
      const html = `
      <li class="content-list-item">
        ${item.name}
        <i class="member-del-btn del-btn fa-solid fa-xmark", data-member_id= "${item.id}", data-lounge_id = "${loungeId}" ></i>
      </li>
      `;
      list.insertAdjacentHTML("beforeend", html);
      formText.value = ""
      updateMemberItems();
      updateMembers();
      updatePeople();
    };
  });

  topicSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    const topicForm = document.getElementById('topic-form');
    const formData = new FormData(topicForm);
    if (formData.get('name') === "") {
      alert(`値を入力してください`);
      return null;
    };
    const XHR = new XMLHttpRequest();
    XHR.open("POST", `/lounges/${loungeId}/topics`, true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const formText = document.getElementById('topic-text');
      const list = document.getElementById("topic-list");
      const item = XHR.response.topic;
      const html = `
      <li class="content-list-item">
        ${item.name}
        <i class="topic-del-btn del-btn fa-solid fa-xmark", data-topic_id= "${item.id}", data-lounge_id = "${loungeId}" ></i>
      </li>
      `;
      list.insertAdjacentHTML("beforeend", html);
      formText.value = ""
      updateTopicItems();
      updateTopics();
    };
  });

  resetBtn.addEventListener('click', function () {
    reset();
  });

  playBtn.addEventListener('click', function () {
    if (playBtn.classList.contains('active')) {
      playBtn.classList.remove('active');
      playThe('pipi-sound');
      clearInterval(timerInterval);
    } else {
      playBtn.classList.add('active');
      playThe('pi-sound');
      timerInterval = setInterval(updateTimer, 1000);
    }
  });

  nextBtn.addEventListener('click', function () {
    next(true);
  });

};


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

window.addEventListener('load', timer);
window.addEventListener('load', url);