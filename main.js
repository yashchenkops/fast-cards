function createCard(plan) {
  const card = document.createElement('div');

  card.className = 'card';
  card.innerHTML = `
    <div class="card__pricing">
      ${plan.is_best ? '<div class="is-best">Best value</div>' : ''}
      <span class="card__pricing-amount">$${plan.amount}</span>
      /per year
    </div>
    <div class="card__name">
      <p class="card__name-prod">${plan.name_prod}</p>
      <p class="card__name-license">${plan.license_name}</p>
    </div>
    <div class="card__actions">
      <a class="card__actions-download" href="${plan.link}">
        Download
      </a>
    </div>
  `;

  return card;
}

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
