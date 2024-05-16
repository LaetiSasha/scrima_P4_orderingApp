document.querySelectorAll(".add-btn").forEach(function getOrder(item) {
	item.addEventListener("click", function (e) {
		/*écouteurs des +*/
		buttonId = e.target.id;
		let buttonIdNum = Number(buttonId);

		/*alimentation du tableau de choix*/
		menuArray.forEach(function (choosenMeal) {
			if (choosenMeal.id === buttonIdNum) {
				orderArray.push(choosenMeal);
				/*alimentation du tableau de choix*/

				/*affichage du panier de commande*/
				choiceHtml += `
                <div class="meal">
                    <p id="mealName">${choosenMeal.name}</p>
                    <button id=${y++} class="remove-btn">remove</button>
                    <p>$${choosenMeal.price}</p>
                </div>
                `;

				function countOccurrences(arr, propName, propValue) {
					let count = 0;
					for (let obj of arr) {
						if (obj[propName] === propValue) {
							count++;
						}
					}
					return count;
				}
				const numberOfPizza = countOccurrences(
					orderArray,
					"name",
					"Pizza"
				);
				//console.log("Number of Pizza:", numberOfPizza);

				const numberOfBurger = countOccurrences(
					orderArray,
					"name",
					"Hamburger"
				);
				//console.log("Number of Burger:", numberOfBurger);

				const numberOfBeer = countOccurrences(
					orderArray,
					"name",
					"Beer"
				);
				//console.log("Number of Beer:", numberOfBeer);
				//console.log(typeof numberOfBeer);
				//console.log(choosenMeal.price * numberOfBeer);
				total =
					choosenMeal.price * numberOfPizza +
					choosenMeal.price * numberOfBurger +
					choosenMeal.price * numberOfBeer;
			}

			/*calcul du total commande*/
			//total = choosenMeal.price * numberOfBeer;
			/*calcul du total commande*/
			mealContainer.innerHTML = choiceHtml;
			/*affichage du panier de commande*/
			/*test du boutton remove*/

			document.querySelectorAll(".remove-btn").forEach(function (item) {
				item.addEventListener("click", function (e) {
					removeBtnId = e.target.id;
					console.log(removeBtnId);

					let removeBtnIdNum = Number(removeBtnId);
					console.log(removeBtnIdNum);
					//console.log(removeBtnIdNum);
					function removeFirstObjectById(arr, idToRemove) {
						let found = false;
						return arr.filter((obj) => {
							if (!found && obj.id === idToRemove) {
								found = true;
								return false;
							}
							return true;
						});
					}

					let idToRemove = removeBtnIdNum;
					//console.log(idToRemove);
					orderArray = removeFirstObjectById(orderArray, idToRemove);

					//console.log(orderArray.length);
					if (orderArray.length === 0) {
						orderContainer.style.display = "none";
					} else {
						orderContainer.style.display = "flex";
					}

					function countOccurrences(arr, propName, propValue) {
						let counter = 0;
						for (let obj of arr) {
							if (obj[propName] === propValue) {
								counter++;
							}
						}
						return counter;
					}
					const numberOfPizza = countOccurrences(
						orderArray,
						"name",
						"Pizza"
					);
					//console.log("Number of Pizza:", numberOfPizza);

					const numberOfBurger = countOccurrences(
						orderArray,
						"name",
						"Hamburger"
					);
					//console.log("Number of Burger:", numberOfBurger);

					const numberOfBeer = countOccurrences(
						orderArray,
						"name",
						"Beer"
					);
					function renderOrder(array) {
						let orderHtml = "";
						console.log(array);
						array.forEach((obj) => {
							console.log(choosenMeal);
							orderHtml += `
                                <div class="meal">
                                    <p id="mealName">${obj.name}</p>
                                    <button id=${y++} class="remove-btn">remove</button>
                                    <p>$${obj.price}</p>
                                </div>
                                `;
							total =
								obj.price * numberOfPizza +
								obj.price * numberOfBurger +
								obj.price * numberOfBeer;
						});

						mealContainer.innerHTML = orderHtml;
						document.getElementById(
							"price"
						).innerHTML = `$${total}`;
						return total;
					}

					renderOrder(orderArray);

					//mealContainer.innerHTML = choiceHtml;
					console.log(orderArray);

					return orderArray;
				});
			});

			return orderArray;
		});

		document.getElementById("order").style.display = "flex";
		document.getElementById("total_price").style.display = "flex";
		document.getElementById("price").innerHTML = `$${total}`;
		document.getElementById("total").style.borderTop = "2px solid #393333";
		document.getElementById("order_btn").style.display = "flex";
	});
});
