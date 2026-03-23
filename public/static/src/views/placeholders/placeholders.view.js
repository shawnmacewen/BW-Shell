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
  window.__printOrderState = window.__printOrderState || { mode: 'list', orderId: null, previewOpen: false, previewOrderId: null };

  const printOrders = [
    { orderDate: '2026-03-18', orderNumber: 'PO-100384', status: 'Pending', tracking: '', shippedDate: '', previewPdf: 'assets/pdfs/ArchiveSnapsnot2.pdf' },
    { orderDate: '2026-03-16', orderNumber: 'PO-100361', status: 'Shipped', tracking: '1Z999AA10123456784', shippedDate: '2026-03-17', previewPdf: 'assets/pdfs/archivingExample.pdf' },
    { orderDate: '2026-03-12', orderNumber: 'PO-100322', status: 'Shipped', tracking: '1Z999AA10123456785', shippedDate: '2026-03-14', previewPdf: 'assets/pdfs/ArchiveSnapsnot2.pdf' }
  ];

  const advisorTabs = ['Store', 'My Orders', 'My Profile'];
  const adminTabs = ['Print Orders'];
  const tabs = isSuperAdmin ? adminTabs : advisorTabs;
  const activeTab = isSuperAdmin ? (window.__printTabState.admin || 'Print Orders') : (window.__printTabState.advisor || 'Store');
  const safeTab = tabs.includes(activeTab) ? activeTab : tabs[0];

  let tabContent = '';

  if (safeTab === 'Store') {
    tabContent = `
      <div class="print-store-layout">
        <section class="roles-panel print-store-left">
          <h3 style="margin:0 0 0.55rem;">Print Store</h3>
          <p class="placeholder-copy">Order professionally branded marketing materials and stationery from the print storefront.</p>
          <p class="placeholder-copy">This area will include promotional content, featured products, and guidance for best-use templates.</p>
        </section>
        <section class="roles-panel print-store-right">
          <button class="page-btn primary print-store-btn" type="button">Go to Storefront</button>
          <p class="print-help-copy">Clicking button will open Storefront in a new page. You can return here and click "My Orders" to see any of your orders and pending status.</p>
        </section>
      </div>
    `;
  } else if (safeTab === 'My Orders' || safeTab === 'Print Orders') {
    if (window.__printOrderState.mode === 'detail' && window.__printOrderState.orderId) {
      const selected = printOrders.find((o) => o.orderNumber === window.__printOrderState.orderId);
      tabContent = `
        <div class="users-breadcrumb"><a href="#" id="printOrdersBackLink">My Orders</a> <span>›</span> <span>${selected?.orderNumber || ''}</span></div>
        <section class="roles-panel">
          <h3 style="margin:0 0 0.6rem;">Order Details — ${selected?.orderNumber || ''}</h3>
          <p class="placeholder-copy">This page will show detailed order line items, product options, print quantities, and shipping metadata.</p>
          <div class="create-account-grid" style="grid-template-columns:1fr 1fr;">
            <div><label>Order Date</label><input class="text-input" value="${selected?.orderDate || ''}" readonly /></div>
            <div><label>Status</label><input class="text-input" value="${selected?.status || ''}" readonly /></div>
            <div><label>Tracking</label><input class="text-input" value="${selected?.tracking || 'N/A'}" readonly /></div>
            <div><label>Shipped Date</label><input class="text-input" value="${selected?.shippedDate || 'N/A'}" readonly /></div>
          </div>
        </section>
      `;
    } else {
      tabContent = `
        <section class="roles-panel">
          <div class="table-wrap">
            <table class="users-table">
              <thead>
                <tr>
                  <th>Order Date</th>
                  <th>Order Number</th>
                  <th>Status</th>
                  <th>Tracking Number</th>
                  <th>Shipped Date</th>
                  <th>PDF Preview</th>
                  <th>Order Details</th>
                </tr>
              </thead>
              <tbody>
                ${printOrders.map((o) => `<tr>
                  <td>${o.orderDate}</td>
                  <td>${o.orderNumber}</td>
                  <td><span class="status-pill ${o.status === 'Shipped' ? 'active' : ''}">${o.status}</span></td>
                  <td>${o.tracking ? `<a class="archive-link" target="_blank" rel="noreferrer" href="https://www.ups.com/track?tracknum=${o.tracking}">${o.tracking}</a>` : '—'}</td>
                  <td>${o.shippedDate || '—'}</td>
                  <td><button type="button" class="page-btn print-order-preview-btn" data-order-number="${o.orderNumber}">Preview</button></td>
                  <td><a href="#" class="archive-link print-order-details-link" data-order-number="${o.orderNumber}">Open</a></td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </section>
      `;
    }
  } else {
    tabContent = `
      <section class="roles-panel">
        <div class="users-header-row users-header-spaced" style="margin-bottom:0.7rem;">
          <h3 style="margin:0;">My Profile</h3>
          <div class="users-actions">
            <select class="text-input" style="min-width:180px;"><option>Default Profile</option><option>Advisor East Profile</option></select>
            <button class="new-role-btn secondary" type="button">Create Profile</button>
            <button class="new-role-btn" type="button">Save Profile</button>
          </div>
        </div>

        <div class="create-account-grid" style="grid-template-columns:1fr 1fr; gap:1rem 1.2rem;">
          <div>
            <h4 style="margin:0 0 0.5rem;">Your Information</h4>
            <div class="field-group"><label>First Name</label><input class="text-input" value="Siva" /></div>
            <div class="field-group"><label>Last Name</label><input class="text-input" value="Kumar" /></div>
            <div class="field-group"><label>Company Name</label><input class="text-input" value="ABC Investments" /></div>
            <div class="field-group"><label>Email Address</label><input class="text-input" value="siva.kumar@abcinvestments.com" /></div>
            <div class="field-group"><label>Website URL</label><input class="text-input" value="https://www.abcinvestments.com" /></div>
            <div class="field-group"><label>Phone</label><input class="text-input" value="(416) 555-0199" /></div>
            <div class="field-group"><label>Cell Phone</label><input class="text-input" value="(416) 555-0132" /></div>
            <div class="field-group"><label>Title</label><input class="text-input" value="Senior Financial Advisor" /></div>
          </div>
          <div>
            <h4 style="margin:0 0 0.5rem;">Address Information</h4>
            <div class="field-group"><label>Street Address</label><input class="text-input" value="145 King Street West" /></div>
            <div class="field-group"><label>Address 2</label><input class="text-input" value="Suite 1300" /></div>
            <div class="field-group"><label>City</label><input class="text-input" value="Toronto" /></div>
            <div class="field-group"><label>State / Province</label><input class="text-input" value="Ontario" /></div>
            <div class="field-group"><label>Zip / Postal Code</label><input class="text-input" value="M5H 1J8" /></div>
          </div>
        </div>
      </section>
    `;
  }

  pageContainer.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Print</h1>
    </div>
    <div class="users-subnav" style="margin-bottom:0.9rem;">
      ${tabs.map((tab) => `<button class="users-subnav-item ${tab === safeTab ? 'active' : ''}" data-print-tab="${tab}" type="button">${tab}</button>`).join('')}
    </div>
    ${tabContent}
    <div class="pdf-modal" id="printPreviewModal" ${window.__printOrderState.previewOpen ? '' : 'hidden'}>
      <div class="pdf-modal-backdrop" id="printPreviewBackdrop"></div>
      <div class="pdf-modal-dialog" style="max-width:920px;height:auto;">
        <div class="pdf-modal-header"><h3>PDF Preview — ${window.__printOrderState.previewOrderId || ''}</h3><button class="page-btn" type="button" id="printPreviewCloseBtn">Close</button></div>
        <div class="pdf-modal-body" style="padding:0.8rem;">
          <iframe title="Print preview" src="assets/pdfs/ArchiveSnapsnot2.pdf" style="width:100%;height:62vh;border:1px solid #dce4f0;border-radius:6px;"></iframe>
        </div>
      </div>
    </div>
  `;

  pageContainer.querySelectorAll('[data-print-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextTab = btn.getAttribute('data-print-tab');
      if (isSuperAdmin) window.__printTabState.admin = nextTab;
      else window.__printTabState.advisor = nextTab;
      window.__printOrderState.mode = 'list';
      renderPrintView();
    });
  });

  pageContainer.querySelectorAll('.print-order-preview-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      window.__printOrderState.previewOpen = true;
      window.__printOrderState.previewOrderId = btn.getAttribute('data-order-number');
      renderPrintView();
    });
  });
  pageContainer.querySelector('#printPreviewCloseBtn')?.addEventListener('click', () => {
    window.__printOrderState.previewOpen = false;
    renderPrintView();
  });
  pageContainer.querySelector('#printPreviewBackdrop')?.addEventListener('click', () => {
    window.__printOrderState.previewOpen = false;
    renderPrintView();
  });

  pageContainer.querySelectorAll('.print-order-details-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.__printOrderState.mode = 'detail';
      window.__printOrderState.orderId = link.getAttribute('data-order-number');
      renderPrintView();
    });
  });
  pageContainer.querySelector('#printOrdersBackLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.__printOrderState.mode = 'list';
    window.__printOrderState.orderId = null;
    renderPrintView();
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
