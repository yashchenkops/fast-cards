const container = document.querySelector('.plans');

fetchPlans().then(renderPlans);

function renderPlans(plans) {
  plans.forEach((plan) => {
    const card = createCard(plan);
    container.append(card);
  });
}

function createCard(plan) {
  const card = document.createElement('div');

  card.className = 'plan';
  card.innerHTML = `
    <div class="plan__pricing">
      ${plan.is_best ? '<div class="is-best">Best value</div>' : ''}
      <span class="plan__pricing-amount">$${plan.amount}</span>
      /per year
    </div>

    <div class="plan__name">
      <p class="plan__name-prod">${plan.name_prod}</p>
      <p class="plan__name-license">${plan.license_name}</p>
    </div>

    <div class="plan__actions">
      <a class="plan__actions-download" href="${plan.link}">
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
