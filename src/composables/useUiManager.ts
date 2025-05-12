let html = "";
export const setHtml = (str: string) => {
  html = str;
};
export const getHtml = () => {
  return html;
};
// 取出 DOM元素 & DOM元素相關操作
export const getElement = () => {
  const userAvatar = document.querySelector(".avatar") as HTMLImageElement; // img
  const userTitleName = document.querySelector(".title_name") as HTMLHeadingElement; // <h1> title name
  const titleIinput = document.querySelector(".title_input") as HTMLInputElement; // input
  const editPenBtn = document.querySelector(".edit_pen_btn") as HTMLAnchorElement; // <a> edit pen btn
  const editBoxContent = document.querySelector(".edit_box_btn") as HTMLDivElement; // <div> edit box btn
  const searchBtn = document.querySelector(".search_btn") as HTMLAnchorElement; // <a> search Btn
  const closeBtn = document.querySelector(".close_btn") as HTMLAnchorElement; // <a> close Btn
  const cardBox = document.querySelector(".card_box") as HTMLUListElement;
  const loading = document.querySelector(".loading") as HTMLDivElement; // 轉圈

  return {
    userAvatar,
    userTitleName,
    titleIinput,
    editPenBtn,
    editBoxContent,
    searchBtn,
    closeBtn,
    cardBox,
    loading,
  };
};

// 卡片渲染 Fn
export const renderList = (arr: TApiReopsRes[]) => {
  const { cardBox } = getElement();
  arr.forEach((item) => {
    html += `<li>
          <h1 class="title">${item.name}</h1>
          <h2 class="description">${item.description}</h2>
          <a class="url" href="" target="_blank">${item.html_url}</a>
          <div class="star_box">
          ${item.stargazers_count}
            <img class="star_icon" src="../assets/star.svg" alt="" />
          </div>
        </li>`;
    cardBox.innerHTML = html;
  });
};

export let gitHubName = "Kitou-1016";
const { userAvatar, userTitleName, titleIinput, editPenBtn, editBoxContent } = getElement();

// user取出來的資料存到這
export const userInfo: TfetchUserDataType = {
  userName: "",
  avatarUrl: "",
  updatedAt: "",
  publicRepos: 0,
  allPage: 0,
};

export const useUiDOM = () => {
  const getGitHubName = (name: string) => {
    setUserDataDOM();
    gitHubName = name;
  };

  // 鉛筆按鈕 Fn
  const searchAction = () => {
    editPenBtn.classList.add("hide");
    userTitleName.classList.add("hide");
    titleIinput.classList.remove("hide");
    titleIinput.value = gitHubName;
    editBoxContent.classList.remove("hide");
    editBoxContent.classList.add("show-flax");
  };

  const previewAction = () => {
    editPenBtn.classList.remove("hide");
    userTitleName.classList.remove("hide");
    titleIinput.classList.add("hide");
    editBoxContent.classList.add("hide");
    editBoxContent.classList.remove("show-flax");
  };
  // 秀出大頭貼和名稱
  const setUserDataDOM = () => {
    userAvatar.src = userInfo.avatarUrl;
    userTitleName.innerText = userInfo.userName;
  };

  return {
    searchAction,
    previewAction,
    setUserDataDOM,
    getGitHubName,
    userInfo,
  };
};
