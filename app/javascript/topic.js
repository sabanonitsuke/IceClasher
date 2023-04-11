function topic() {
  console.log("topicが読み込まれています");
  const topicSubmit = document.getElementById('topic-submit');
  updateTopicItems();

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
        <i class="topic-del-btn fa-solid fa-xmark", data-topic_id= "${item.id}", data-lounge_id = "${loungeId}" ></i>
      </li>
      `;
      list.insertAdjacentHTML("beforeend", html);
      formText.value = ""
      updateTopicItems();
    };
  });

  function updateTopicItems() {
    const topicDelBtns = document.querySelectorAll(".topic-del-btn");
    topicDelBtns.forEach(function (topicDelBtn) {
      if (topicDelBtn.dataset.listenerAdded !== 'true') {
        topicDelBtn.dataset.listenerAdded = 'true'
        topicDelBtn.addEventListener('mouseover', function () {
          this.setAttribute("style", "color: gold;");
        });
        topicDelBtn.addEventListener('mouseout', function () {
          this.removeAttribute("style", "color: gray;");
        });
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

};



window.addEventListener('load', topic);