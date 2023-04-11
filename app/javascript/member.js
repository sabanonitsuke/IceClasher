function member() {
  console.log("memberが読み込まれています");
  const memberSubmit = document.getElementById('member-submit');

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
      <li>${item.name}</li>
      `;
      list.insertAdjacentHTML("beforeend", html);
      formText.value = ""
    };
  });

};



window.addEventListener('load', member);