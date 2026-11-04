const CATEGORY_META = {
  Household: { label: "Casa e cotidiano", blurb: "Organizadores, suportes e peças que resolvem o dia a dia." },
  "Toys & Games": { label: "Brinquedos e jogos", blurb: "Peças lúdicas, fidgets e ideias para presentear." },
  Tools: { label: "Ferramentas", blurb: "Acessórios de bancada, cortes, prensas e utilitários." },
  "Hobby & DIY": { label: "Hobby e DIY", blurb: "Projetos para quem gosta de montar, ajustar e criar." },
  "3D Printer": { label: "Impressora 3D", blurb: "Melhorias, gabaritos e peças para a própria máquina." },
  Art: { label: "Arte", blurb: "Esculturas, bustos e peças com cara de vitrine." },
  Miniatures: { label: "Miniaturas", blurb: "Escala pequena, detalhe alto: figures, dioramas e props." },
  "Props & Cosplays": { label: "Props e cosplay", blurb: "Peças vestíveis, armas cênicas e acessórios de palco." },
  Fashion: { label: "Moda e acessórios", blurb: "Joias, chaveiros, anéis e detalhes para vestir." },
  "Generative 3D Model": { label: "Modelos generativos", blurb: "Formas paramétricas e peças que nascem de padrões." },
  Education: { label: "Educação", blurb: "Material didático, STEM e peças para sala de aula." },
  "Laser & Corte": { label: "Laser e corte", blurb: "Complementos de corte, kits e peças híbridas." }
};

const state = {
  category: "Household"
};

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html) node.innerHTML = html;
  return node;
}

function renderChips() {
  const wrap = document.getElementById("catalogChips");
  wrap.innerHTML = "";
  Object.keys(CATEGORY_META).forEach((key) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "catalog-chip" + (key === state.category ? " active" : "");
    btn.textContent = CATEGORY_META[key].label;
    btn.addEventListener("click", () => {
      state.category = key;
      renderChips();
      renderGrid();
    });
    wrap.appendChild(btn);
  });
}

function renderGrid() {
  const grid = document.getElementById("catalogGrid");
  const title = document.getElementById("catalogCategoryTitle");
  const blurb = document.getElementById("catalogCategoryBlurb");
  const count = document.getElementById("catalogCount");
  const items = (window.GB_CATALOG && window.GB_CATALOG[state.category]) || [];
  const meta = CATEGORY_META[state.category];

  title.textContent = meta.label;
  blurb.textContent = meta.blurb;
  count.textContent = `${items.length} exemplos nesta categoria`;
  grid.innerHTML = "";

  items.forEach((item) => {
    const col = el("div", "col-6 col-md-4 col-lg-3");
    const card = el("article", "product-card");
    const thumb = el("div", "product-thumb");
    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.title || "Peça impressa em 3D";
    img.loading = "lazy";
    img.referrerPolicy = "no-referrer";
    img.onerror = () => {
      img.replaceWith(el("div", "d-flex h-100 align-items-center justify-content-center text-secondary p-3", "Imagem indisponível"));
    };
    thumb.appendChild(img);

    const body = el("div", "product-body");
    body.appendChild(el("h3", "", item.title || "Peça 3D"));

    card.appendChild(thumb);
    card.appendChild(body);
    col.appendChild(card);
    grid.appendChild(col);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderChips();
  renderGrid();

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const note = document.getElementById("formNote");
      note.classList.remove("d-none");
      form.reset();
    });
  }
});
