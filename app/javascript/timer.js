function timer() {

  const nextBtn = document.getElementById('next-btn');
  const memberDisplay = document.getElementById('member-display');
  const people = document.getElementById('people');
  const memberSubmit = document.getElementById('member-submit');
  updateMembers();
  updateMemberItems();

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

  nextBtn.addEventListener('click', function () {
    if (members.length === 0) {
      memberDisplay.textContent = '終了';
      people.innerHTML = "0"
      return;
    }
    people.innerHTML = members.length
    const randomIndex = Math.floor(Math.random() * members.length);
    const selectedName = members[randomIndex];
    memberDisplay.textContent = selectedName;

    usedMembers.push(selectedName);
    members.splice(randomIndex, 1);
  });

};

window.addEventListener('load', timer);