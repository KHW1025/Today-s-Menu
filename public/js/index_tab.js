// 모달영역
const $foodImgs = document.querySelectorAll(".food_img");
const $modal = document.querySelector(".detail_modal");
const $detailInner = document.querySelector(".detail_inner");
const $deleteBtn = document.querySelector(".delete_btn");

$foodImgs.forEach((item, i) => {
  item.addEventListener("click", function (e) {
    $modal.classList.add("on");
    // console.log(item);
    let fImg = item.querySelector("img");
    let fName = item.querySelector(".menu_name");
    let fCategory = item.querySelector(".category");
    let fComment = item.querySelector(".comment");
    let fRecipe = item.querySelector(".recipe");
    let fRecipeTxt = fRecipe.innerText.replace(/(?:\r\n|\r|\n)/g, "<br>");
    let fDelete = item.querySelector(".delete");

    $detailInner.innerHTML = `
    <div class="modal_top">
      <div class="modal_img">${fImg.outerHTML}</div>
      <div class="text_box">
        <div class="name_box">
          <span>메뉴명 :<span> ${fName.outerHTML}
          (${fCategory.outerHTML})
        </div>
        <div class="comment_box">
           ${fComment.outerHTML}
        </div>
      </div>
    </div>
    <div class="recipe_con">
      <p>Recipe</p>
      ${fRecipeTxt}
    </div>
    `;
    $deleteBtn.innerHTML = `
    ${fDelete.outerHTML}
    `;
  });
});

// 닫기버튼
const $detailClose = document.querySelector(".detail_close");
$detailClose.addEventListener("click", function () {
  $modal.classList.remove("on");
});
