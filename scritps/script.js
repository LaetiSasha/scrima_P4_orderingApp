import { menuArray } from "./data.js";

/* #region Variables */
const mainContainer = document.getElementById("menu_container");
const mealContainer = document.getElementById("meal_container");
const orderContainer = document.getElementById("order_container");
const priceContainer = document.getElementById("price");
const orderBtn = document.getElementById("order_btn");
const paymentContainer = document.getElementById("payment_container");
const closeBtn = document.getElementById("close-btn");
const paymentBtn = document.getElementById("payment-btn");
const greetingContainer = document.getElementById("greeting_container");
const inputFieldName = document.getElementById("input-Field-Name");
const cardNumber = document.getElementById("card-Number");
const cardCCV = document.getElementById("card-CVV");

let feedHtml = "";
let choiceHtml = "";
let orderArray = [];
/* #endregion */

/* #region Create & insert menu in DOM */
function getFeedHtml() {
	menuArray.forEach(function (meal) {
		feedHtml += `
			<div class="meal-container">
				<p class="emoji">${meal.emoji}</p>
					<div class="meal-description">
						<p class="meal-name">${meal.name}</p>
						<p class="meal-ingredients">${meal.ingredients}</p>
						<p class="meal-price">$${meal.price}</p>
					</div>
					<button id=${meal.id} class="add-btn">+</button>
			</div>
        `;
		return feedHtml;
	});
}
getFeedHtml();
mainContainer.innerHTML = feedHtml;
/*#endregion*/

/* #region EventListener */
document.querySelectorAll(".add-btn").forEach(function (item) {
	item.addEventListener("click", function (event) {
		greetingContainer.style.display = "none";
		updateOrderArray(Number(item.id), "add");
		getChoiceHtml();
		orderContainer.style.display = "flex";
		let total = totalPrice(orderArray);
		priceContainer.innerHTML = "$" + total;
	});
});
/*#endregion*/

function getChoiceHtml() {
	choiceHtml = "";
	console.log(orderArray.length);
	orderArray.forEach(function (orderItem) {
		const mat = menuArray.find((item) => item.id === orderItem.id);
		console.log(orderArray);
		console.log(mat);
		if (mat) {
			for (let i = 0; i < orderItem.counter; i++) {
				console.log(mat.id);
				choiceHtml += `
                    <div class="meal">
                        <p class="mealName">${mat.name}</p>
                        <button id="${mat.id}" class="remove-btn">remove</button>
                        <p>$${mat.price}</p>
                    </div>
                `;
			}
		}
	});
	mealContainer.innerHTML = choiceHtml;
	attachRemoveButtonListeners();
}

function addTotalPriceToDOM() {
	totalPrice(orderArray);
}

/* #region Functions */

const updateOrderArray = (id, action) => {
	let meal = {
		id: id,
		counter: 1,
	};

	let index = orderArray.findIndex((element) => element.id === id);

	if (action === "add") {
		if (index !== -1) {
			orderArray[index].counter++;
		} else {
			orderArray.push(meal);
		}
	}

	if (action === "remove") {
		orderArray[index].counter--;
	}
	console.log(orderArray);
	return orderArray;
};

function totalPrice(itemOfArray) {
	let price = 0;

	let sum = 0;
	itemOfArray.forEach(function (id, counter) {
		if (id.id != 0) {
			price = id.counter * 12;
		} else {
			price = id.counter * 14;
		}
		sum += price;
	});
	//console.log(sum);
	return sum;
}

function attachRemoveButtonListeners() {
	document.querySelectorAll(".remove-btn").forEach(function (item) {
		item.addEventListener("click", function (event) {
			updateOrderArray(Number(item.id), "remove");
			getChoiceHtml();
			let total = totalPrice(orderArray);
			priceContainer.innerHTML = "$" + total;
			console.log(total);
			if (total === 0) {
				orderContainer.style.display = "none";
			}
		});
	});
}

function getTheName() {
	const inputField = document.getElementById("input-Field-Name");
	const inputFieldContent = inputField.value;
	return inputFieldContent;
}
/* #endregion */

/* #region EventListener */
orderBtn.addEventListener("click", function () {
	paymentContainer.style.display = "flex";
});

paymentBtn.addEventListener("click", function () {
	const custommerName = getTheName();
	console.log(custommerName);
	paymentContainer.style.display = "none";
	orderContainer.style.display = "none";
	const nameHtml = `<p>Thanks ${custommerName}! Your order is on its way!</p>`;
	console.log(nameHtml);
	greetingContainer.innerHTML = nameHtml;
	greetingContainer.style.display = "flex";
});

closeBtn.addEventListener("click", function () {
	paymentContainer.style.display = "none";
	inputFieldName.value = "";
	cardNumber.value = "";
	cardCCV.value = "";
});

/* #endregion */
