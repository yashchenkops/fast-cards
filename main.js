async function fetchPlans() {
  const response = await fetch('https://veryfast.io/t/front_test_api.php');
  const data = await response.json();

  return data.result.elements;
}

fetchPlans().then((plans) => {
  const container = document.querySelector('.items');

  plans.forEach((plan) => {
    const card = createCard(plan);
    container.append(card);
  });
});
