const STORAGE_KEY = "roommate-haven-sprint1-v2";

const defaults = {
  loggedIn: false,
  verified: false,
  email: "",
  page: "home",
  householdTab: "today",
  language: "simple",
  unread: true,
  netBalance: 52.6,
  notifications: [
    { id: 1, type: "alert", text: "Daniel's bins task is overdue. An automatic in-app reminder was sent.", time: "Today · 9:05 AM", unread: true },
    { id: 2, type: "expense", text: "Your internet share is overdue. An automatic in-app reminder was sent.", time: "Today · 8:45 AM", unread: true },
    { id: 3, type: "proposal", text: "Spring chore rotation is ready for housemate review.", time: "Yesterday · 6:30 PM", unread: true },
    { id: 4, type: "expense", text: "Emily added the July electricity bill. Your share is $31.40.", time: "12 July · 4:18 PM", unread: false }
  ],
  tasks: [
    { id: "bins", title: "Take bins to the kerb", detail: "General waste + yellow recycling bin", person: "Daniel", avatar: "daniel", due: "Overdue by 1 day", status: "overdue", icon: "trash-2" },
    { id: "kitchen", title: "Wipe kitchen benches", detail: "Clean stove, sink and shared surfaces", person: "Alex", avatar: "alex", due: "Due today · 8:00 PM", status: "open", icon: "cooking-pot" },
    { id: "bathroom", title: "Clean upstairs bathroom", detail: "Shower, mirror and floor", person: "Mia", avatar: "mia", due: "Due tomorrow", status: "open", icon: "sparkles" }
  ],
  activities: [
    { icon: "bell-ring", text: "Automatic reminder sent to Daniel", time: "Today · 9:05 AM" },
    { icon: "circle-check-big", text: "Emily completed vacuuming", time: "Yesterday · 7:42 PM" },
    { icon: "calendar-sync", text: "Weekly assignments rotated", time: "Monday · 8:00 AM" }
  ],
  history: [
    { task: "Vacuum common area", person: "Emily Wong", date: "13 Jul, 7:42 PM", status: "On time" },
    { task: "Clean upstairs bathroom", person: "Mia Lopez", date: "12 Jul, 4:16 PM", status: "On time" },
    { task: "Wipe kitchen benches", person: "Alex Chen", date: "11 Jul, 8:03 PM", status: "3 min late" },
    { task: "Take bins to the kerb", person: "Daniel Kim", date: "7 Jul, 6:28 PM", status: "On time" }
  ],
  rules: [],
  proposal: { status: "draft", approvals: { Emily: false, Daniel: false, Mia: false }, note: "" },
  expenses: [
    { id: 1, description: "Weekend groceries", category: "Groceries", amount: 86.2, payer: "Alex", participants: 4, date: "12 July", status: "open", icon: "shopping-basket" },
    { id: 2, description: "July electricity", category: "Utilities", amount: 125.6, payer: "Emily", participants: 4, date: "11 July", status: "open", icon: "zap" },
    { id: 3, description: "Internet plan", category: "Utilities", amount: 79.96, payer: "Daniel", participants: 4, date: "2 July", status: "settled", icon: "wifi" }
  ],
  messages: {
    Emily: [
      { from: "them", text: "Hi Alex! I saw we have a 92% lifestyle match. Are you still looking for a room near UNSW?", time: "10:34 AM" },
      { from: "me", text: "Yes, I am. I like that your household has clear rules and a shared chore system.", time: "10:38 AM" },
      { from: "them", text: "Great. Would Saturday morning work for a quick inspection?", time: "10:42 AM" }
    ],
    Daniel: [
      { from: "them", text: "Thanks for reading through the house rules. Let me know if anything needs clarification.", time: "Monday" },
      { from: "me", text: "They are very clear, especially the simplified English version.", time: "Monday" }
    ]
  },
  activeThread: "Emily",
  blockedThreads: []
};

const ruleCopy = {
  simple: [
    { id: "kitchen", icon: "cooking-pot", category: "Kitchen", title: "Clean the kitchen after use", summary: "Wipe shared surfaces and wash your dishes.", detail: "After cooking, wash your dishes, wipe the bench and stove, and put food away. This keeps the kitchen ready for the next person.", author: "Added by Emily · 6 July" },
    { id: "bins", icon: "trash-2", category: "Rubbish", title: "Take bins out on Monday", summary: "The assigned person moves both bins by 7 PM.", detail: "General waste and recycling go to the kerb every Monday before 7 PM. Bring the empty bins back on Tuesday morning.", author: "Added by Daniel · 6 July" },
    { id: "noise", icon: "volume-2", category: "Noise", title: "Keep quiet after 10 PM", summary: "Use headphones and keep calls low at night.", detail: "From 10 PM to 7 AM, keep music, television and calls quiet. Tell the household in advance if you plan a gathering.", author: "Added by Mia · 7 July" },
    { id: "guests", icon: "users", category: "Guests", title: "Tell us before overnight guests", summary: "Post in the household chat one day before.", detail: "Let everyone know at least 24 hours before an overnight guest arrives. A guest can stay no more than two nights each week.", author: "Added by Alex · 8 July" }
  ],
  detailed: [
    { id: "kitchen", icon: "cooking-pot", category: "Kitchen etiquette", title: "Restore shared kitchen spaces after use", summary: "Complete dishes and surface cleaning within 30 minutes.", detail: "Each resident is expected to wash and store used cookware, wipe benches and the stovetop, clear food scraps from the sink, and return shared ingredients within 30 minutes of cooking.", author: "Added by Emily · 6 July" },
    { id: "bins", icon: "trash-2", category: "Waste management", title: "Complete the weekly kerbside bin routine", summary: "Assigned resident handles placement and return of bins.", detail: "The rostered resident must place general waste and recycling bins on the kerb by 7 PM Monday, confirm completion in the app, and return both bins by midday Tuesday.", author: "Added by Daniel · 6 July" },
    { id: "noise", icon: "volume-2", category: "Shared comfort", title: "Observe household quiet hours", summary: "Quiet hours apply from 10 PM until 7 AM daily.", detail: "During quiet hours, use headphones for media, keep calls at a low volume, avoid noisy appliances, and provide advance notice through the household space for social gatherings.", author: "Added by Mia · 7 July" },
    { id: "guests", icon: "users", category: "Guests", title: "Provide notice for overnight visitors", summary: "Give 24 hours' notice and respect the two-night limit.", detail: "Residents should notify all housemates at least 24 hours before hosting an overnight visitor. Visitors may stay for a maximum of two nights per seven-day period unless everyone agrees otherwise.", author: "Added by Alex · 8 July" }
  ],
  zh: [
    { id: "kitchen", icon: "cooking-pot", category: "厨房", title: "使用后请清理厨房", summary: "清洗餐具，并擦干净公共台面。", detail: "做饭后，请清洗并收好餐具，擦干净灶台和料理台，并把食物收好，方便下一位室友使用。", author: "Emily 添加 · 7月6日" },
    { id: "bins", icon: "trash-2", category: "垃圾", title: "星期一把垃圾桶推出去", summary: "当周负责人须在晚上7点前完成。", detail: "每周一晚上7点前，把生活垃圾桶和回收垃圾桶推到路边，并在星期二上午把空桶收回来。", author: "Daniel 添加 · 7月6日" },
    { id: "noise", icon: "volume-2", category: "噪音", title: "晚上10点后保持安静", summary: "夜间请戴耳机并降低通话音量。", detail: "晚上10点到早上7点之间，请降低音乐、电视和通话音量。如计划聚会，请提前通知所有室友。", author: "Mia 添加 · 7月7日" },
    { id: "guests", icon: "users", category: "访客", title: "留宿访客请提前通知", summary: "至少提前一天在家庭群里说明。", detail: "留宿访客到来前至少24小时通知所有室友。每位访客每周最多留宿两晚，除非所有室友另有共识。", author: "Alex 添加 · 7月8日" }
  ]
};

let state = loadState();
let toastTimer;
let pendingTaskDeletion = null;
let pendingExpenseDeletion = null;

function loadState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Demo mode still resets when storage is unavailable.
  }
  return structuredClone(defaults);
}

function saveState() {
  // Demo changes live only for the current page session and reset on refresh.
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function money(value) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(value);
}

function icons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { "aria-hidden": "true" } });
}

function showToast(message, type = "success") {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => modal.querySelector("input, select, textarea, button")?.focus(), 50);
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove("open");
  if (!document.querySelector(".modal-backdrop.open")) document.body.style.overflow = "";
}

function goPage(page, tab) {
  if (!document.getElementById(`page-${page}`)) page = "home";
  state.page = page;
  document.querySelectorAll(".page").forEach(node => node.classList.toggle("active", node.id === `page-${page}`));
  document.querySelectorAll("[data-page]").forEach(node => node.classList.toggle("active", node.dataset.page === page));
  if (page === "household" && tab) setHouseholdTab(tab);
  if (["discover", "community", "manage"].includes(page) && tab) setPrototypeTab(page, tab);
  window.scrollTo({ top: 0, behavior: "smooth" });
  const nextHash = `#${page}${tab ? `/${tab}` : ""}`;
  try {
    history.replaceState(null, "", nextHash);
  } catch {
    location.hash = nextHash;
  }
  saveState();
}

function setHouseholdTab(tab) {
  if (!document.getElementById(`household-${tab}`)) tab = "today";
  state.householdTab = tab;
  document.querySelectorAll("[data-household-tab]").forEach(button => button.classList.toggle("active", button.dataset.householdTab === tab));
  document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.toggle("active", pane.id === `household-${tab}`));
  saveState();
}

function setPrototypeTab(group, target) {
  const pane = document.querySelector(`[data-prototype-pane="${group}"][data-prototype-view="${target}"]`);
  if (!pane) return;
  document.querySelectorAll(`[data-prototype-tab="${group}"]`).forEach(button => button.classList.toggle("active", button.dataset.prototypeTarget === target));
  document.querySelectorAll(`[data-prototype-pane="${group}"]`).forEach(item => item.classList.toggle("active", item.dataset.prototypeView === target));
}

function updateAuth() {
  const logged = state.loggedIn;
  const verified = state.verified;
  const sidebar = document.querySelector("#sidebar-status");
  sidebar.classList.toggle("verified", verified);
  sidebar.innerHTML = verified
    ? '<span class="status-dot"></span><span><strong>Verified account</strong><small>Messaging unlocked</small></span>'
    : logged
      ? '<span class="status-dot"></span><span><strong>Signed in</strong><small>Phone check required</small></span>'
      : '<span class="status-dot"></span><span><strong>Guest mode</strong><small>Sign in to collaborate</small></span>';
  document.querySelector("#topbar-name").textContent = logged ? "Alex Chen" : "Guest";
  document.querySelector("#topbar-verify").textContent = verified ? "Verified student" : logged ? "Verification pending" : "Not signed in";
  document.querySelector("#profile-email").textContent = logged ? state.email : "Not signed in";
  const profileBadge = document.querySelector("#profile-auth-badge");
  profileBadge.innerHTML = verified ? '<i data-lucide="badge-check"></i>Verified student' : '<i data-lucide="circle-alert"></i>Not verified';
  document.querySelector("#trust-score").textContent = verified ? "3/3" : logged ? "2/3" : "1/3";
  document.querySelector("#trust-score-label").textContent = verified ? "Messaging unlocked" : logged ? "Phone check remaining" : "Login to continue";

  document.querySelector("#login-verification-card").classList.toggle("complete", logged);
  document.querySelector("#phone-verification-card").classList.toggle("complete", verified);
  document.querySelector("#message-verification-card").classList.toggle("complete", verified);
  document.querySelector("#safety-login-button").textContent = logged ? "Signed in" : "Log in";
  document.querySelector("#safety-login-button").disabled = logged;
  document.querySelector("#overall-safety-status").textContent = verified ? "3 of 3 complete" : logged ? "2 of 3 complete" : "1 of 3 complete";
  document.querySelector("#send-code").disabled = !logged || verified;
  document.querySelector("#send-code").textContent = verified ? "Verified" : "Send code";
  document.querySelector("#phone-code").disabled = !logged || verified;
  document.querySelector("#verify-code").disabled = !logged || verified;

  document.querySelector("#message-gate").hidden = verified;
  document.querySelector("#message-content").hidden = !verified;
  document.querySelector("#gate-login-step").classList.toggle("done", logged);
  document.querySelector("#gate-phone-step").classList.toggle("done", verified);
  const gateAction = document.querySelector("#message-gate-action");
  gateAction.innerHTML = logged ? '<i data-lucide="shield-check"></i>Complete phone verification' : '<i data-lucide="log-in"></i>Log in to continue';
  icons();
}

function renderTasks() {
  const taskList = document.querySelector("#task-list");
  taskList.innerHTML = state.tasks.length ? state.tasks.map(task => `
    <article class="task-card ${task.status}">
      <button class="task-check" type="button" data-complete-task="${task.id}" aria-label="${task.status === "complete" ? "Completed" : `Mark ${escapeHTML(task.title)} complete`}">
        <i data-lucide="${task.status === "complete" ? "check" : task.icon}"></i>
      </button>
      <div class="task-copy"><small>${task.status === "complete" ? "Completed" : escapeHTML(task.due)}</small><strong>${escapeHTML(task.title)}</strong><span>${escapeHTML(task.detail)}</span></div>
      <div class="task-meta">
        <div class="task-person"><span class="member-avatar ${task.avatar}">${task.person === "Alex" ? "AC" : task.person === "Daniel" ? "DK" : "ML"}</span>${escapeHTML(task.person)}</div>
        <button class="task-delete" type="button" data-delete-task="${task.id}" aria-label="Delete ${escapeHTML(task.title)}" title="Delete task"><i data-lucide="trash-2"></i></button>
      </div>
    </article>`).join("") : `
      <div class="task-empty">
        <span><i data-lucide="circle-check-big"></i></span>
        <strong>No tasks here</strong>
        <p>Create a roster when the household is ready.</p>
      </div>`;
  const openCount = state.tasks.filter(task => task.status !== "complete" && !task.due.includes("tomorrow")).length;
  document.querySelector("#chore-count").textContent = openCount;
  document.querySelector("#today-task-count").textContent = openCount;
  document.querySelector("#today-task-summary").textContent = `Tuesday · ${openCount} open`;
  icons();
}

function renderActivities() {
  document.querySelector("#activity-list").innerHTML = state.activities.slice(0, 5).map(item => `
    <div class="activity-item"><span><i data-lucide="${item.icon}"></i></span><span><strong>${escapeHTML(item.text)}</strong><small>${escapeHTML(item.time)}</small></span></div>`).join("");
  icons();
}

function renderHistory() {
  document.querySelector("#history-table").innerHTML = state.history.map(item => `
    <tr><td><strong>${escapeHTML(item.task)}</strong></td><td>${escapeHTML(item.person)}</td><td>${escapeHTML(item.date)}</td><td><span class="table-status">${escapeHTML(item.status)}</span></td></tr>`).join("");
}

function renderRoster() {
  const people = [
    { name: "Alex", initials: "AC", avatar: "alex", tasks: ["Kitchen clean · Tue", "Recycling · Thu"] },
    { name: "Emily", initials: "EW", avatar: "emily", tasks: ["Vacuum · Wed", "Bathroom · Sat"] },
    { name: "Daniel", initials: "DK", avatar: "daniel", tasks: ["Bins · Mon", "Common area · Fri"] },
    { name: "Mia", initials: "ML", avatar: "mia", tasks: ["Bathroom · Wed", "Kitchen clean · Sun"] }
  ];
  document.querySelector("#roster-grid").innerHTML = people.map(person => `<article class="roster-column"><header><span class="member-avatar ${person.avatar}">${person.initials}</span><h3>${person.name}</h3></header><ul>${person.tasks.map(task => `<li>${task}</li>`).join("")}</ul></article>`).join("");
}

function getRules() {
  return [...ruleCopy[state.language], ...state.rules];
}

function renderRules() {
  document.querySelector("#language-select").value = state.language;
  document.querySelector("#rule-list").innerHTML = getRules().map((rule, index) => `
    <article class="rule-card ${index === 0 ? "open" : ""}">
      <button type="button" data-rule-toggle="${escapeHTML(rule.id)}" aria-expanded="${index === 0}">
        <span class="rule-icon"><i data-lucide="${rule.icon || "scroll-text"}"></i></span>
        <span><h3>${escapeHTML(rule.title)}</h3><p>${escapeHTML(rule.category)} · ${escapeHTML(rule.summary)}</p></span>
        <i data-lucide="chevron-down"></i>
      </button>
      <div class="rule-details"><p>${escapeHTML(rule.detail)}</p><small>${escapeHTML(rule.author)}</small></div>
    </article>`).join("");
  icons();
}

function renderProposal() {
  const { status, approvals } = state.proposal;
  const names = ["Emily", "Daniel", "Mia"];
  const approved = Object.values(approvals).filter(Boolean).length;
  const statusLabel = { draft: "Draft", pending: "Awaiting approval", changes: "Changes requested", active: "Active" }[status];
  const badge = document.querySelector("#proposal-status");
  badge.textContent = statusLabel;
  badge.className = `status-badge ${status}`;
  document.querySelector("#approval-total").textContent = `${approved}/3`;
  document.querySelector("#proposal-progress").style.width = `${approved / 3 * 100}%`;
  document.querySelector("#proposal-summary").textContent = status === "active"
    ? "Approved by everyone. Rotation is active."
    : status === "changes"
      ? "Changes requested. Revise and send again."
      : status === "pending"
        ? `${3 - approved} response${3 - approved === 1 ? "" : "s"} left.`
        : "Send when the schedule is ready.";
  document.querySelector("#approval-list").innerHTML = names.map(name => {
    const initials = name === "Emily" ? "EW" : name === "Daniel" ? "DK" : "ML";
    const avatar = name.toLowerCase();
    const review = approvals[name] ? "Approved" : status === "draft" ? "Waiting for submission" : status === "changes" ? "Review paused" : "Awaiting response";
    const action = status === "pending" && !approvals[name]
      ? `<button class="secondary-button" type="button" data-approve="${name}">Approve</button><button class="text-button" type="button" data-request-change="${name}">Change</button>`
      : approvals[name] ? '<i data-lucide="circle-check-big"></i>' : "";
    return `<div class="approval-card"><span class="member-avatar ${avatar}">${initials}</span><span><strong>${name}</strong><small>${review}</small></span>${action}</div>`;
  }).join("");
  document.querySelector("#submit-proposal").hidden = status !== "draft";
  document.querySelector("#revise-proposal").hidden = status !== "changes";
  icons();
}

function renderExpenses() {
  const filter = document.querySelector("#expense-filter").value;
  const shown = state.expenses.filter(expense => filter === "all" || expense.status === filter);
  document.querySelector("#expense-list").innerHTML = shown.length ? shown.map(expense => {
    const share = expense.amount / expense.participants;
    const relationship = expense.payer === "Alex" ? `${expense.participants - 1} housemates owe you` : `You owe ${expense.payer}`;
    return `<article class="expense-card ${expense.status}">
      <span class="metric-icon ${expense.category === "Utilities" ? "peach" : "sage"}"><i data-lucide="${expense.icon}"></i></span>
      <span><strong>${escapeHTML(expense.description)}</strong><small>${escapeHTML(expense.category)} · Paid by ${escapeHTML(expense.payer)} · ${escapeHTML(expense.date)}</small></span>
      <span class="expense-amount"><b>${money(share)} each</b><small>${expense.status === "settled" ? "Settled" : expense.status === "disputed" ? "Under review" : relationship}</small><span class="expense-actions">${expense.status === "open" ? `<button type="button" data-settle-expense="${expense.id}">Mark settled</button><button type="button" data-dispute-expense="${expense.id}">Dispute</button>` : ""}<button class="expense-delete" type="button" data-delete-expense="${expense.id}" aria-label="Delete ${escapeHTML(expense.description)}" title="Delete expense"><i data-lucide="trash-2"></i></button></span></span>
    </article>`;
  }).join("") : '<p class="panel-intro">No expenses match this filter.</p>';
  const signed = state.netBalance >= 0 ? "+" : "−";
  document.querySelector("#net-balance").textContent = `${signed}${money(Math.abs(state.netBalance))}`;
  document.querySelector("#home-balance").textContent = money(Math.max(0, state.netBalance));
  document.querySelector("#balance-people").innerHTML = `<div class="balance-person"><span class="member-avatar daniel">DK</span><span><strong>Daniel</strong><small>owes you $36.20</small></span></div><div class="balance-person"><span class="member-avatar emily">EW</span><span><strong>Emily</strong><small>you owe $31.40</small></span></div>`;
  icons();
}

function updateExpensePreview() {
  const amount = Number(document.querySelector("#expense-amount").value) || 0;
  const checked = [...document.querySelectorAll('.member-checks input:checked')].length;
  const share = checked ? amount / checked : 0;
  document.querySelector("#split-preview-value").textContent = `${money(share)} each`;
  document.querySelector("#split-preview-count").textContent = `${checked} ${checked === 1 ? "person" : "people"}`;
  document.querySelector("#split-preview-total").textContent = `${money(share * checked)} total`;
}

function renderMessages() {
  const thread = state.activeThread;
  const fullName = thread === "Emily" ? "Emily Wong" : "Daniel Kim";
  document.querySelector("#chat-name").textContent = fullName;
  document.querySelector("#chat-avatar").className = `avatar avatar-${thread.toLowerCase()}`;
  document.querySelectorAll("[data-thread]").forEach(button => button.classList.toggle("active", button.dataset.thread === thread));
  document.querySelector("#chat-thread").innerHTML = state.messages[thread].map(message => `<div class="bubble ${message.from === "me" ? "me" : ""}">${escapeHTML(message.text)}<time>${escapeHTML(message.time)}</time></div>`).join("");
  const blocked = state.blockedThreads.includes(thread);
  const input = document.querySelector("#message-input");
  input.disabled = blocked;
  input.placeholder = blocked ? "Conversation blocked" : "Write a message…";
  document.querySelector("#message-form button").disabled = blocked;
}

function renderNotifications() {
  document.querySelector("#notification-list").innerHTML = state.notifications.map(item => `
    <article class="notification-card ${item.unread ? "unread" : ""}"><span><i data-lucide="${item.type === "alert" ? "bell-ring" : item.type === "expense" ? "receipt-text" : "users-round"}"></i></span><span><strong>${escapeHTML(item.text)}</strong><small>${escapeHTML(item.time)}</small></span></article>`).join("");
  const hasUnread = state.notifications.some(item => item.unread);
  document.querySelector("#notification-dot").hidden = !hasUnread;
  icons();
}

function addNotification(type, text) {
  state.notifications.unshift({ id: Date.now(), type, text, time: "Just now", unread: true });
  renderNotifications();
  saveState();
}

function renderAll() {
  updateAuth();
  renderTasks();
  renderActivities();
  renderHistory();
  renderRoster();
  renderRules();
  renderProposal();
  renderExpenses();
  renderMessages();
  renderNotifications();
  setHouseholdTab(state.householdTab);
  icons();
}

function applyCaptureMode(id) {
  document.body.classList.add("capture-mode");
  closeModal("login-modal");

  const showPage = (page, tab) => {
    goPage(page, tab);
    window.scrollTo(0, 0);
  };

  if (id === "US-01") showPage("household", "roster");
  if (id === "US-02") showPage("household", "rules");
  if (id === "US-03") {
    document.querySelector('[data-proposal-member="Mia"]').value = "Kitchen + recycling";
    state.proposal.status = "pending";
    state.proposal.approvals = { Emily: true, Daniel: false, Mia: false };
    renderProposal();
    showPage("household", "proposal");
  }
  if (id === "US-04") {
    showPage("expenses");
    openModal("expense-modal");
  }
  if (id === "US-05") showPage("expenses");
  if (id === "US-06") {
    showPage("expenses");
    document.querySelector("#expense-description").value = "July electricity bill";
    document.querySelector("#expense-amount").value = "125.60";
    document.querySelector("#expense-category").value = "Electricity";
    updateExpensePreview();
    openModal("expense-modal");
  }
  if (id === "US-07") showPage("community", "noticeboard");
  if (id === "US-08") showPage("community", "issues");
  if (id === "US-09") {
    state.loggedIn = true;
    state.verified = true;
    state.email = "z5555555@ad.unsw.edu.au";
    updateAuth();
    renderMessages();
    showPage("messages");
  }
  if (id === "US-10") {
    showPage("household", "rules");
    const noiseButton = document.querySelector('[data-rule-toggle="noise"]');
    noiseButton.closest(".rule-card").classList.add("open");
    noiseButton.setAttribute("aria-expanded", "true");
  }
  if (id === "US-11") showPage("discover", "housemates");
  if (id === "US-12") {
    showPage("discover", "housemates");
    document.querySelector('[data-match-filter="tidy"]').checked = true;
    document.querySelector('[data-match-filter="quiet"]').checked = true;
    document.querySelectorAll("[data-match-tags]").forEach(card => {
      const tags = card.dataset.matchTags.split(" ");
      card.hidden = !(tags.includes("verified") && tags.includes("tidy") && tags.includes("quiet"));
    });
    document.querySelector("#match-filter-feedback").textContent = "Showing 1 compatible verified housemate.";
  }
  if (id === "US-13") {
    showPage("discover", "properties");
    document.querySelector("#property-budget").value = "350";
    document.querySelectorAll("[data-property-price]").forEach(card => card.hidden = Number(card.dataset.propertyPrice) > 350);
    document.querySelector("#property-result-count").textContent = "1 trusted home";
  }
  if (id === "US-14") {
    showPage("expenses");
    document.querySelector("#notification-drawer").classList.add("open");
    document.querySelector("#notification-drawer").setAttribute("aria-hidden", "false");
    document.querySelector("#drawer-scrim").classList.add("open");
  }
  if (id === "US-15") showPage("discover", "reviews");
  if (id === "US-16") {
    showPage("manage", "rent");
    const reminder = document.querySelector('[data-rent-reminder="Daniel"]');
    reminder.innerHTML = '<i data-lucide="check"></i>Sent';
    reminder.disabled = true;
  }
  if (id === "US-17") showPage("manage", "listings");
  if (id === "US-18") showPage("manage", "announcements");
  icons();
}

document.addEventListener("DOMContentLoaded", () => {
  const captureId = new URLSearchParams(location.search).get("capture");
  renderAll();

  const hashParts = location.hash.replace("#", "").split("/");
  goPage(hashParts[0] || state.page || "home", hashParts[1]);
  if (!state.loggedIn && !captureId) openModal("login-modal");

  document.querySelectorAll("[data-page]").forEach(button => button.addEventListener("click", () => goPage(button.dataset.page, button.dataset.tab)));
  document.querySelectorAll("[data-household-tab]").forEach(button => button.addEventListener("click", () => setHouseholdTab(button.dataset.householdTab)));
  document.querySelectorAll("[data-prototype-tab]").forEach(button => button.addEventListener("click", () => goPage(button.dataset.prototypeTab, button.dataset.prototypeTarget)));
  document.querySelectorAll("[data-open]").forEach(button => button.addEventListener("click", () => openModal(button.dataset.open)));
  document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => closeModal(button.dataset.close)));

  document.querySelectorAll(".modal-backdrop").forEach(backdrop => backdrop.addEventListener("mousedown", event => {
    if (event.target === backdrop && backdrop.id !== "login-modal") closeModal(backdrop.id);
  }));

  document.querySelector("#property-search-form").addEventListener("submit", event => {
    event.preventDefault();
    const budget = Number(document.querySelector("#property-budget").value);
    const cards = [...document.querySelectorAll("[data-property-price]")];
    let visible = 0;
    cards.forEach(card => {
      const match = Number(card.dataset.propertyPrice) <= budget;
      card.hidden = !match;
      if (match) visible += 1;
    });
    document.querySelector("#property-result-count").textContent = `${visible} trusted home${visible === 1 ? "" : "s"}`;
    showToast(`${visible} verified listings match your budget.`);
  });
  document.querySelectorAll(".save-button").forEach(button => button.addEventListener("click", () => {
    button.classList.toggle("active");
    showToast(button.classList.contains("active") ? "Property saved." : "Property removed from saved homes.");
  }));
  document.querySelectorAll("[data-match-filter]").forEach(input => input.addEventListener("change", () => {
    const selected = [...document.querySelectorAll("[data-match-filter]:checked")].map(item => item.dataset.matchFilter);
    const cards = [...document.querySelectorAll("[data-match-tags]")];
    let visible = 0;
    cards.forEach(card => {
      const tags = card.dataset.matchTags.split(" ");
      const match = selected.every(tag => tags.includes(tag));
      card.hidden = !match;
      if (match) visible += 1;
    });
    document.querySelector("#match-filter-feedback").textContent = `Showing ${visible} compatible verified housemate${visible === 1 ? "" : "s"}.`;
  }));

  document.querySelector("#notice-form").addEventListener("submit", event => {
    event.preventDefault();
    const title = document.querySelector("#notice-title").value.trim();
    const message = document.querySelector("#notice-message").value.trim();
    const category = document.querySelector("#notice-category").value;
    if (!title || !message) return showToast("Add a title and message before posting.", "error");
    const iconsByCategory = { Suggestion: "lightbulb", "House update": "house", Event: "calendar-days", Reminder: "bell" };
    document.querySelector("#noticeboard-list").insertAdjacentHTML("afterbegin", `
      <article class="notice-card">
        <header><span class="notice-type suggestion"><i data-lucide="${iconsByCategory[category] || "message-square"}"></i>${escapeHTML(category)}</span><time>Just now</time></header>
        <h3>${escapeHTML(title)}</h3><p>${escapeHTML(message)}</p>
        <footer><span class="member-avatar alex">AC</span><strong>Alex</strong><span>0 comments</span></footer>
      </article>`);
    icons();
    showToast("Update posted to the household noticeboard.");
  });
  document.querySelector("#issue-form").addEventListener("submit", event => {
    event.preventDefault();
    const category = document.querySelector("#issue-category").value;
    const description = document.querySelector("#issue-description").value.trim();
    if (!description) return showToast("Describe the issue before submitting.", "error");
    document.querySelector("#issue-list").insertAdjacentHTML("afterbegin", `
      <article class="issue-card"><span class="metric-icon coral"><i data-lucide="eye-off"></i></span><div>
        <header><strong>${escapeHTML(category)}</strong><span class="status-badge pending">New</span></header>
        <p>${escapeHTML(description)}</p><footer><span>Submitted anonymously</span><time>Just now</time></footer>
      </div></article>`);
    icons();
    addNotification("alert", `A new anonymous ${category.toLowerCase()} issue was shared with the household.`);
    showToast("Issue submitted anonymously. Your identity remains hidden.");
  });

  document.querySelectorAll("[data-rent-reminder]").forEach(button => button.addEventListener("click", () => {
    const tenant = button.dataset.rentReminder;
    button.innerHTML = '<i data-lucide="check"></i>Sent';
    button.disabled = true;
    icons();
    addNotification("expense", `Automated rent reminder sent in-app to ${tenant}.`);
    showToast(`Rent reminder sent privately to ${tenant}.`);
  }));
  document.querySelector("#send-all-rent-reminders").addEventListener("click", event => {
    event.currentTarget.innerHTML = '<i data-lucide="check-check"></i>Reminders sent';
    event.currentTarget.disabled = true;
    icons();
    addNotification("expense", "Automated rent reminders sent to all tenants with outstanding payments.");
    showToast("Outstanding tenants were reminded in-app.");
  });
  const syncListingPreview = () => {
    document.querySelector("#listing-preview-title").textContent = document.querySelector("#listing-title").value || "Untitled student room";
    document.querySelector("#listing-preview-price").innerHTML = `${money(Number(document.querySelector("#listing-price").value) || 0)}<small>/week</small>`;
    document.querySelector("#listing-preview-address").textContent = document.querySelector("#listing-address").value || "Address pending";
  };
  ["#listing-title", "#listing-price", "#listing-address"].forEach(selector => document.querySelector(selector).addEventListener("input", syncListingPreview));
  document.querySelector("#listing-form").addEventListener("submit", event => {
    event.preventDefault();
    addNotification("proposal", `${document.querySelector("#listing-title").value} was published to verified student search results.`);
    showToast("Listing published and ready for student enquiries.");
  });
  document.querySelector("#announcement-form").addEventListener("submit", event => {
    event.preventDefault();
    const type = document.querySelector("#announcement-type").value;
    const title = document.querySelector("#announcement-title").value.trim();
    const message = document.querySelector("#announcement-message").value.trim();
    if (!title || !message) return showToast("Add an announcement title and message.", "error");
    document.querySelector("#announcement-list").insertAdjacentHTML("afterbegin", `
      <article class="announcement-card"><span class="metric-icon peach"><i data-lucide="megaphone"></i></span><div>
        <header><strong>${escapeHTML(title)}</strong><time>Just now</time></header><p>${escapeHTML(message)}</p>
        <footer><span><i data-lucide="send"></i>${escapeHTML(type)} · sent to 4 tenants</span><button class="text-button" type="button">View details</button></footer>
      </div></article>`);
    icons();
    addNotification("proposal", `${title} was delivered to all tenants at 8 Waterloo Street.`);
    showToast("Announcement delivered to all 4 tenants.");
  });

  document.querySelector("#login-form").addEventListener("submit", event => {
    event.preventDefault();
    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value;
    const emailOkay = /^[^\s@]+@(?:ad\.)?unsw\.edu\.au$/i.test(email);
    document.querySelector("#email-error").textContent = emailOkay ? "" : "Use a valid UNSW student email.";
    document.querySelector("#login-error").textContent = password.length >= 8 ? "" : "Password must contain at least 8 characters.";
    if (!emailOkay || password.length < 8) return;
    state.loggedIn = true;
    state.email = email;
    saveState();
    closeModal("login-modal");
    updateAuth();
    showToast("Signed in. Complete the phone check to unlock messaging.");
  });

  document.querySelector("#safety-login-button").addEventListener("click", () => openModal("login-modal"));
  document.querySelector("#message-gate-action").addEventListener("click", () => {
    if (!state.loggedIn) openModal("login-modal");
    else goPage("safety");
  });
  document.querySelector("#send-code").addEventListener("click", () => {
    if (!state.loggedIn) return openModal("login-modal");
    document.querySelector("#verification-feedback").className = "form-feedback success";
    document.querySelector("#verification-feedback").textContent = "Demo code sent in-app. Enter 2468 below.";
    document.querySelector("#phone-code").focus();
  });
  document.querySelector("#verify-code").addEventListener("click", () => {
    const feedback = document.querySelector("#verification-feedback");
    if (!state.loggedIn) return openModal("login-modal");
    if (document.querySelector("#phone-code").value !== "2468") {
      feedback.className = "form-feedback error";
      feedback.textContent = "Incorrect code. Use 2468 for the demo.";
      return;
    }
    state.verified = true;
    saveState();
    feedback.className = "form-feedback success";
    feedback.textContent = "Verified. Messaging is unlocked.";
    addNotification("proposal", "Your student account is verified. Secure messaging is unlocked.");
    updateAuth();
    showToast("Verified. Messaging unlocked.");
  });

  document.querySelector("#task-list").addEventListener("click", event => {
    const deleteButton = event.target.closest("[data-delete-task]");
    if (deleteButton) {
      const task = state.tasks.find(item => String(item.id) === deleteButton.dataset.deleteTask);
      if (!task) return;
      pendingTaskDeletion = task.id;
      document.querySelector("#delete-task-name").textContent = task.title;
      openModal("delete-task-modal");
      return;
    }
    const button = event.target.closest("[data-complete-task]");
    if (!button) return;
    const task = state.tasks.find(item => String(item.id) === button.dataset.completeTask);
    if (!task || task.status === "complete") return;
    task.status = "complete";
    state.history.unshift({ task: task.title, person: `${task.person} ${task.person === "Alex" ? "Chen" : task.person === "Daniel" ? "Kim" : "Lopez"}`, date: "14 Jul, 11:26 AM", status: task.due.includes("Overdue") ? "Completed after reminder" : "On time" });
    state.activities.unshift({ icon: "circle-check-big", text: `${task.person} completed ${task.title.toLowerCase()}`, time: "Just now" });
    addNotification("proposal", `${task.person} completed “${task.title}”.`);
    saveState(); renderTasks(); renderActivities(); renderHistory();
    showToast("Task completed and timestamped in household history.");
  });
  document.querySelector("#confirm-delete-task").addEventListener("click", () => {
    const taskIndex = state.tasks.findIndex(item => String(item.id) === String(pendingTaskDeletion));
    if (taskIndex < 0) {
      closeModal("delete-task-modal");
      return;
    }
    const [task] = state.tasks.splice(taskIndex, 1);
    state.activities.unshift({ icon: "trash-2", text: `${task.title} was removed from the task list`, time: "Just now" });
    closeModal("delete-task-modal");
    pendingTaskDeletion = null;
    saveState();
    renderTasks();
    renderActivities();
    showToast("Task deleted.");
  });
  document.querySelector("#send-manual-nudge").addEventListener("click", () => {
    state.activities.unshift({ icon: "send", text: "Admin nudge sent privately to Daniel", time: "Just now" });
    addNotification("alert", "Manual in-app nudge sent to Daniel. No personal contact details were used.");
    renderActivities();
    showToast("Private in-app nudge sent to Daniel.");
  });

  document.querySelector("#roster-form").addEventListener("submit", event => {
    event.preventDefault();
    let valid = true;
    event.currentTarget.querySelectorAll(".roster-form-grid label").forEach(label => {
      const select = label.querySelector("select");
      const error = label.querySelector(".field-error");
      error.textContent = select.value ? "" : "Assign at least one task before activation.";
      if (!select.value) valid = false;
    });
    if (!valid) return showToast("Every housemate needs at least one assigned task.", "error");
    closeModal("roster-modal");
    state.activities.unshift({ icon: "calendar-check", text: "New weekly roster activated for 4 housemates", time: "Just now" });
    addNotification("proposal", "New roster active. Assignments sent.");
    renderActivities(); setHouseholdTab("roster"); goPage("household", "roster");
    showToast("Roster active. Assignments sent.");
  });

  document.querySelector("#language-select").addEventListener("change", event => {
    state.language = event.target.value;
    saveState(); renderRules();
    showToast(state.language === "zh" ? "家庭规则已切换为简体中文。" : "House rules language updated.");
  });
  document.querySelector("#rule-list").addEventListener("click", event => {
    const button = event.target.closest("[data-rule-toggle]");
    if (!button) return;
    const card = button.closest(".rule-card");
    card.classList.toggle("open");
    button.setAttribute("aria-expanded", card.classList.contains("open"));
  });
  document.querySelector("#rule-form").addEventListener("submit", event => {
    event.preventDefault();
    const fields = [document.querySelector("#rule-title"), document.querySelector("#rule-category"), document.querySelector("#rule-description")];
    let valid = true;
    fields.forEach(field => {
      const error = field.parentElement.querySelector(".field-error");
      error.textContent = field.value.trim() ? "" : "This field is required.";
      if (!field.value.trim()) valid = false;
    });
    if (!valid) return showToast("Add a title, category and explanation before saving.", "error");
    state.rules.push({ id: `custom-${Date.now()}`, icon: "scroll-text", category: fields[1].value, title: fields[0].value, summary: "New household expectation", detail: fields[2].value, author: "Added by Alex · just now" });
    saveState(); renderRules(); closeModal("rule-modal"); event.currentTarget.reset();
    showToast("House rule added.");
  });

  document.querySelector("#submit-proposal").addEventListener("click", () => {
    const selects = [...document.querySelectorAll("[data-proposal-member]")];
    let valid = true;
    selects.forEach(select => {
      const error = select.parentElement.querySelector(".field-error");
      if (error) error.textContent = select.value ? "" : "Assign tasks before submission.";
      if (!select.value) valid = false;
    });
    if (!valid) return showToast("Assign tasks to every housemate before submission.", "error");
    state.proposal.status = "pending";
    state.proposal.approvals = { Emily: false, Daniel: false, Mia: false };
    state.proposal.note = document.querySelector("#proposal-note").value;
    addNotification("proposal", "Spring chore rotation was sent to Emily, Daniel and Mia for review.");
    saveState(); renderProposal();
    showToast("Proposal sent for review.");
  });
  document.querySelector("#approval-list").addEventListener("click", event => {
    const approve = event.target.closest("[data-approve]");
    const change = event.target.closest("[data-request-change]");
    if (approve) {
      state.proposal.approvals[approve.dataset.approve] = true;
      const complete = Object.values(state.proposal.approvals).every(Boolean);
      if (complete) {
        state.proposal.status = "active";
        addNotification("proposal", "All housemates approved. The Spring chore rotation is now active.");
        showToast("Approved. Rotation is active.");
      } else showToast(`${approve.dataset.approve} approved the proposal.`);
      saveState(); renderProposal();
    }
    if (change) {
      state.proposal.status = "changes";
      state.proposal.approvals = { Emily: false, Daniel: false, Mia: false };
      addNotification("proposal", `${change.dataset.requestChange} requested a schedule change. Activation is paused.`);
      saveState(); renderProposal();
      showToast("Change requested. Activation remains paused.", "error");
    }
  });
  document.querySelector("#revise-proposal").addEventListener("click", () => {
    state.proposal.status = "pending";
    state.proposal.approvals = { Emily: false, Daniel: false, Mia: false };
    addNotification("proposal", "Revised Spring chore rotation sent to all housemates.");
    saveState(); renderProposal();
    showToast("Revised proposal sent.");
  });

  document.querySelector("#expense-amount").addEventListener("input", updateExpensePreview);
  document.querySelectorAll('.member-checks input').forEach(input => input.addEventListener("change", updateExpensePreview));
  document.querySelector("#expense-form").addEventListener("submit", event => {
    event.preventDefault();
    const description = document.querySelector("#expense-description");
    const amountInput = document.querySelector("#expense-amount");
    const amount = Number(amountInput.value);
    const members = [...document.querySelectorAll('.member-checks input:checked')].map(input => input.value);
    description.parentElement.querySelector(".field-error").textContent = description.value.trim() ? "" : "Add a description.";
    amountInput.parentElement.querySelector(".field-error").textContent = amount > 0 ? "" : "Enter an amount greater than $0.";
    document.querySelector("#member-error").textContent = members.length >= 2 ? "" : "Select at least two household members.";
    if (!description.value.trim() || amount <= 0 || members.length < 2) return showToast("Complete the required expense details.", "error");
    const payer = document.querySelector("#expense-payer").value;
    state.expenses.unshift({ id: Date.now(), description: description.value, category: document.querySelector("#expense-category").value, amount, payer, participants: members.length, date: "14 July", status: "open", icon: "receipt-text" });
    const share = amount / members.length;
    state.netBalance = Math.round((state.netBalance + (payer === "Alex" ? share * (members.length - 1) : -share)) * 100) / 100;
    addNotification("expense", `${description.value} added. ${members.length} shares calculated at ${money(share)} each.`);
    saveState(); renderExpenses(); closeModal("expense-modal");
    showToast(`Expense saved. Each share is ${money(share)}.`);
  });
  document.querySelector("#expense-list").addEventListener("click", event => {
    const settle = event.target.closest("[data-settle-expense]");
    const dispute = event.target.closest("[data-dispute-expense]");
    const deleteButton = event.target.closest("[data-delete-expense]");
    if (deleteButton) {
      const expense = state.expenses.find(item => String(item.id) === deleteButton.dataset.deleteExpense);
      if (!expense) return;
      pendingExpenseDeletion = expense.id;
      document.querySelector("#delete-expense-name").textContent = `${expense.description} (${money(expense.amount)})`;
      openModal("delete-expense-modal");
      return;
    }
    if (settle) {
      const expense = state.expenses.find(item => item.id === Number(settle.dataset.settleExpense));
      if (!expense || expense.status === "settled") return showToast("This balance is already settled.", "error");
      expense.status = "settled";
      const share = expense.amount / expense.participants;
      state.netBalance = Math.round((state.netBalance + (expense.payer === "Alex" ? -share * (expense.participants - 1) : share)) * 100) / 100;
      addNotification("expense", `${expense.description} was marked settled. Household balances updated.`);
      saveState(); renderExpenses(); showToast("Balance settled.");
    }
    if (dispute) {
      const expense = state.expenses.find(item => item.id === Number(dispute.dataset.disputeExpense));
      if (!expense) return;
      expense.status = "disputed";
      addNotification("expense", `${expense.description} was flagged as disputed. All involved housemates were notified.`);
      saveState(); renderExpenses(); showToast("Expense marked under review.", "error");
    }
  });
  document.querySelector("#confirm-delete-expense").addEventListener("click", () => {
    const expenseIndex = state.expenses.findIndex(item => String(item.id) === String(pendingExpenseDeletion));
    if (expenseIndex < 0) {
      closeModal("delete-expense-modal");
      return;
    }
    const [expense] = state.expenses.splice(expenseIndex, 1);
    if (expense.status !== "settled") {
      const share = expense.amount / expense.participants;
      const balanceImpact = expense.payer === "Alex" ? share * (expense.participants - 1) : -share;
      state.netBalance = Math.round((state.netBalance - balanceImpact) * 100) / 100;
    }
    state.notifications.unshift({ id: Date.now(), type: "expense", text: `${expense.description} was deleted. Household balances were updated.`, time: "Just now", unread: true });
    closeModal("delete-expense-modal");
    pendingExpenseDeletion = null;
    saveState();
    renderExpenses();
    renderNotifications();
    showToast("Expense deleted and balance updated.");
  });
  document.querySelector("#expense-filter").addEventListener("change", renderExpenses);

  document.querySelectorAll("[data-thread]").forEach(button => button.addEventListener("click", () => {
    state.activeThread = button.dataset.thread; saveState(); renderMessages();
  }));
  document.querySelector("#message-form").addEventListener("submit", event => {
    event.preventDefault();
    const input = document.querySelector("#message-input");
    const text = input.value.trim();
    const warning = document.querySelector("#message-warning");
    if (!text) return;
    const personalDetails = /(?:\b(?:\+?61|0)4\d{8}\b)|(?:[\w.+-]+@[\w.-]+\.[a-z]{2,})/i.test(text.replace(/\s/g, ""));
    if (personalDetails) {
      warning.hidden = false;
      return showToast("Personal contact details were not sent.", "error");
    }
    warning.hidden = true;
    state.messages[state.activeThread].push({ from: "me", text, time: "Just now" });
    input.value = ""; saveState(); renderMessages();
    document.querySelector("#chat-thread").scrollTop = document.querySelector("#chat-thread").scrollHeight;
  });
  document.querySelector("#share-contact").addEventListener("click", () => {
    addNotification("proposal", `Contact sharing request sent to ${state.activeThread}. Details stay hidden until both users agree.`);
    showToast("Mutual contact sharing request sent.");
  });
  document.querySelector("#chat-safety").addEventListener("click", () => openModal("safety-modal"));
  document.querySelector("#report-user").addEventListener("click", () => {
    closeModal("safety-modal");
    addNotification("alert", `Conversation with ${state.activeThread} was privately flagged for safety review.`);
    showToast("Report submitted privately for review.");
  });
  document.querySelector("#block-user").addEventListener("click", () => {
    if (!state.blockedThreads.includes(state.activeThread)) state.blockedThreads.push(state.activeThread);
    closeModal("safety-modal"); saveState(); renderMessages();
    showToast("User blocked. This conversation is now closed.", "error");
  });

  document.querySelector("#new-password").addEventListener("input", event => {
    const value = event.target.value;
    const strength = Math.min(100, (value.length / 12) * 60 + (/[A-Z]/.test(value) ? 15 : 0) + (/\d/.test(value) ? 15 : 0) + (/[^A-Za-z0-9]/.test(value) ? 10 : 0));
    const meter = document.querySelector("#password-meter");
    meter.style.width = `${strength}%`;
    meter.style.background = strength >= 75 ? "var(--sage)" : strength >= 45 ? "var(--amber)" : "var(--coral)";
  });
  document.querySelector("#change-password").addEventListener("click", () => {
    const value = document.querySelector("#new-password").value;
    const feedback = document.querySelector("#password-feedback");
    if (!state.loggedIn) return openModal("login-modal");
    if (value.length < 8) { feedback.className = "form-feedback error"; feedback.textContent = "Use at least 8 characters."; return; }
    feedback.className = "form-feedback success"; feedback.textContent = "Password updated successfully.";
    document.querySelector("#new-password").value = "";
    document.querySelector("#password-meter").style.width = "0";
  });

  const drawer = document.querySelector("#notification-drawer");
  const scrim = document.querySelector("#drawer-scrim");
  const closeDrawer = () => { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); scrim.classList.remove("open"); };
  document.querySelector("#notification-button").addEventListener("click", () => { drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); scrim.classList.add("open"); });
  document.querySelector("#view-overdue-notification").addEventListener("click", () => { drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); scrim.classList.add("open"); });
  document.querySelector("#close-notifications").addEventListener("click", closeDrawer);
  scrim.addEventListener("click", closeDrawer);
  document.querySelector("#mark-read").addEventListener("click", () => { state.notifications.forEach(item => item.unread = false); saveState(); renderNotifications(); showToast("All notifications marked as read."); });
  document.querySelector("#reset-demo").addEventListener("click", () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Reset still works in memory when file-origin storage is unavailable.
    }
    state = structuredClone(defaults);
    renderAll(); goPage("home"); openModal("login-modal");
    showToast("Demo reset.");
  });

  if (captureId) applyCaptureMode(captureId.toUpperCase());
  icons();
});
