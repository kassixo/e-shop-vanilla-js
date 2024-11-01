import { displayProducts } from "./allProductsView.js"; // kõik tooted
import { loadProductView } from "./productView.js";
import { loadCartView } from "./cartView.js";

// funktsioon, mis vastutab vaadete vahel liikumise eest
export const navigate = (view, param) => {
  const views = {
    category: () => displayProducts(param), // kõikide toodete vaade
    product: () => loadProductView(param), // üksiku toote vaade, tooteleht
    cart: () => loadCartView(), // ostukorvi vaade
  };

  // vali ja käivita sobiv vaade
  if (views[view]) {
    views[view]();

    // muuda URL'i ilma lehte uuesti laadimata
    const newUrl = view === "category" ? "/" : `/${view}/${param || ""}`;
    window.history.pushState({}, "", newUrl);
  }
};

// sündmuse kuulaja, kui kasutaja vajutab "tagasi" või "edasi" nuppu brauseris
window.addEventListener("popstate", () => {
  const path = window.location.pathname;
  const [_, view, param] = path.split("/");
  navigate(view || "category", param);
});
