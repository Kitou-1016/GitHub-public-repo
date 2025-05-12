import { apiGetUserData, apiGetRepos } from "../api/github.ts";
import notFound from "../assets/notFound.jpg";
import { userInfo, getElement, renderList, setHtml, getHtml } from "../composables/useUiManager.ts";

export const limit = 10;
export let page = 1;
let reposrArr: TApiReopsRes[] = [];
const { cardBox, loading } = getElement();

export const setPageIdx = (pageIdx: number) => {
  page = pageIdx;
};
export const setReposArr = (arr: TApiReopsRes[] | []) => {
  reposrArr = arr;
};

// fetchUserData() 拿使用者資料及渲染資料
export const fetchUserData = async (name: string) => {
  try {
    // 打API 拿資料，apiGetUserData( 填名字 決定是要拿誰的資料 )
    const res = await apiGetUserData(name);
    // 如果取得的資料的筆數等於0，顯示沒有任何資料
    if (res.data.public_repos === 0) {
      setHtml("<li><h1 class='title'>沒有任何資料</h1></li>");
      cardBox.innerHTML = getHtml();
      loading.classList.add("hide");
    }
    const { login, avatar_url, public_repos, updated_at }: TApiUserDataRes = res.data;
    return {
      userName: login,
      avatarUrl: avatar_url,
      publicRepos: public_repos,
      updatedAt: updated_at,
      allPage: Math.ceil(public_repos / limit),
    };
  } catch (error) {
    return {
      userName: "查無使用者名稱",
      avatarUrl: notFound,
    };
  }
};
// 取得使用者github資料
export const fetchReposrData = async (name: string, pageIdx: number, per_page: number) => {
  if (pageIdx > userInfo.allPage) {
    return;
  }
  try {
    const res = await apiGetRepos(name, pageIdx, per_page);
    reposrArr = res.data;
    if (res.data.length === 10) {
      loading.classList.add("hide");
    }
    renderList(reposrArr); // 卡片渲染 Fn
  } catch (error) {
    console.log(error);
  }
};
