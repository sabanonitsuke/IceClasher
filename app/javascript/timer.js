function timer() {

  const nextBtn = document.getElementById('next-btn');
  const resetBtn = document.getElementById('reset-btn');
  const memberDisplay = document.getElementById('member-display');
  const topicDisplay = document.getElementById('topic-display');
  const people = document.getElementById('people');
  const memberSubmit = document.getElementById('member-submit');
  const topicSubmit = document.getElementById('topic-submit');

  updateMembers();
  updateMemberItems();
  updateTopicItems();
  updatePeople();

  function updateMembers() {
    members = Array.from(document.querySelectorAll('#member-list li')).map(li => li.textContent);
    usedMembers = [];
  }

  function updateMemberItems() {
    const memberDelBtns = document.querySelectorAll(".member-del-btn");
    memberDelBtns.forEach(function (memberDelBtn) {
      if (memberDelBtn.dataset.listenerAdded !== 'true') {
        memberDelBtn.dataset.listenerAdded = 'true'
        memberDelBtn.addEventListener('click', function () {
          const loungeId = memberDelBtn.getAttribute("data-lounge_id");
          const memberId = memberDelBtn.getAttribute("data-member_id");
          const XHR = new XMLHttpRequest();
          XHR.open("DELETE", `/lounges/${loungeId}/members/${memberId}`, true);
          const token = document.querySelector('meta[name="csrf-token"]').content;
          XHR.setRequestHeader('X-CSRF-Token', token);
          XHR.send();
          XHR.onload = () => {
            if (XHR.status === 204) {
              memberDelBtn.parentElement.remove();
              updateMembers();
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
          const loungeId = topicDelBtn.getAttribute("data-lounge_id");
          const topicId = topicDelBtn.getAttribute("data-topic_id");
          const XHR = new XMLHttpRequest();
          XHR.open("DELETE", `/lounges/${loungeId}/topics/${topicId}`, true);
          const token = document.querySelector('meta[name="csrf-token"]').content;
          XHR.setRequestHeader('X-CSRF-Token', token);
          XHR.send();
          XHR.onload = () => {
            if (XHR.status === 204) {
              topicDelBtn.parentElement.remove();
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
  };

  memberSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    const memberForm = document.getElementById('member-form');
    const formData = new FormData(memberForm);
    if (formData.get('name') === "") {
      alert(`値を入力してください`);
      return null;
    };
    const XHR = new XMLHttpRequest();
    const loungeId = memberForm.dataset.loungeId;
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
    const loungeId = topicForm.dataset.loungeId;
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
    };
  });

  resetBtn.addEventListener('click', function () {
    reset();
  });

  nextBtn.addEventListener('click', function () {
    if (members.length === 0) {
      memberDisplay.textContent = '終了＼(^o^)／';
      topicDisplay.textContent = '終了＼(^o^)／';
      people.innerHTML = "0"
      return;
    }
    updatePeople();
    const randomIndex = Math.floor(Math.random() * members.length);
    const selectedName = members[randomIndex];
    memberDisplay.textContent = selectedName;

    usedMembers.push(selectedName);
    members.splice(randomIndex, 1);
  });

};

window.addEventListener('load', timer);