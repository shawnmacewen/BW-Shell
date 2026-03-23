// PR4: extracted Placeholder view renderer from index.html (global runtime compatibility).

function renderWebsitesSubmissionsView() {
  const rows = [
    ['Feb 06, 2026, 2:19 PM ET', 'ABC Investments', 'john.dash@abcinvestments', 'Rev 3', '3', 'Multiple Categories', 'Under Review'],
    ['Feb 03, 2026, 1:35 PM ET', 'ABC Investments', 'john.dash@abcinvestments', 'Rev 1', '2', 'Multiple Categories', 'Submitted'],
    ['Jan 21, 2026, 12:02 PM ET', 'ABC Investments', 'john.dash@abcinvestments', 'Rev 2', '6', 'Multiple Categories', 'Under Review'],
    ['Jan 05, 2026, 8:19 PM ET', 'Superior Wealth Management', 'Compliance (on behalf of advisor)', 'Rev 1', '1', 'Navigation & Page Links', 'Under Review'],
    ['Aug 05, 2025, 5:22 PM ET', 'ABC Investments', 'amy.assistant@abcinvestments', 'Rev 1', '1', 'Contact & Location Info', 'Office Review'],
    ['Aug 05, 2025, 4:19 PM ET', 'ABC Investments', 'john.dash@abcinvestments', 'Rev 1', '4', 'Multiple Categories', 'Under Review'],
    ['Aug 05, 2025, 3:54 PM ET', 'ABC Investments', 'john.dash@abcinvestments', 'Rev 3', '3', 'Uncategorized', 'Missing Fields']
  ]
    .map(
      (r) => `<tr><td>${r[0]}</td><td><a href="#" class="archive-link">${r[1]}</a></td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td><td>${r[6]}</td><td><button class="page-btn">View</button></td></tr>`
    )
    .join('');

  pageContainer.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Compliance Submissions Activity Log</h1>
    </div>
    <div class="users-subnav" style="margin-bottom:0.85rem;">
      <button class="users-subnav-item" type="button">Website Management</button>
      <button class="users-subnav-item" type="button">Analytics</button>
      <button class="users-subnav-item active" type="button">Submissions</button>
    </div>

    <section class="roles-panel">
      <div class="accounts-filter-row" style="margin-bottom:0.8rem;">
        <div class="field-group"><label>Product</label><select class="text-input"><option>Websites</option></select></div>
        <div class="field-group"><label>Review Status</label><select class="text-input"><option>All</option><option>Under Review</option><option>Submitted</option></select></div>
        <div class="field-group"><label>Submission Categories</label><select class="text-input"><option>All</option><option>Multiple Categories</option><option>Navigation & Page Links</option></select></div>
        <div class="field-group"><label>Submission Date</label><input class="text-input" placeholder="MM/DD/YYYY - MM/DD/YYYY" /></div>
      </div>

      <div class="table-wrap">
        <table class="users-table">
          <thead>
            <tr>
              <th>Submit On</th>
              <th>Website Name</th>
              <th>Submitted By</th>
              <th>Revision</th>
              <th>Item Counts</th>
              <th>Submission Category</th>
              <th>Review Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}


function renderPrintView() {
  const currentRole = window.currentRole || 'Super Admin';
  const isSuperAdmin = currentRole === 'Super Admin';
  window.__printTabState = window.__printTabState || { advisor: 'Store', admin: 'Print Orders' };

  const advisorTabs = ['Store', 'My Orders', 'My Profile'];
  const adminTabs = ['Print Orders'];
  const tabs = isSuperAdmin ? adminTabs : advisorTabs;
  const activeTab = isSuperAdmin ? (window.__printTabState.admin || 'Print Orders') : (window.__printTabState.advisor || 'Store');
  const safeTab = tabs.includes(activeTab) ? activeTab : tabs[0];

  pageContainer.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Print</h1>
      <p class="page-subtitle">Print experience mock for role-specific user journeys.</p>
    </div>
    <div class="users-subnav" style="margin-bottom:0.9rem;">
      ${tabs.map((tab) => `<button class="users-subnav-item ${tab === safeTab ? 'active' : ''}" data-print-tab="${tab}" type="button">${tab}</button>`).join('')}
    </div>
    <section class="roles-panel" style="min-height:220px;">
      <h3 style="margin:0 0 0.55rem;">${safeTab}</h3>
      <p class="placeholder-copy">Content for <strong>${safeTab}</strong> will be populated later.</p>
    </section>
  `;

  pageContainer.querySelectorAll('[data-print-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextTab = btn.getAttribute('data-print-tab');
      if (isSuperAdmin) window.__printTabState.admin = nextTab;
      else window.__printTabState.advisor = nextTab;
      renderPrintView();
    });
  });
}

function renderPlaceholderView(sectionName) {
  if (sectionName === 'Websites') {
    renderWebsitesSubmissionsView();
    return;
  }

  if (sectionName === 'Print') {
    renderPrintView();
    return;
  }

  const sectionCards = placeholderSections[sectionName] || [];
  const cards = sectionCards
    .map(([title, desc]) => `<article class="placeholder-card"><h3>${title}</h3><p>${desc}</p></article>`)
    .join('');

  const headerTitle = pageHeaderTitles[sectionName] || sectionName;

  pageContainer.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">${headerTitle}</h1>
        <p class="page-subtitle">This section is ready for the next phase of UI buildout.</p>
      </div>
      <div class="placeholder-grid">${cards}</div>
    `;
}
