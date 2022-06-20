// массив объектов
const cardsArr = [
	{imageName: "img1", imagePath: "img/img1.png"},
	{imageName: "img2", imagePath: "img/img2.png"},
	{imageName: "img3", imagePath: "img/img3.png"},
	{imageName: "img4", imagePath: "img/img4.png"},
	{imageName: "img5", imagePath: "img/img5.png"},
	{imageName: "img6", imagePath: "img/img6.png"},
	{imageName: "green", imagePath: "img/green.png"},
	{imageName: "done", imagePath: "img/done.png"},
]

// выполнить сортировку массива в случайном порядке
// передать функцию сравнения compare function
cardsArr.sort(function() {
	return 0.5 - Math.random()});
	console.log(cardsArr);

//обращение к элементам страницы: тегам span, div
const span = document.querySelector("#span");
const cardsDiv = document.querySelector(".cardsDiv");
const messageDiv = document.querySelector(".messageDiv");

// создать игровое поле из изображений карточек
function createBoard() {
	//создать 12 тегов внутри блока cardsDiv типа img
	for (let i = 0; i < cardsArr.length; i++) {
		const imgCard = document.createElement("IMG");
		imgCard.setAttribute("id", String(i));
		imgCard.setAttribute("src", "img/green.png")
		imgCard.addEventListener("click", flipCard);
		cardsDiv.appendChild(imgCard);
	}
}

// вызвать функцию для создания поля из изображение
createBoard();

let cardsChonesArr = [];
let cardsChonesArrId = [];
let nOfOpenedCardsArr = [];

// проверка соответствий карточек
function checkForMatch() {
	// массив всех изображений на странице
	const cards = document.querySelectorAll("img");
	// идентификатор первого и второго выбранного изображения
	const id1 = cardsChonesArrId[0];
	const id2 = cardsChonesArrId[1];

	// найдено соответсвие и пользователь не кликнул по одной и той же карточке
	if (cardsChonesArr[0] === cardsChonesArr[1] && id1 !== id2) {
		messageDiv.innerHTML = "Match found!";
		cards[id1].setAttribute("src", "img/greem.png");
		cards[id2].setAttribute("src", "img/greem.png");
		// удалить с карточки событие onclick
		cards[id1].removeEventListener("click", flipCard);
		cards[id2].removeEventListener("click", flipCard);
		nOfOpenedCardsArr.push(cardsChonesArr);
		// пользователь совершил клик по одной карточке дважды
		// карточки не совпали
	} else {
		cards[id1].setAttribute("src", "img/greem.png");
		cards[id2].setAttribute("src", "img/greem.png");
		messageDiv.innerHTML = "Chosen the same card or cards don't match, select another!";
	}

	cardsChonesArr = [];
	cardsChonesArrID = [];
	// вывести в тег span количество открытых карточек
	span.textContent = String(nOfOpenedCardsArr.length);

	// если количество открытых карточек равно половине от их общего числа
	if (nOfOpenedCardsArr.length === cardsArr.length / 2) {
		// выдать сообщение о победе
		messageDiv.innerHTML = "You won!";
	}
}

// перевернуть карточку
function flipCard() {
	let cardId = this.getAttribute("id");
	// записать имя изображения
	cardsChonesArr.push(cardsArr[cardId].imageName);
	cardsChonesArrId.push(cardId);
	// записать в атрибут src путь к файлу с изображением
	this.setAttribute("src", cardsArr[cardId].imagePath);

	// задержка после выбора второй карточки 1 сек
	if (cardsChonesArr.length === 2) {
		setTimeout(checkForMatch, 1000);
	}
} // flipCard()




