function member() {
  console.log("memberが読み込まれています");
  const memberSubmit = document.getElementById('member-submit');
  const memberDelBtns = document.querySelectorAll(".member-del-btn");

  memberSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    const memberForm = document.getElementById('member-form');
    const formData = new FormData(memberForm);
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
        <i class="member-del-btn fa-solid fa-xmark"></i>
      </li>
      `;
      list.insertAdjacentHTML("beforeend", html);
      formText.value = ""
    };
  });

  memberDelBtns.forEach(function (memberDelBtn) {
    memberDelBtn.addEventListener('mouseover', function () {
      this.setAttribute("style", "color: gold;");
    });
    memberDelBtn.addEventListener('mouseout', function () {
      this.removeAttribute("style", "color: gray;");
    });
    memberDelBtn.addEventListener('click', function () {
      const articleId = memberDelBtn.getAttribute("data-member_id");
      console.log(articleId)
    });
  });
};



window.addEventListener('load', member);