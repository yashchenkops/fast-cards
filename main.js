const container = document.querySelector('.plans');
const arrow = document.querySelector('.download-arrow');
const cardBadge = document.getElementById('card-badge-template').innerHTML;

fetchPlans().then(renderPlans);

function renderPlans(plans) {
  plans.forEach((plan) => {
    const card = createCard(plan);
    container.append(card);
  });
}

function createCard(plan) {
  const card = document.createElement('div');
  const priceOld = plan.amount_html ? plan.amount_html.slice(0, 5) : null;
  const period = priceOld ? '/mo' : '/per year';
  const nameDisplay = plan.name_display;

  card.className = 'plan';
  card.innerHTML = `
    <div class="plan__pricing">
      ${plan.is_best ? '<div class="is-best">Best value</div>' : ''}
      ${plan.price_key === '50%' ? `<div class="card__badge">${cardBadge}</div>` : ''}
      <span class="plan__pricing-amount">$${plan.amount}</span>
      ${priceOld ? `<span class="plan__pricing-old">${priceOld}</span>` : ''}
      ${period}
    </div>

    <div class="plan__name">
      <p class="plan__name-display">${nameDisplay}</p>
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

  if (!response.ok) {
    console.error('API error');
    return [];
  }

  const data = await response.json();
  return data.result.elements;
}

document.addEventListener('click', function (e) {
  const btn = e.target.closest('a.plan__actions-download');
  if (!btn) return;

  e.preventDefault();

  window.open(btn.href, '_blank');

  setTimeout(showDownloadArrow, 400);
});

function showDownloadArrow() {
  if (!arrow) return;

  arrow.classList.add('is-visible');

  if (getBrowser() === 'firefox') {
    arrow.classList.add('download-arrow--firefox');
  }
}

function getBrowser() {
  const browser = navigator.userAgent;

  if (browser.includes('Firefox')) return 'firefox';
  if (browser.includes('Chrome')) return 'chrome';

  return 'other';
}
