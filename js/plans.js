/**
 * Gold Savings Plans - Vanilla Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const tabPopular = document.getElementById('tabPopular');
  const tabHow = document.getElementById('tabHow');
  const panePopular = document.getElementById('panePopular');
  const paneHow = document.getElementById('paneHow');
  const headerBackBtn = document.getElementById('headerBackBtn');
  const planActionBtns = document.querySelectorAll('.btn-plan-action');
  const enrollModal = document.getElementById('enrollModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalPlanTitle = document.getElementById('modalPlanTitle');
  const modalMonthly = document.getElementById('modalMonthly');
  const modalTotal = document.getElementById('modalTotal');
  const btnConfirmEnroll = document.getElementById('btnConfirmEnroll');
  const toast = document.getElementById('appToast');
  const navItems = document.querySelectorAll('.nav-item');

  let toastTimeout;

  /**
   * Display toast feedback notification
   * @param {string} msg 
   */
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // Tab switching: Popular Plans vs How it Works
  function setActiveTab(tab) {
    if (tab === 'popular') {
      tabPopular.classList.add('active');
      tabPopular.classList.remove('inactive');
      tabPopular.setAttribute('aria-selected', 'true');

      tabHow.classList.add('inactive');
      tabHow.classList.remove('active');
      tabHow.setAttribute('aria-selected', 'false');

      panePopular.classList.add('active');
      paneHow.classList.remove('active');
    } else {
      tabHow.classList.add('active');
      tabHow.classList.remove('inactive');
      tabHow.setAttribute('aria-selected', 'true');

      tabPopular.classList.add('inactive');
      tabPopular.classList.remove('active');
      tabPopular.setAttribute('aria-selected', 'false');

      paneHow.classList.add('active');
      panePopular.classList.remove('active');
    }
  }

  if (tabPopular) {
    tabPopular.addEventListener('click', () => setActiveTab('popular'));
  }

  if (tabHow) {
    tabHow.addEventListener('click', () => setActiveTab('how'));
  }

  // Back button navigation
  if (headerBackBtn) {
    headerBackBtn.addEventListener('click', () => {
      if (document.referrer && document.referrer.includes('index.html')) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    });
  }

  // Start Plan button interactions -> open confirmation modal
  planActionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.plan-card');
      const planName = card.getAttribute('data-plan') || 'Savings Plan';
      const monthly = card.getAttribute('data-monthly') || '₹5,000';
      const total = card.getAttribute('data-total') || '₹30,000';

      if (modalPlanTitle) modalPlanTitle.textContent = planName;
      if (modalMonthly) modalMonthly.textContent = monthly;
      if (modalTotal) modalTotal.textContent = total;

      if (enrollModal) {
        enrollModal.classList.add('active');
      }
    });
  });

  // Modal Close Handlers
  function closeModal() {
    if (enrollModal) {
      enrollModal.classList.remove('active');
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (enrollModal) {
    enrollModal.addEventListener('click', (e) => {
      if (e.target === enrollModal) {
        closeModal();
      }
    });
  }

  // Modal Confirm Button
  if (btnConfirmEnroll) {
    btnConfirmEnroll.addEventListener('click', () => {
      closeModal();
      showToast('Plan initiated! Redirecting to payment...');
    });
  }

  // Nav Items feedback (except Home which has direct href)
  navItems.forEach(item => {
    if (item.tagName.toLowerCase() === 'button') {
      item.addEventListener('click', () => {
        const label = item.querySelector('.nav-label')?.textContent.trim() || 'Tab';
        if (item.id !== 'navPlans') {
          showToast(`Opening ${label}...`);
        }
      });
    }
  });
});
