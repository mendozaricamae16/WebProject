const TODAY = new Date();

function fmt(d) {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function fmtInput(d) {
  return new Date(d).toISOString().slice(0, 10);
}

function daysDiff(from, to) {
  return Math.round((new Date(to) - new Date(from)) / 86400000);
}

function setText(id, val) {
  var el = document.getElementById(id);
  if (el) el.textContent = val;
}


/* ── Data ─────────────────────────────────────────────────── */

var books = [
  { id:1,  isbn:'978-0-06-112008-4', title:'To Kill a Mockingbird',       author:'Harper Lee',          category:'Fiction',      shelf:'A-01', copies:5, available:3, status:'Available' },
  { id:2,  isbn:'978-0-14-028329-7', title:'1984',                        author:'George Orwell',       category:'Fiction',      shelf:'A-02', copies:4, available:2, status:'Available' },
  { id:3,  isbn:'978-0-7432-7356-5', title:'The Great Gatsby',            author:'F. Scott Fitzgerald', category:'Fiction',      shelf:'A-03', copies:3, available:0, status:'Issued'    },
  { id:4,  isbn:'978-0-13-110362-7', title:'The C Programming Language',  author:'Brian W. Kernighan',  category:'Technology',   shelf:'B-01', copies:6, available:4, status:'Available' },
  { id:5,  isbn:'978-0-201-63361-0', title:'The Pragmatic Programmer',    author:'Andrew Hunt',         category:'Technology',   shelf:'B-02', copies:3, available:2, status:'Available' },
  { id:6,  isbn:'978-0-13-468599-1', title:'Clean Code',                  author:'Robert C. Martin',    category:'Technology',   shelf:'B-03', copies:4, available:3, status:'Available' },
  { id:7,  isbn:'978-0-7432-7357-2', title:'A Brief History of Time',     author:'Stephen Hawking',     category:'Science',      shelf:'C-01', copies:3, available:1, status:'Available' },
  { id:8,  isbn:'978-0-316-76948-0', title:'The Catcher in the Rye',      author:'J.D. Salinger',       category:'Fiction',      shelf:'A-04', copies:2, available:1, status:'Available' },
  { id:9,  isbn:'978-0-06-093546-9', title:'Brave New World',             author:'Aldous Huxley',       category:'Fiction',      shelf:'A-05', copies:2, available:2, status:'Available' },
  { id:10, isbn:'978-0-7432-7000-7', title:'Thinking, Fast and Slow',     author:'Daniel Kahneman',     category:'Self-Help',    shelf:'D-01', copies:3, available:1, status:'Available' },
  { id:11, isbn:'978-0-06-112241-5', title:'Sapiens',                     author:'Yuval Noah Harari',   category:'History',      shelf:'E-01', copies:4, available:2, status:'Available' },
  { id:12, isbn:'978-0-14-044913-6', title:'The Republic',                author:'Plato',               category:'Philosophy',   shelf:'F-01', copies:2, available:1, status:'Available' },
  { id:13, isbn:'978-0-14-018776-1', title:'The Odyssey',                 author:'Homer',               category:'Literature',   shelf:'G-01', copies:3, available:2, status:'Available' },
  { id:14, isbn:'978-0-7432-7001-4', title:'Calculus Vol.1',              author:'Tom Apostol',         category:'Mathematics',  shelf:'H-01', copies:4, available:3, status:'Available' },
  { id:15, isbn:'978-0-06-112009-1', title:'The Art of War',              author:'Sun Tzu',             category:'History',      shelf:'E-02', copies:3, available:2, status:'Available' },
  { id:16, isbn:'978-1-982105-00-4', title:'Educated',                    author:'Tara Westover',       category:'Self-Help',    shelf:'D-02', copies:2, available:0, status:'Issued'    },
  { id:17, isbn:'978-0-7432-7002-1', title:'Brief Answers to Big Questions', author:'Stephen Hawking',  category:'Science',      shelf:'C-02', copies:3, available:2, status:'Available' },
  { id:18, isbn:'978-0-14-028960-2', title:'Animal Farm',                 author:'George Orwell',       category:'Fiction',      shelf:'A-06', copies:4, available:1, status:'Available', isLost:true    },
  { id:19, isbn:'978-0-316-76948-9', title:'Fahrenheit 451',              author:'Ray Bradbury',        category:'Fiction',      shelf:'A-07', copies:2, available:1, status:'Available', isDamaged:true },
  { id:20, isbn:'978-0-7432-7003-8', title:'Introduction to Algorithms',  author:'Thomas H. Cormen',    category:'Technology',   shelf:'B-04', copies:5, available:3, status:'Available' },
];

var members = [
  { id:'LIB-2025-001', name:'Alice Johnson', email:'alice.j@email.com', phone:'555-0101', type:'Student', joinDate:'2025-01-15', sid:'STU-2025-001', grade:'Grade 10', section:'Section A', active:1, overdue:1, totalIssued:2 },
  { id:'LIB-2025-002', name:'Bob Martinez',  email:'bob.m@email.com',   phone:'555-0102', type:'Faculty', joinDate:'2025-01-20', active:1, overdue:1, totalIssued:2 },
  { id:'LIB-2025-004', name:'David Lee',     email:'david.l@email.com', phone:'555-0104', type:'Student', joinDate:'2025-02-10', sid:'STU-2025-004', grade:'Grade 11', section:'Section B', active:1, overdue:1, totalIssued:2 },
  { id:'LIB-2025-005', name:'Emma Davis',    email:'emma.d@email.com',  phone:'555-0105', type:'Student', joinDate:'2025-03-05', sid:'STU-2025-005', grade:'Grade 9',  section:'Section C', active:1, overdue:0, totalIssued:1 },
  { id:'LIB-2025-006', name:'Frank Wilson',  email:'frank.w@email.com', phone:'555-0106', type:'Faculty', joinDate:'2025-03-15', active:2, overdue:2, totalIssued:2 },
  { id:'LIB-2025-007', name:'Grace Kim',     email:'grace.k@email.com', phone:'555-0107', type:'Student', joinDate:'2025-04-01', sid:'STU-2025-007', grade:'Grade 12', section:'Section A', active:1, overdue:0, totalIssued:1 },
  { id:'LIB-2025-008', name:'Henry Brown',   email:'henry.b@email.com', phone:'555-0108', type:'Faculty', joinDate:'2025-05-10', active:0, overdue:0, totalIssued:1 },
];

var issues = [
  { id:'IS-001', bookId:1,  bookTitle:'To Kill a Mockingbird',     author:'Harper Lee',          memberId:'LIB-2025-001', memberName:'Alice Johnson', issueDate:'2026-02-14', dueDate:'2026-02-28', status:'Overdue',  renewals:0 },
  { id:'IS-002', bookId:7,  bookTitle:'A Brief History of Time',   author:'Stephen Hawking',     memberId:'LIB-2025-005', memberName:'Emma Davis',    issueDate:'2026-02-20', dueDate:'2026-03-06', status:'Active',   renewals:0 },
  { id:'IS-003', bookId:10, bookTitle:'Thinking, Fast and Slow',   author:'Daniel Kahneman',     memberId:'LIB-2025-007', memberName:'Grace Kim',     issueDate:'2026-02-22', dueDate:'2026-03-08', status:'Active',   renewals:0 },
  { id:'IS-004', bookId:3,  bookTitle:'The Great Gatsby',          author:'F. Scott Fitzgerald', memberId:'LIB-2025-002', memberName:'Bob Martinez',  issueDate:'2026-01-20', dueDate:'2026-02-03', status:'Overdue',  renewals:0 },
  { id:'IS-005', bookId:11, bookTitle:'Sapiens',                   author:'Yuval Noah Harari',   memberId:'LIB-2025-004', memberName:'David Lee',     issueDate:'2026-01-25', dueDate:'2026-02-08', status:'Overdue',  renewals:0 },
  { id:'IS-006', bookId:6,  bookTitle:'Clean Code',                author:'Robert C. Martin',    memberId:'LIB-2025-006', memberName:'Frank Wilson',  issueDate:'2026-01-15', dueDate:'2026-01-29', status:'Overdue',  renewals:0 },
  { id:'IS-007', bookId:5,  bookTitle:'The Pragmatic Programmer',  author:'Andrew Hunt',         memberId:'LIB-2025-006', memberName:'Frank Wilson',  issueDate:'2026-01-10', dueDate:'2026-01-24', status:'Overdue',  renewals:0 },
  { id:'IS-008', bookId:16, bookTitle:'Educated',                  author:'Tara Westover',       memberId:'LIB-2025-002', memberName:'Bob Martinez',  issueDate:'2026-02-15', dueDate:'2026-03-01', status:'Active',   renewals:0 },
  { id:'IS-009', bookId:8,  bookTitle:'The Catcher in the Rye',   author:'J.D. Salinger',       memberId:'LIB-2025-001', memberName:'Alice Johnson', issueDate:'2026-01-01', dueDate:'2026-01-15', status:'Returned', renewals:0 },
  { id:'IS-010', bookId:4,  bookTitle:'The C Programming Language',author:'Brian W. Kernighan',  memberId:'LIB-2025-002', memberName:'Bob Martinez',  issueDate:'2026-01-05', dueDate:'2026-01-19', status:'Returned', renewals:0 },
  { id:'IS-011', bookId:13, bookTitle:'The Odyssey',               author:'Homer',               memberId:'LIB-2025-004', memberName:'David Lee',     issueDate:'2026-01-15', dueDate:'2026-01-29', status:'Returned', renewals:0 },
  { id:'IS-012', bookId:15, bookTitle:'The Art of War',            author:'Sun Tzu',             memberId:'LIB-2025-005', memberName:'Emma Davis',    issueDate:'2026-01-20', dueDate:'2026-02-03', status:'Returned', renewals:0 },
];

var currentIssueTab  = 'active';
var currentReportTab = 'issued';
var catChart, statusChart, rptCatChart, rptMonthlyChart;


/* ── Navigation ───────────────────────────────────────────── */

function navigate(page, btn) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  document.querySelectorAll('.nav-item').forEach(function(n) {
    n.classList.remove('active');
  });
  document.getElementById('page-' + page).classList.add('active');
  if (btn) btn.classList.add('active');
  closeSidebar();
  if (page === 'books')   renderBooksTable();
  if (page === 'members') renderMembersTable();
  if (page === 'issues')  renderIssuesTable();
  if (page === 'reports') { renderReportTable(); initReportCharts(); }
}

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
}


/* ── Login / Auth ─────────────────────────────────────────── */

function togglePass() {
  var p = document.getElementById('login-pass');
  p.type = (p.type === 'password') ? 'text' : 'password';
}

function showForgot() {
  document.getElementById('login-view').style.display  = 'none';
  document.getElementById('forgot-view').style.display = 'block';
}

function showLogin() {
  document.getElementById('forgot-view').style.display   = 'none';
  document.getElementById('login-view').style.display    = 'block';
  document.getElementById('forgot-success').style.display = 'none';
}

function sendReset() {
  var email = document.getElementById('forgot-email').value.trim();
  if (!email) { showToast('Please enter your email address', 'error'); return; }
  document.getElementById('forgot-success').style.display = 'block';
  document.getElementById('forgot-email').value = '';
  showToast('Reset link sent!', 'success');
}

function doLogin() {
  var u = document.getElementById('login-user').value.trim();
  var p = document.getElementById('login-pass').value;
  if (u === 'admin' && p === 'admin123') {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    initDashboard();
  } else {
    showToast('Incorrect username or password.', 'error');
  }
}

function doLogout() {
  document.getElementById('app').style.display        = 'none';
  document.getElementById('login-page').style.display = 'flex';
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
}


/* ── Dashboard ────────────────────────────────────────────── */

function initDashboard() {
  var now = new Date();
  setText('dash-date',
    now.toLocaleDateString('en-US', {
      weekday: 'long',
      month:   'long',
      day:     'numeric',
      year:    'numeric'
    }) + ' \u2014 Overview of library operations'
  );
  updateStats();
  renderActiveIssuesList();
  initDashCharts();
}

function updateStats() {
  var totalCopies  = books.reduce(function(s, b) { return s + b.copies; }, 0);
  var overdueCount = issues.filter(function(i) { return i.status === 'Overdue'; }).length;
  var activeCount  = issues.filter(function(i) { return i.status === 'Active' || i.status === 'Renewed'; }).length;
  var returnedCount = issues.filter(function(i) { return i.status === 'Returned'; }).length;

  setText('stat-total-books', totalCopies);
  setText('stat-titles',      books.length + ' titles');
  setText('stat-issued',      issues.filter(function(i) { return i.status !== 'Returned'; }).length);
  setText('stat-overdue',     overdueCount);
  setText('stat-members',     members.length);
  setText('stat-students',    members.filter(function(m) { return m.type === 'Student'; }).length + ' students');
  setText('topbar-overdue',   overdueCount);
  setText('nav-overdue-badge', overdueCount);
  setText('mo-students',      members.filter(function(m) { return m.type === 'Student'; }).length);
  setText('mo-faculty',       members.filter(function(m) { return m.type === 'Faculty'; }).length);
  setText('ir-active-count',  activeCount);
  setText('ir-overdue-count', overdueCount);
  setText('ir-returned-count', returnedCount);
  setText('tab-active-count',  activeCount);
  setText('tab-overdue-count', overdueCount);
  setText('tab-returned-count', returnedCount);
  setText('rpt-tab-issued',   issues.filter(function(i) { return i.status !== 'Returned'; }).length);
  setText('rpt-tab-overdue',  overdueCount);
  setText('rpt-tab-damaged',  books.filter(function(b) { return b.isLost || b.isDamaged; }).length);
  setText('rpt-tab-history',  issues.length);
  setText('books-count-sub',  books.length + ' books in inventory');
  setText('members-count-sub', members.length + ' registered members');
}

function renderActiveIssuesList() {
  var list   = document.getElementById('active-issues-list');
  var active = issues.filter(function(i) { return i.status !== 'Returned'; }).slice(0, 5);
  list.innerHTML = active.map(function(i) {
    return '<div class="issue-item ' + (i.status === 'Overdue' ? 'overdue' : '') + '">' +
      '<div>' +
        '<div class="issue-book">'   + i.bookTitle + '</div>' +
        '<div class="issue-member">' + i.memberName + ' &bull; Due: ' + fmt(i.dueDate) + '</div>' +
      '</div>' +
      '<span class="badge ' + (i.status === 'Overdue' ? 'badge-overdue' : 'badge-active') + '">&#9679; ' + i.status + '</span>' +
    '</div>';
  }).join('');
}

function initDashCharts() {
  var cats = {};
  books.forEach(function(b) {
    cats[b.category] = (cats[b.category] || 0) + b.copies;
  });

  var avail   = books.reduce(function(s, b) { return s + b.available; }, 0);
  var issuedB = books.reduce(function(s, b) { return s + (b.copies - b.available); }, 0)
              - books.filter(function(b) { return b.isLost; }).length
              - books.filter(function(b) { return b.isDamaged; }).length;
  var lost = books.filter(function(b) { return b.isLost; }).length;
  var dmg  = books.filter(function(b) { return b.isDamaged; }).length;

  var catLabels = Object.keys(cats);
  var catValues = Object.values(cats);

  if (catChart) catChart.destroy();
  catChart = new Chart(document.getElementById('cat-chart'), {
    type: 'bar',
    data: {
      labels: catLabels,
      datasets: [{
        data: catValues,
        backgroundColor: catLabels.map(function() { return '#2ec4a0'; }),
        borderWidth: 0,
        borderRadius: 5
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f0f0f0' }, ticks: { color: '#9bb5ad' } },
        x: { grid: { display: false }, ticks: { color: '#9bb5ad' } }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });

  if (statusChart) statusChart.destroy();
  statusChart = new Chart(document.getElementById('status-chart'), {
    type: 'doughnut',
    data: {
      labels: ['Available', 'Issued', 'Lost', 'Damaged'],
      datasets: [{
        data: [avail, issuedB, lost, dmg],
        backgroundColor: ['#2ec4a0', '#3b82f6', '#9ca3af', '#f59e0b'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { usePointStyle: true, font: { size: 11 } }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}


/* ── Books Table ──────────────────────────────────────────── */

function renderBooksTable() {
  var q    = (document.getElementById('book-search')      || { value: '' }).value.toLowerCase();
  var cat  = (document.getElementById('book-cat-filter')  || { value: '' }).value;
  var stat = (document.getElementById('book-status-filter') || { value: '' }).value;

  var filtered = books.filter(function(b) {
    var mQ = !q   || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q);
    var mC = !cat  || b.category === cat;
    var mS = !stat || (stat === 'Lost' ? b.isLost : stat === 'Damaged' ? b.isDamaged : b.status === stat);
    return mQ && mC && mS;
  });

  setText('books-count-sub', books.length + ' books in inventory \u2022 ' + filtered.length + ' shown');

  document.getElementById('books-tbody').innerHTML = filtered.map(function(b) {
    var statusClass = b.isLost ? 'badge-lost' : b.isDamaged ? 'badge-damaged' : b.available > 0 ? 'badge-available' : 'badge-issued';
    var statusText  = b.isLost ? 'Lost'       : b.isDamaged ? 'Damaged'       : b.available > 0 ? 'Available'       : 'Issued';
    var issueBtn    = b.available > 0
      ? '<button class="btn btn-sm btn-outline" onclick="quickIssue(' + b.id + ')">Issue</button>'
      : '<button class="btn btn-sm btn-outline" disabled style="opacity:.4">Issue</button>';

    return '<tr>' +
      '<td class="td-isbn">' + b.isbn + '</td>' +
      '<td><div class="td-title">' + b.title + '</div><div class="td-sub">' + b.author + '</div></td>' +
      '<td>' + b.category + '</td>' +
      '<td>' + b.shelf    + '</td>' +
      '<td>' + b.copies   + '</td>' +
      '<td class="' + (b.available === 0 ? 'zero-count' : 'available-count') + '">' + b.available + '</td>' +
      '<td><span class="badge ' + statusClass + '">&#9679; ' + statusText + '</span></td>' +
      '<td><div class="action-btns">' +
        issueBtn +
        '<button class="icon-btn edit" onclick="showToast(\'Edit coming soon\',\'success\')" title="Edit">&#9998;</button>' +
        '<button class="icon-btn" onclick="deleteBook(' + b.id + ')" title="Delete">&#128465;</button>' +
      '</div></td>' +
    '</tr>';
  }).join('');
}

function deleteBook(id) {
  if (!confirm('Delete this book?')) return;
  books = books.filter(function(b) { return b.id !== id; });
  renderBooksTable();
  updateStats();
  showToast('Book deleted', 'success');
}

function quickIssue(id) {
  openIssueModal(id);
}


/* ── Members Table ────────────────────────────────────────── */

function renderMembersTable() {
  var q    = (document.getElementById('member-search')      || { value: '' }).value.toLowerCase();
  var type = (document.getElementById('member-type-filter') || { value: '' }).value;

  var filtered = members.filter(function(m) {
    var mQ = !q    || m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q);
    var mT = !type || m.type === type;
    return mQ && mT;
  });

  document.getElementById('members-tbody').innerHTML = filtered.map(function(m) {
    var studentInfo = m.type === 'Student'
      ? '<div class="td-sub" style="margin-top:4px">ID: ' + (m.sid || '') + ' ' + (m.grade || '') + ' ' + (m.section || '') + '</div>'
      : '';

    return '<tr>' +
      '<td><span class="link">' + m.id + '</span></td>' +
      '<td><div class="td-title">' + m.name + '</div><div class="td-sub">' + m.email + ' &bull; ' + m.phone + '</div></td>' +
      '<td><span class="badge badge-' + m.type.toLowerCase() + '">' + m.type + '</span>' + studentInfo + '</td>' +
      '<td>' + fmt(m.joinDate) + '</td>' +
      '<td style="color:' + (m.active  > 0 ? 'var(--green-mid)' : 'var(--text-muted)') + ';font-weight:600">' + m.active  + '</td>' +
      '<td style="color:' + (m.overdue > 0 ? 'var(--red)'       : 'var(--text-muted)') + ';font-weight:600">' + m.overdue + '</td>' +
      '<td>' + m.totalIssued + '</td>' +
      '<td><div class="action-btns">' +
        '<button class="btn btn-sm btn-outline" onclick="showToast(\'History coming soon\',\'success\')">History</button>' +
        '<button class="btn btn-sm btn-outline" onclick="openIssueModal(null,\'' + m.id + '\')">Issue</button>' +
        '<button class="icon-btn edit" onclick="showToast(\'Edit coming soon\',\'success\')">&#9998;</button>' +
        '<button class="icon-btn" onclick="deleteMember(\'' + m.id + '\')">&#128465;</button>' +
      '</div></td>' +
    '</tr>';
  }).join('');
}

function deleteMember(id) {
  if (!confirm('Remove this member?')) return;
  members = members.filter(function(m) { return m.id !== id; });
  renderMembersTable();
  updateStats();
  showToast('Member removed', 'success');
}


/* ── Issues Table ─────────────────────────────────────────── */

function switchIssueTab(tab, btn) {
  currentIssueTab = tab;
  document.querySelectorAll('#issue-tabs .tab-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  renderIssuesTable();
}

function statusBadge(status, renewals) {
  if (status === 'Active')   return '<span class="badge badge-active">&#9679; Active</span>';
  if (status === 'Overdue')  return '<span class="badge badge-overdue">&#9679; Overdue</span>';
  if (status === 'Returned') return '<span class="badge badge-available">&#9679; Returned</span>';
  if (status === 'Renewed')  return '<span class="badge badge-renewed">&#9679; Renewed &times;' + renewals + '</span>';
  return '';
}

function renderIssuesTable() {
  var q = (document.getElementById('issue-search') || { value: '' }).value.toLowerCase();

  var filtered = issues.filter(function(i) {
    if (currentIssueTab === 'active')   return i.status === 'Active'   || i.status === 'Renewed';
    if (currentIssueTab === 'overdue')  return i.status === 'Overdue';
    if (currentIssueTab === 'returned') return i.status === 'Returned';
    return true;
  });

  if (q) {
    filtered = filtered.filter(function(i) {
      return i.bookTitle.toLowerCase().includes(q)
          || i.memberName.toLowerCase().includes(q)
          || i.id.toLowerCase().includes(q);
    });
  }

  document.getElementById('issues-tbody').innerHTML = filtered.map(function(i) {
    var diff     = daysDiff(TODAY, new Date(i.dueDate));
    var daysHtml = '';

    if (i.status === 'Returned') {
      daysHtml = '<span class="text-muted">&mdash;</span>';
    } else if (diff < 0) {
      daysHtml = '<span class="days-left-over">'  + Math.abs(diff) + 'd over</span>';
    } else if (diff === 0) {
      daysHtml = '<span class="days-left-warn">Due today</span>';
    } else if (diff <= 3) {
      daysHtml = '<span class="days-left-warn">'  + diff + 'd left</span>';
    } else {
      daysHtml = '<span class="days-left-ok">'    + diff + 'd left</span>';
    }

    var actions = i.status !== 'Returned'
      ? '<div class="action-btns">' +
          '<button class="btn btn-sm btn-outline" onclick="quickReturn(\'' + i.id + '\')">Return</button>' +
          (i.renewals < 2 ? '<button class="btn btn-sm btn-outline" onclick="renewIssue(\'' + i.id + '\')">&#8635; Renew</button>' : '') +
        '</div>'
      : '';

    return '<tr>' +
      '<td><span class="link">' + i.id + '</span></td>' +
      '<td><div class="td-title">' + i.bookTitle + '</div><div class="td-sub">' + i.author + '</div></td>' +
      '<td><div>' + i.memberName + '</div><div class="td-sub">' + i.memberId + '</div></td>' +
      '<td>' + fmt(i.issueDate) + '</td>' +
      '<td class="' + (i.status === 'Overdue' ? 'due-overdue' : '') + '">' + fmt(i.dueDate) + '</td>' +
      '<td>' + daysHtml + '</td>' +
      '<td>' + statusBadge(i.status, i.renewals) + '</td>' +
      '<td>' + actions + '</td>' +
    '</tr>';
  }).join('');
}

function renewIssue(id) {
  var issue = issues.find(function(i) { return i.id === id; });
  if (!issue || issue.renewals >= 2) return;
  issue.renewals++;
  var due = new Date(issue.dueDate);
  due.setDate(due.getDate() + 14);
  issue.dueDate  = fmtInput(due);
  issue.status   = 'Renewed';
  renderIssuesTable();
  updateStats();
  showToast('Book renewed for 14 more days!', 'success');
}

function quickReturn(id) {
  var issue = issues.find(function(i) { return i.id === id; });
  if (!issue) return;
  var wasOverdue = issue.status === 'Overdue';
  issue.status   = 'Returned';

  var book = books.find(function(b) { return b.id === issue.bookId; });
  if (book) {
    book.available++;
    if (book.available > 0) book.status = 'Available';
  }

  var member = members.find(function(m) { return m.id === issue.memberId; });
  if (member) {
    member.active = Math.max(0, member.active - 1);
    if (wasOverdue) member.overdue = Math.max(0, member.overdue - 1);
  }

  renderIssuesTable();
  renderActiveIssuesList();
  updateStats();
  showToast('Book returned successfully!', 'success');
}


/* ── Reports ──────────────────────────────────────────────── */

function switchReportTab(tab, btn) {
  currentReportTab = tab;
  document.querySelectorAll('.report-panel .tab-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  renderReportTable();
}

function renderReportTable() {
  var q = (document.getElementById('rpt-search') || { value: '' }).value.toLowerCase();
  var filtered = issues.slice();

  if (currentReportTab === 'issued')  filtered = filtered.filter(function(i) { return i.status !== 'Returned'; });
  if (currentReportTab === 'overdue') filtered = filtered.filter(function(i) { return i.status === 'Overdue'; });
  if (currentReportTab === 'damaged') filtered = filtered.filter(function(i) {
    var b = books.find(function(b) { return b.id === i.bookId; });
    return b && (b.isLost || b.isDamaged);
  });

  if (q) {
    filtered = filtered.filter(function(i) {
      return i.bookTitle.toLowerCase().includes(q)
          || i.memberName.toLowerCase().includes(q)
          || i.id.toLowerCase().includes(q);
    });
  }

  document.getElementById('report-tbody').innerHTML = filtered.map(function(i) {
    return '<tr>' +
      '<td><span class="link">' + i.id + '</span></td>' +
      '<td>' + i.bookTitle  + '</td>' +
      '<td>' + i.memberName + '</td>' +
      '<td>' + fmt(i.issueDate) + '</td>' +
      '<td class="' + (i.status === 'Overdue' ? 'due-overdue' : '') + '">' + fmt(i.dueDate) + '</td>' +
      '<td>' + i.renewals + '</td>' +
      '<td>' + statusBadge(i.status, i.renewals) + '</td>' +
    '</tr>';
  }).join('');
}

function initReportCharts() {
  var catCount = {};
  issues.forEach(function(i) {
    var b = books.find(function(b) { return b.id === i.bookId; });
    if (b) catCount[b.category] = (catCount[b.category] || 0) + 1;
  });

  var rptLabels = Object.keys(catCount);
  var rptValues = Object.values(catCount);

  if (rptCatChart) rptCatChart.destroy();
  rptCatChart = new Chart(document.getElementById('rpt-cat-chart'), {
    type: 'bar',
    data: {
      labels: rptLabels,
      datasets: [{
        data: rptValues,
        backgroundColor: rptLabels.map(function() { return '#2ec4a0'; }),
        borderWidth: 0,
        borderRadius: 5
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f0f0f0' }, ticks: { color: '#9bb5ad' } },
        x: { grid: { display: false }, ticks: { color: '#9bb5ad' } }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });

  var monthData = [0, 0, 0, 0, 0, 0];
  var monthMap  = { 9:0, 10:1, 11:2, 0:3, 1:4, 2:5 };
  issues.forEach(function(i) {
    var m = new Date(i.issueDate).getMonth();
    if (monthMap[m] !== undefined) monthData[monthMap[m]]++;
  });

  if (rptMonthlyChart) rptMonthlyChart.destroy();
  rptMonthlyChart = new Chart(document.getElementById('rpt-monthly-chart'), {
    type: 'line',
    data: {
      labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
      datasets: [{
        data: monthData,
        borderColor: '#2ec4a0',
        backgroundColor: 'rgba(46,196,160,0.08)',
        tension: .4,
        pointBackgroundColor: '#2ec4a0',
        pointRadius: 5,
        fill: true
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
        x: { grid: { display: false } }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

function exportCSV() {
  var rows = [['Issue ID', 'Book Title', 'Member', 'Issue Date', 'Due Date', 'Renewals', 'Status']];
  issues.forEach(function(i) {
    rows.push([i.id, '"' + i.bookTitle + '"', '"' + i.memberName + '"', i.issueDate, i.dueDate, i.renewals, i.status]);
  });
  var csv = rows.map(function(r) { return r.join(','); }).join('\n');
  var a   = document.createElement('a');
  a.href  = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'library-report.csv';
  a.click();
  showToast('CSV exported!', 'success');
}


/* ── Modals ───────────────────────────────────────────────── */

function openModal(id)  { document.getElementById(id).classList.add('open');    }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function openAddBookModal() {
  openModal('add-book-modal');
}

function openRegisterModal() {
  document.getElementById('m-join').value = fmtInput(TODAY);
  openModal('register-member-modal');
}

function toggleStudentFields() {
  var t = document.getElementById('m-type').value;
  document.getElementById('student-fields').style.display = (t === 'Student') ? 'block' : 'none';
}

function openIssueModal(bookId, memberId) {
  var sel = document.getElementById('i-book');
  sel.innerHTML = books
    .filter(function(b) { return b.available > 0; })
    .map(function(b) {
      return '<option value="' + b.id + '"' + (b.id === bookId ? ' selected' : '') + '>'
           + b.title + ' (' + b.available + ' avail)</option>';
    }).join('');

  var msel = document.getElementById('i-member');
  msel.innerHTML = members.map(function(m) {
    return '<option value="' + m.id + '"' + (m.id === memberId ? ' selected' : '') + '>'
         + m.name + ' (' + m.id + ')</option>';
  }).join('');

  document.getElementById('i-date').value = fmtInput(TODAY);
  var due = new Date(TODAY);
  due.setDate(due.getDate() + 14);
  document.getElementById('i-due').value = fmtInput(due);

  openModal('issue-modal');
}

function openReturnModal() {
  var sel    = document.getElementById('r-issue');
  var active = issues.filter(function(i) { return i.status !== 'Returned'; });
  sel.innerHTML = active.map(function(i) {
    return '<option value="' + i.id + '">' + i.id + ' \u2014 ' + i.bookTitle + ' (' + i.memberName + ')</option>';
  }).join('');
  openModal('return-modal');
}

function addBook() {
  var title  = document.getElementById('b-title').value.trim();
  var author = document.getElementById('b-author').value.trim();
  var isbn   = document.getElementById('b-isbn').value.trim();
  if (!title || !author || !isbn) { showToast('Please fill required fields', 'error'); return; }

  var statusVal = document.getElementById('b-status').value;
  books.push({
    id:        books.length + 1,
    isbn:      isbn,
    title:     title,
    author:    author,
    category:  document.getElementById('b-cat').value,
    shelf:     document.getElementById('b-shelf').value || 'Z-01',
    copies:    parseInt(document.getElementById('b-copies').value) || 1,
    available: parseInt(document.getElementById('b-avail').value)  || 1,
    status:    statusVal,
    isLost:    statusVal === 'Lost',
    isDamaged: statusVal === 'Damaged'
  });

  closeModal('add-book-modal');
  ['b-isbn', 'b-shelf', 'b-title', 'b-author', 'b-desc'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('b-copies').value = '1';
  document.getElementById('b-avail').value  = '1';

  renderBooksTable();
  updateStats();
  showToast('Book added successfully!', 'success');
}

function registerMember() {
  var name  = document.getElementById('m-name').value.trim();
  var email = document.getElementById('m-email').value.trim();
  if (!name || !email) { showToast('Please fill required fields', 'error'); return; }

  var newId = 'LIB-2026-' + String(members.length + 1).padStart(3, '0');
  members.push({
    id:        newId,
    name:      name,
    email:     email,
    phone:     document.getElementById('m-phone').value,
    type:      document.getElementById('m-type').value,
    joinDate:  document.getElementById('m-join').value || fmtInput(TODAY),
    sid:       document.getElementById('m-sid').value,
    grade:     document.getElementById('m-grade').value,
    section:   document.getElementById('m-section').value,
    active:    0,
    overdue:   0,
    totalIssued: 0
  });

  closeModal('register-member-modal');
  ['m-name', 'm-email', 'm-phone', 'm-address', 'm-sid', 'm-grade', 'm-section'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });

  renderMembersTable();
  updateStats();
  showToast('Member registered!', 'success');
}

function issueBook() {
  var bookId   = parseInt(document.getElementById('i-book').value);
  var memberId = document.getElementById('i-member').value;
  var book     = books.find(function(b) { return b.id === bookId; });

  if (!book || book.available <= 0) { showToast('Book not available', 'error'); return; }

  var member = members.find(function(m) { return m.id === memberId; });
  issues.push({
    id:         'IS-' + String(issues.length + 1).padStart(3, '0'),
    bookId:     bookId,
    bookTitle:  book.title,
    author:     book.author,
    memberId:   memberId,
    memberName: member ? member.name : memberId,
    issueDate:  document.getElementById('i-date').value,
    dueDate:    document.getElementById('i-due').value,
    status:     'Active',
    renewals:   0
  });

  book.available--;
  if (book.available === 0) book.status = 'Issued';
  if (member) { member.active++; member.totalIssued++; }

  closeModal('issue-modal');
  renderActiveIssuesList();
  updateStats();
  if (document.getElementById('page-issues').classList.contains('active')) renderIssuesTable();
  if (document.getElementById('page-books').classList.contains('active'))  renderBooksTable();
  showToast('Book issued successfully!', 'success');
}

function returnBook() {
  var id = document.getElementById('r-issue').value;
  quickReturn(id);
  closeModal('return-modal');
}


/* ── Toast ────────────────────────────────────────────────── */

function showToast(msg, type) {
  type = type || 'success';
  var t = document.createElement('div');
  t.className  = 'toast-item ' + type;
  t.textContent = msg;
  document.getElementById('toast').appendChild(t);
  setTimeout(function() {
    if (t.parentNode) t.parentNode.removeChild(t);
  }, 3200);
}


/* ── Init ─────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function() {

  /* Close modals on backdrop click */
  document.querySelectorAll('.modal-overlay').forEach(function(m) {
    m.addEventListener('click', function(e) {
      if (e.target === m) m.classList.remove('open');
    });
  });

  /* Enter key on login fields */
  var lu = document.getElementById('login-user');
  var lp = document.getElementById('login-pass');
  var fe = document.getElementById('forgot-email');

  if (lu) lu.addEventListener('keydown', function(e) { if (e.key === 'Enter') doLogin();    });
  if (lp) lp.addEventListener('keydown', function(e) { if (e.key === 'Enter') doLogin();    });
  if (fe) fe.addEventListener('keydown', function(e) { if (e.key === 'Enter') sendReset();  });

});