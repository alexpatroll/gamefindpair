document.addEventListener('DOMContentLoaded', function () {

  let cardArray = [];
  let cardCount = 16;   // количество карточек

  let inputValue = 4    // тут можно выбирать число из input
  let arrayData = [];

  (function initGame() {    //создаем карточки и структуру html

    const numberImgs = ['img/card-1.jpg', 'img/card-2.png', 'img/card-3.png', 'img/card-4.png', 'img/card-5.png',
      'img/card-6.png', 'img/card-7.png', 'img/card-8.png', 'img/card-1.jpg', 'img/card-2.png',
      'img/card-3.png', 'img/card-4.png', 'img/card-5.png', 'img/card-6.png', 'img/card-7.png', 'img/card-8.png'];

    let section = document.getElementById('container-game');
    section.classList.add('memory-game');

    for (let i = 0; i < cardCount; i++) {   //создаем обьект карточек
      let div = document.createElement('div');   // создаем карточку
      let imgFront = document.createElement('img');
      let imgBack = document.createElement('img');


      div.classList.add('memory-card');
      imgFront.classList.add('front-face');
      imgBack.classList.add('back-face');

      section.append(div);
      div.append(imgFront);
      div.append(imgBack);

      imgBack.src = 'img/card.png';

      dateAtribute()

      cardArray.push(                            // заполняем обьект карточки
        {
          imgURL: numberImgs[i],
        })
      imgFront.src = cardArray[i].imgURL;       //задаем фон
      div.dataset.name = arrayData[i]           // задаем дата атрибут
    }

    return {
      cardArray,
    };
  })();


  function dateAtribute() {
    for (let i = 1; i < 3; i++) {        // создаем последовательность чисел для дата атрибута
      for (let s = 1; s < inputValue ** 2 / 2 + 1; s++) {
        arrayData.push(s)
      }
    }
  }

  const resetBtn = document.querySelector('.btn-repeat'); //button
  const cards = document.querySelectorAll('.memory-card'); //все карты с классом memory-card
  const divVictoryMessage = document.querySelector('.victory-message'); // сообщение о победе

  let firstCard, secondCard;


  function flipCard() { // ф-ия переворачивания карты
    if (divTimerBack.innerHTML > 1) {
      if (secondCard)
        checkForMatch();

      winnerGame();

      if (this === firstCard) return;

      this.classList.add('flip');    // добавили класс flip

      if (!firstCard)
        firstCard = this;
      else
        secondCard = this;
    }
  }


  function winnerGame() {
    let cardFlipped = document.querySelectorAll('.memory-card.flip');
    if (cardFlipped.length > cardCount - 2 && divTimerBack.innerHTML > 1) {
      resetBtn.classList.toggle('display-on')     //кнопка перезагрузка появится когда перевернутых карт будет 15
      divVictoryMessage.classList.toggle('display-block') // победа при всех открытых карточках
    }
  }

  function checkForMatch() {  //сравнение карт по dateset
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;  // проверяем дата атрибут у div к первой и второй карты
    isMatch ? disableCards() : unflipCards();   //если совпадает дата атрибут вызываем disableCards иначе вызываем unflipCards
  }

  function disableCards() { // в случае совпадения карт отключаем EventListener для обоих карт
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  }

  function unflipCards() { // возвращает две карты в первоначальное состояние при несовпадении
    firstCard.classList.remove('flip');  //удаляем класс flip
    secondCard.classList.remove('flip');
    firstCard = null;
    secondCard = null;
  }

  function resetBoard() {  //сброс
    firstCard = null;
    secondCard = null;
  }

  (function shuffle() {    // перемешаем все карты с помощью немедленого вызова функции
    cards.forEach(card => {
      let ramdomPos = Math.ceil(Math.random() * cardCount);
      card.style.order = ramdomPos; // порядок flex элемента задается в order
    });
  })();

  cards.forEach(card => card.addEventListener('click', flipCard)); // по клику добавляем класс flip

  let divTimerBack = document.querySelector('.timer'); // div c 60 секундами
  let textWarning = document.querySelector('.gameover-message'); // сообщение

  function timerWork() {
    let cardNew = document.querySelectorAll('.memory-card.flip');
    let resetBtn = document.querySelector('.btn-repeat');

    divTimerBack.innerHTML = divTimerBack.innerHTML > 0 ? divTimerBack.innerHTML - 1 : divTimerBack.innerHTML;  // Проверяем если див > 0 то - 1, если = 0 то стоп
    if (divTimerBack.innerHTML < 1 && cardNew.length < cardCount - 2) {   //тут задаем условие если значение таймера меньше 1 и перевернутых карт меньше 14
      textWarning.classList.add('display-block')    //выводим сообщение
      resetBtn.classList.add('display-on')          //выводим кнопку
    }
  }

  (function timerBack() {
    clearInterval(timerWork);
    setInterval(timerWork, 1000); //Обратный отсчет
  })();



  function resetGame() {   // перезагрузка игры по кнопке, можно перезагрузить с любым кол-вом карт
    window.location.reload();
  }

  resetBtn.addEventListener('click', resetGame);  // Запускаем событие по клику перезагрузка по кнопке ресет

});





