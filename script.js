const chips = document.querySelectorAll(".chip");
const searchForm = document.querySelector(".search-panel");
const searchInput = document.querySelector("#beauty-search");
const scrollButtons = document.querySelectorAll("[data-scroll]");
const purchaseButtons = document.querySelectorAll("[data-product]");
const likeButtons = document.querySelectorAll(".like-button");
const followButtons = document.querySelectorAll(".follow-button");
const replyForms = document.querySelectorAll(".reply-form");
const tabLinks = document.querySelectorAll(".mobile-tabbar a");
const toast = document.querySelector(".toast");
const checkoutProduct = document.querySelector("#checkoutProduct");
const checkoutPrice = document.querySelector("#checkoutPrice");
const checkoutBadge = document.querySelector("#checkoutBadge");
const checkoutMeta = document.querySelector("#checkoutMeta");
const checkoutVisual = document.querySelector("#checkoutVisual");
const payButton = document.querySelector("#payButton");
const feedSection = document.querySelector("#feed");

const productVisualMap = {
  "세미매트 스킨 쿠션": "cushion",
  "무드 글레이즈 틴트": "lip",
  "래쉬 픽싱 마스카라": "mascara",
  "배리어 세럼 팝": "serum",
  "카밍 클라우드 토너패드": "pad",
  "실키 리페어 헤어오일": "hair",
};

let selectedProduct = "세미매트 스킨 쿠션";
let selectedPrice = "32,000원";
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

function scrollToTarget(selector) {
  const target = document.querySelector(selector);

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function updateCheckout(product, price) {
  selectedProduct = product;
  selectedPrice = price;
  checkoutProduct.textContent = product;
  checkoutPrice.textContent = price;
  checkoutBadge.textContent = "바로 구매 가능";
  checkoutMeta.textContent = "인플루언서 추천 - 댓글 반응 활발 - 취향 매칭";

  checkoutVisual.className = "product-visual premium";
  checkoutVisual.classList.add(productVisualMap[product] || "cushion");
}

function createCommentItem(author, text, isAutoReply = false) {
  const item = document.createElement("div");
  item.className = "comment-item";

  const paragraph = document.createElement("p");
  const name = document.createElement("strong");
  name.textContent = author;
  paragraph.append(name, document.createTextNode(` ${text}`));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "comment-delete";
  deleteButton.setAttribute("aria-label", "댓글 삭제");
  deleteButton.textContent = "삭제";

  if (isAutoReply) {
    deleteButton.dataset.pinned = "true";
  }

  item.append(paragraph, deleteButton);
  return item;
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chip.classList.toggle("selected");
  });
});

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    scrollToTarget(button.dataset.scroll);
  });
});

purchaseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateCheckout(button.dataset.product, button.dataset.price);
    scrollToTarget("#checkout");
    showToast(`${button.dataset.product} 상품을 바로 구매할 수 있어요.`);
  });
});

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("is-liked");
    button.textContent = button.classList.contains("is-liked") ? "좋아요 완료" : "좋아요";
  });
});

followButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("is-following");
    button.textContent = button.classList.contains("is-following") ? "팔로잉" : "팔로우";
    showToast(button.classList.contains("is-following") ? "새 리뷰 알림을 받을 수 있어요." : "팔로우를 취소했어요.");
  });
});

replyForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    const message = input.value.trim();

    if (!message) {
      input.focus();
      return;
    }

    const commentList = form.previousElementSibling;
    commentList.append(createCommentItem("나", message));
    input.value = "";
    showToast("댓글이 등록됐어요.");
  });
});

feedSection.addEventListener("click", (event) => {
  const button = event.target.closest(".comment-delete");

  if (!button) {
    return;
  }

  const commentItem = button.closest(".comment-item");

  if (!commentItem) {
    return;
  }

  commentItem.remove();
  showToast("댓글을 삭제했어요.");
});

tabLinks.forEach((link) => {
  link.addEventListener("click", () => {
    tabLinks.forEach((tab) => tab.classList.remove("active"));
    link.classList.add("active");
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();

  if (!query) {
    searchInput.focus();
    return;
  }

  scrollToTarget("#expert");
  showToast(`"${query}" 관련 추천 상품과 피드 반응을 확인해보세요.`);
});

payButton.addEventListener("click", () => {
  showToast(`${selectedProduct} ${selectedPrice} 결제가 완료됐어요.`);
  payButton.textContent = "구매 완료";

  window.setTimeout(() => {
    payButton.textContent = "원터치로 구매하기";
  }, 1800);
});
