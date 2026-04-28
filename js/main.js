/* global $ */
(function () {
  "use strict";

  const cases = [
    {
      title: "Автоматизация процессов",
      image: "img/26c3a252d9de5695f9336d1f4f555c04ae766c48.png",
      tag: "Автоматизация",
      desc: "Ускорили выполнение задач строительной компании на 20%.",
    },
    {
      title: "Стройхолдинг",
      image: "img/26c3a252d9de5695f9336d1f4f555c04ae766c49.png",
      tag: "Корпоративные порталы",
      desc: "Ускорили выполнение задач строительной компании на 20%.",
    },
    {
      title: "Интеграция CRM для компании",
      image: "img/26c3a252d9de5695f9336d1f4f555c04ae766c50.png",
      tag: "Автоматизация",
      desc: "Ускорили выполнение задач строительной компании на 20%.",
    },
    {
      title: "Интернет-магазин под SEO",
      image: "img/26c3a252d9de5695f9336d1f4f555c04ae766c51.png",
      tag: "E-commerce",
      desc: "Ускорили выполнение задач строительной компании на 20%.",
    },
  ];

  let current = 1;

  function renderBreadcrumbs() {
    const breadcrumbs = document.getElementById("breadcrumbs");
    if (!breadcrumbs) {
      return;
    }

    let items = [];
    try {
      items = JSON.parse(breadcrumbs.dataset.items || "[]");
    } catch (error) {
      items = [];
    }

    const html = items
      .map((item, index) => {
        const isLast = index === items.length - 1;
        const label = String(item);

        if (isLast) {
          return `<li class="hero__crumb-item is-current" aria-current="page">${label}</li>`;
        }

        return `<li class="hero__crumb-item"><a href="#" data-crumb="${index}">${label}</a></li>`;
      })
      .join("");

    breadcrumbs.innerHTML = html;
  }

  const indexSafe = (index) => (index + cases.length) % cases.length;

  // Собираем три карточки: предыдущая, активная, следующая.
  function renderCases() {
    const left = cases[indexSafe(current - 1)];
    const center = cases[indexSafe(current)];
    const right = cases[indexSafe(current + 1)];

    const html = `
      <article class="cases__item cases__item--side">
        <img class="cases__thumb" loading="lazy" src="${left.image}" alt="${left.title}">
        <span class="cases__meta">${left.tag}</span>
        <div class="cases__caption">${left.title}</div>
      </article>

      <article class="cases__item cases__item--center">
        <img class="cases__thumb" loading="lazy" src="${center.image}" alt="${center.title}">
        <span class="cases__meta">${center.tag}</span>
        <div class="cases__caption">${center.title}</div>
        <div class="cases__desc">${center.desc || ""}</div>
        <a href="#" class="cases__link">Читать кейс →</a>
      </article>

      <article class="cases__item cases__item--side">
        <img class="cases__thumb" loading="lazy" src="${right.image}" alt="${right.title}">
        <span class="cases__meta">${right.tag}</span>
        <div class="cases__caption">${right.title}</div>
      </article>`;

    $("#casesContainer").html(html);

    const dotsHtml = cases
      .map(
        (_, index) =>
          `<button class="${index === current ? "is-active" : ""}" data-dot="${index}" aria-label="Слайд ${index + 1}"></button>`,
      )
      .join("");

    $("#casesDots").html(dotsHtml);
  }

  function nextSlide() {
    current = indexSafe(current + 1);
    renderCases();
  }

  function prevSlide() {
    current = indexSafe(current - 1);
    renderCases();
  }

  $("#casesNext").on("click", nextSlide);
  $("#casesPrev").on("click", prevSlide);

  $(document).on("click", "#casesDots button", function () {
    current = Number($(this).data("dot"));
    renderCases();
  });

  $('a[href^="#"]').on("click", function (event) {
    const href = this.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    const target = $(href);
    if (target.length) {
      event.preventDefault();
      $("html, body").animate({ scrollTop: target.offset().top - 78 }, 380);
    }
  });

  const leadForm = $(".lead__form");
  const leadConsent = $("#leadConsent");
  const leadSubmit = $("#leadSubmit");

  function updateLeadSubmitState() {
    leadSubmit.prop("disabled", !leadConsent.is(":checked"));
  }

  leadConsent.on("change", updateLeadSubmitState);

  leadForm.on("submit", function (event) {
    event.preventDefault();
    const name = $(this).find('input[type="text"]').val().trim();
    const phone = $(this).find('input[type="tel"]').val().trim();

    if (!name || !phone) {
      alert("Пожалуйста, заполните обязательные поля");
      return;
    }

    if (!leadConsent.is(":checked")) {
      alert("Подтвердите согласие на обработку персональных данных");
      return;
    }

    alert("Спасибо! Заявка отправлена.");
    this.reset();
    updateLeadSubmitState();
  });

  renderCases();
  renderBreadcrumbs();
  updateLeadSubmitState();
})();
