import { loadCategoryView } from "./categoryView.js";
import { loadProductView } from "./productView.js";
import { loadCartView } from "./cartView.js";

// funktsioon, mis vastutab vaadete vahel liikumise eest
export const navigate = (view, param) => {
  const views = {
    category: () => loadCategoryView(param || "all"),
    product: () => loadProductView(param),
    cart: () => loadCartView(),
  };

  // vali ja käivita sobiv vaade
  if (views[view]) {
    views[view]();

    // muuda URL'i ilma lehte uuesti laadimata
    const newUrl = view === "category" ? "/" : `/${view}/${param || ""}`;
    windows.history.pushState({}, "", newUrl);
  }
};

// sündmuse kuulaja, kui kasutaja vajutab "tagasi" või "edasi" nuppu brauserid
window.addEventListener("popstate", () => {
  const path = window.location.pathname;
  const [_, view, param] = path.split("/");
  navigate(view || "category", param);
});
