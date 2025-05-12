import "../assets/css/style.css";
import { getElement, useUiDOM, userInfo, renderList, setHtml } from "../composables/useUiManager.ts";
import { fetchUserData, fetchReposrData, setPageIdx, limit, page } from "../composables/useFetchData.ts";

const { titleIinput, editPenBtn, searchBtn, closeBtn } = getElement();
const { searchAction, previewAction, setUserDataDOM, getGitHubName } = useUiDOM();
let idx = 1;

editPenBtn.addEventListener("click", () => {
  searchAction();
});

// 點擊 X
closeBtn.addEventListener("click", () => {
  previewAction();
});
// 點擊打勾
searchBtn.addEventListener("click", async () => {
  idx = 1;
  // reposrArr.length = 0;
  renderList([]);
  // html = "";
  setHtml("");
  // page = 1;
  setPageIdx(1);
  previewAction();
  init(titleIinput.value);
  getGitHubName(titleIinput.value);
  await fetchUserData(titleIinput.value);
});

// 監聽網頁捲到底
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop; // 已滾動的高度
  const clientHeight = document.documentElement.clientHeight; // 視窗高度
  const scrollHeight = document.documentElement.scrollHeight; // 總高度

  if (scrollTop + clientHeight >= scrollHeight) {
    console.log("到底了！");
    idx += 1;
    setPageIdx(idx);
    fetchReposrData(userInfo.userName, page, limit);
  }
});

// init() 網頁一開始初始化動作
const init = async (name: string) => {
  try {
    const res = await fetchUserData(name);
    const { userName, avatarUrl, publicRepos, updatedAt, allPage } = res;
    userInfo.userName = userName;
    userInfo.avatarUrl = avatarUrl;
    userInfo.publicRepos = publicRepos as number;
    userInfo.updatedAt = updatedAt as string;
    userInfo.allPage = allPage as number;
    setUserDataDOM();
    fetchReposrData(userInfo.userName, page, limit);
  } catch (error) {
    setUserDataDOM();
    const err = error as TfetchUserDataType;
    userInfo.userName = err.userName;
    userInfo.avatarUrl = err.avatarUrl;
  }
};

init("Kitou-1016");
