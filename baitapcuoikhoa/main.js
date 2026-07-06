const sectionImg = document.querySelector(".section-img");
const next = document.querySelector(".section-next");
const prev = document.querySelector(".section-prev");

next.onclick = function () {
  sectionImg.style.transform = "translateX(-620px)";

  next.style.display = "none";
  prev.style.display = "block";
};

prev.onclick = function () {
  sectionImg.style.transform = "translateX(0px)";

  prev.style.display = "none";
  next.style.display = "block";
};
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".testimonial-button");
  const images = document.querySelectorAll(".testimonial-first-img");
  const items = document.querySelectorAll(".testimonial-second-item");

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      // Xóa sạch class active cũ
      buttons.forEach((b) => b.classList.remove("active"));
      images.forEach((img) => img.classList.remove("active"));
      items.forEach((item) => item.classList.remove("active"));

      // Thêm active vào phần tử được click theo index
      this.classList.add("active");
      images[index].classList.add("active");
      items[index].classList.add("active");
    });
  });
});
let lastScrollTop = 0;

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 70) {
    navbar.classList.add("navbar-hidden");
  } else {
    navbar.classList.remove("navbar-hidden");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
// hieu  ung luot qua luot ve
const viewport = document.querySelector(".section-viewport");

let isMouseDown = false;

viewport.addEventListener("mousedown", function () {
  isMouseDown = true;
});

viewport.addEventListener("mouseup", function () {
  isMouseDown = false;
});

viewport.addEventListener("mouseleave", function () {
  isMouseDown = false;
});

viewport.addEventListener("mousemove", function (e) {
  if (isMouseDown) {
    viewport.scrollLeft -= e.movementX;
  }
});
document.addEventListener("DOMContentLoaded", function () {
  var dropdownList = document.querySelectorAll(".menu-navbar > .dropdown");

  var hamburgerBtn = document.createElement("div");
  hamburgerBtn.className = "hamburger-auto";
  hamburgerBtn.innerHTML = "<span></span><span></span><span></span>";

  var buttonBox = document.querySelector(".button");
  buttonBox.parentNode.insertBefore(hamburgerBtn, buttonBox);

  var overlay = document.createElement("div");
  overlay.className = "mobile-menu-overlay";
  document.body.appendChild(overlay);

  var menuPanel = document.createElement("div");
  menuPanel.className = "mobile-menu-panel";
  document.body.appendChild(menuPanel);

  var screenLevel1 = document.createElement("div");
  screenLevel1.className = "menu-screen level-1 active";

  var headerLevel1 = document.createElement("div");
  headerLevel1.className = "menu-screen-header level-1-header";
  headerLevel1.innerHTML = '<span class="mobile-menu-close">&times;</span>';
  screenLevel1.appendChild(headerLevel1);

  var listLevel1 = document.createElement("ul");
  listLevel1.className = "mobile-menu-list";
  screenLevel1.appendChild(listLevel1);

  var loginButton = document.createElement("button");
  loginButton.className = "mobile-menu-login";
  loginButton.textContent = "Log in";
  screenLevel1.appendChild(loginButton);

  menuPanel.appendChild(screenLevel1);

  var allLevel2Screens = [];

  for (var i = 0; i < dropdownList.length; i++) {
    var currentDropdown = dropdownList[i];
    var topLink = currentDropdown.querySelector("a");
    var topLabel = topLink.textContent.trim();
    var submenu = currentDropdown.querySelector(".menu-dropdown");

    var listItem = document.createElement("li");
    var linkTag = document.createElement("a");
    linkTag.textContent = topLabel;

    if (submenu) {
      linkTag.href = "#";
      var chevron = document.createElement("span");
      chevron.className = "chevron";
      chevron.textContent = "›";
      listItem.appendChild(linkTag);
      listItem.appendChild(chevron);
    } else {
      linkTag.href = topLink.getAttribute("href") || "#";
      listItem.appendChild(linkTag);
    }

    listLevel1.appendChild(listItem);

    var screenLevel2 = document.createElement("div");
    screenLevel2.className = "menu-screen level-2";

    var headerLevel2 = document.createElement("div");
    headerLevel2.className = "menu-screen-header";
    headerLevel2.innerHTML =
      '<span class="menu-back-btn">&larr;</span>' +
      '<span class="menu-screen-title">' +
      topLabel +
      "</span>";
    screenLevel2.appendChild(headerLevel2);

    if (submenu) {
      var columns = submenu.querySelectorAll(".dropdown-column");

      for (var j = 0; j < columns.length; j++) {
        var oneColumn = columns[j];
        var columnWrap = document.createElement("div");
        columnWrap.className = "submenu-column";

        var linksInColumn = oneColumn.querySelectorAll("a");

        for (var k = 0; k < linksInColumn.length; k++) {
          var oneLink = linksInColumn[k];

          if (oneLink.classList.contains("column-title")) {
            var titleSpan = document.createElement("span");
            titleSpan.className = "submenu-column-title";
            titleSpan.textContent = oneLink.textContent.trim();
            columnWrap.appendChild(titleSpan);
          } else {
            var subLink = document.createElement("a");
            subLink.className = "submenu-link";
            subLink.href = oneLink.getAttribute("href") || "#";
            subLink.textContent = oneLink.textContent.trim();
            columnWrap.appendChild(subLink);
          }
        }

        screenLevel2.appendChild(columnWrap);
      }
    }

    menuPanel.appendChild(screenLevel2);
    allLevel2Screens.push(screenLevel2);

    if (submenu) {
      (function (screenToOpen) {
        listItem.addEventListener("click", function (event) {
          event.preventDefault();

          for (var m = 0; m < allLevel2Screens.length; m++) {
            allLevel2Screens[m].classList.remove("active");
          }

          screenToOpen.classList.add("active");
        });
      })(screenLevel2);
    }

    var backButton = headerLevel2.querySelector(".menu-back-btn");
    (function (screenToClose) {
      backButton.addEventListener("click", function () {
        screenToClose.classList.remove("active");
      });
    })(screenLevel2);
  }

  function openMenu() {
    menuPanel.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menuPanel.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";

    for (var n = 0; n < allLevel2Screens.length; n++) {
      allLevel2Screens[n].classList.remove("active");
    }
  }

  hamburgerBtn.addEventListener("click", openMenu);

  var closeButton = headerLevel1.querySelector(".mobile-menu-close");
  closeButton.addEventListener("click", closeMenu);

  overlay.addEventListener("click", closeMenu);
});
