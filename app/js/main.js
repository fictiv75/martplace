// Нашли контейнер с селектом
const selectElement = document.querySelector("[data-select]");
// Нашли реальный с селектом
const selectReal = document.querySelector("#selectReal");

// Прослушиваем клик внутри контейнера с селектом
selectElement.addEventListener("click", function (event) {



  // Проверка где произошел клик
  // event.target - показываетна каком именно HTML элементе произошел клик
  // Усли кликнули по пункту внутри дропдауна
  if (event.target.hasAttribute("data-select-item")) {
    
    // Получаем значение этого пункта из атрибута data-select-item у этого элемента
    const itemTitle = event.target.getAttribute("data-select-item");
   
    // Находим заголовок и меняем его текст на значение из выбронного пункта
    event.target
      .closest("[data-select]")
      .querySelector("[data-select-title]").textContent = itemTitle;

    // Скрываем дропдаун
    event.target
      .closest("[data-select]")
      .querySelector(".slide-select__dropdown")
      .classList.toggle("hidden");

    // Связка с реальным селектом
    // Изменяем значение value у реального селекта
      selectReal.value = itemTitle;

  } else {
    // ИНАЧЕ: клик произошел НЕ по элементу в дропдауне. Значит это title или область вокруг него
    // Скрываем или открывем дропдаун - toggle
    this.querySelector(".slide-select__dropdown").classList.toggle("hidden");
    
  }
});