import { MENUS } from "./menu-data.js";

function el(tag, attrs={}, children=[]){
  const node = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)){
    if (k === "class") node.className = v;
    else node.setAttribute(k, v);
  }
  for (const ch of children){
    node.appendChild(typeof ch === "string" ? document.createTextNode(ch) : ch);
  }
  return node;
}

function renderHeroImage(src){
  const hero = document.getElementById("heroImg");
  if (!hero) return;
  hero.src = src;
}

export function renderMenuPage({ page, title, kicker, lead, heroImg }){
  document.title = title;

  const data = MENUS[page];
  const root = document.getElementById("menuRoot");
  if (!root || !data) return;

  document.getElementById("heroTitle").textContent = title;
  document.getElementById("heroKicker").textContent = kicker;
  document.getElementById("heroLead").textContent = lead;

  renderHeroImage(heroImg);

  root.innerHTML = "";

  data.sections.forEach(sec => {
    const section = el("article", { class:"section" }, [
      el("header", { class:"section__head" }, [
        el("h2", { class:"section__title" }, [sec.title]),
        el("p", { class:"section__subtitle" }, [sec.subtitle || ""])
      ])
    ]);

    const items = el("div", { class:"items" });

    sec.items.forEach(item => {
      const thumb = el("div", { class:"thumb" }, [
        el("img", {
          src: item.img || "./images/placeholder.webp",
          alt: item.name
        })
      ]);

      const meta = el("div", {}, [
        el("p", { class:"item__name" }, [item.name]),
        el("p", { class:"item__desc" }, [item.desc || ""])
      ]);

      const priceText = (item.price || "").trim();
      const price = priceText
        ? el("div", { class:"price" }, [priceText])
        : el("div", { class:"price", style:"opacity:0" }, [""]);

      items.appendChild(el("div", { class:"item" }, [thumb, meta, price]));
    });

    section.appendChild(items);
    root.appendChild(section);
  });
}
