document.addEventListener("DOMContentLoaded", () => {
  function initWishlistButtons() {
    document.querySelectorAll(".product-card-1__wishlist").forEach((btn) => {
      // Remove listeners antigos para evitar duplicação se a função for chamada novamente
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const svg = this.querySelector("svg");
        const isFilled = svg.getAttribute("fill") === "#ef4444";
        svg.setAttribute("fill", isFilled ? "none" : "#ef4444");
        svg.setAttribute("stroke", isFilled ? "currentColor" : "none");
      });
    });
  }

  function initCartForms() {
    document.querySelectorAll(".product-card-1__form").forEach((form) => {
      // Remove listeners antigos
      const newForm = form.cloneNode(true);
      form.parentNode.replaceChild(newForm, form);

      newForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const btn = this.querySelector(".product-card-1__btn-cart");
        const originalContent = btn.innerHTML;
        const originalBg = btn.style.background;

        btn.textContent = "Added!";
        btn.style.background = "#059669";

        // Simular adição ao carrinho (aqui você poderia fazer um fetch real para a API do Shopify)
        const formData = new FormData(this);
        fetch(window.Shopify.routes.root + "cart/add.js", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // Atualizar contagem do carrinho se necessário
            // Disparar evento para atualizar carrinho ajax se o tema suportar
            document.documentElement.dispatchEvent(
              new CustomEvent("cart:refresh", {
                bubbles: true,
              }),
            );
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            setTimeout(() => {
              btn.innerHTML = originalContent;
              btn.style.background = originalBg || "#d97706";
            }, 1500);
          });
      });
    });
  }

  initWishlistButtons();
  initCartForms();
});
