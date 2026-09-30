/**
 * Mobile Jewellery & Kitty Savings App - Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const toast = document.getElementById('appToast');
  const navItems = document.querySelectorAll('.nav-item');
  const actionItems = document.querySelectorAll('.action-item');
  const collectionItems = document.querySelectorAll('.collection-item');
  const payNowBtn = document.getElementById('payNowBtn');
  const viewAllPlansBtn = document.getElementById('viewAllPlansBtn');
  const viewAllCollectionsBtn = document.getElementById('viewAllCollectionsBtn');
  const notificationBtn = document.getElementById('notificationBtn');
  const goldRateCard = document.getElementById('goldRateCard');
  const searchInput = document.getElementById('searchInput');

  let toastTimeout;

  /**
   * Show feedback toast message
   * @param {string} message 
   */
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // Bottom Navigation Switching
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.id === 'navPlans') {
        window.location.href = 'goldPlan.html';
        return;
      }
      if (item.id === 'navMyPlan') {
        window.location.href = 'scheme.html';
        return;
      }
      if (item.id === 'navLiveRate') {
        window.location.href = 'liverate.html';
        return;
      }
      navItems.forEach(nav => {
        nav.classList.remove('active');
        nav.setAttribute('aria-selected', 'false');
      });
      item.classList.add('active');
      item.setAttribute('aria-selected', 'true');
      
      const label = item.querySelector('.nav-label')?.textContent.trim() || 'Tab';
      showToast(`Navigated to ${label}`);
    });
  });

  // Quick Action Buttons
  actionItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.id === 'actionGoldPlans') {
        window.location.href = 'goldPlan.html';
        return;
      }
      if (item.id === 'actionPayInstallment') {
        window.location.href = 'payment.html';
        return;
      }
      if (item.id === 'actionInstagram') {
        window.open('https://instagram.com', '_blank');
        return;
      }
      const label = item.querySelector('.action-label')?.innerText.replace(/\n/g, ' ') || 'Action';
      showToast(`Opening ${label}`);
    });
  });

  // Category Items
  collectionItems.forEach(item => {
    item.addEventListener('click', () => {
      const label = item.querySelector('.collection-label')?.textContent.trim() || 'Category';
      showToast(`Viewing ${label} Collection`);
    });
    
    // Keyboard accessibility
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  // Pay Now Button
  if (payNowBtn) {
    payNowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = 'payment.html';
    });
  }

  // View All buttons
  if (viewAllPlansBtn) {
    viewAllPlansBtn.addEventListener('click', () => {
      window.location.href = 'plans.html';
    });
  }

  if (viewAllCollectionsBtn) {
    viewAllCollectionsBtn.addEventListener('click', () => {
      showToast('Opening all jewellery collections...');
    });
  }

  // Notification Button
  if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
      showToast('No new notifications');
    });
  }

  // Gold Rate Card
  if (goldRateCard) {
    goldRateCard.addEventListener('click', () => {
      showToast("Gold 22KT: ₹6,450/gm (+3.9% Today)");
    });
  }

  // Search Input interaction
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          showToast(`Searching for "${query}"...`);
        }
      }
    });
  }

  console.log('Mobile Jewellery App initialized successfully.');
});
