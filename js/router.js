import { displayProducts } from "./allProductsView.js"; // kõik tooted
import { loadProductView } from "./productView.js";
import { loadCartView } from "./cartView.js";

// funktsioon, mis vastutab vaadete vahel liikumise eest
export const navigate = (view, param) => {
  const views = {
    // kõikide toodete vaade
    category: () => displayProducts(param),
    // üksiku toote vaade, tooteleht
    product: () => loadProductView(param),
    // ostukorvi vaade
    cart: () => loadCartView(),
  };

  // vali ja käivita sobiv vaade
  if (views[view]) {
    views[view]();
    const encodedParam = param ? encodeURIComponent(param) : "";
    const newUrl = view === "category" && !param ? "/" : `/${view}${encodedParam ? `/${encodedParam}` : ""}`;

    window.history.pushState({}, "", newUrl);
  }
};

// sündmuse kuulaja, kui kasutaja vajutab "tagasi" või "edasi" nuppu brauseris
window.addEventListener("popstate", () => {
  const path = window.location.pathname;
  const [_, view, param] = path.split("/");
  const decodedParam = decodeURIComponent(param);
  navigate(view || "category", decodedParam);
});
