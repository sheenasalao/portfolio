const body = document.body;
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
  const dark = body.dataset.theme !== 'dark';
  body.dataset.theme = dark ? 'dark' : 'light';
  if (!dark) body.removeAttribute('data-theme');
  themeToggle.textContent = dark ? '☀' : '☾';
});

const menuToggle = document.getElementById('menuToggle');
const navlinks = document.getElementById('navlinks');

menuToggle.addEventListener('click', () => {
  navlinks.classList.toggle('open');
  menuToggle.textContent = navlinks.classList.contains('open') ? '×' : '☰';
});

navlinks.querySelectorAll('a').forEach(a => 
  a.addEventListener('click', () => {
    navlinks.classList.remove('open');
    menuToggle.textContent = '☰';
  })
);

const progress = document.getElementById('progress');
const topBtn = document.getElementById('topBtn');

function onScroll() {
  const d = document.documentElement;
  const max = d.scrollHeight - d.clientHeight;
  progress.style.width = (max > 0 ? d.scrollTop / max * 100 : 0) + '%';
  topBtn.classList.toggle('show', d.scrollTop > 500);
  
  let current = 'home';
  document.querySelectorAll('main section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  
  navlinks.querySelectorAll('a').forEach(a => 
    a.classList.toggle('active', a.getAttribute('href') === '#' + current)
  );
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

topBtn.addEventListener('click', () => 
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

document.getElementById('year').textContent = new Date().getFullYear();

const serviceInfo = {
  admin: [
    'Administrative Support', 
    'Document formatting and organization; digital filing; task and request trackers; records organization; meeting notes and action lists; progress follow-ups.'
  ],
  data: [
    'Data Entry & Records', 
    'Accurate data encoding; spreadsheet updates; input verification; consistent formatting; digital record maintenance; basic reporting and status summaries.'
  ],
  email: [
    'Email & Scheduling', 
    'Inbox organization; draft replies for review; calendar coordination; appointment scheduling; reminders; meeting documentation and follow-up lists.'
  ],
  customer: [
    'Customer Service', 
    'Professional inquiry responses; booking assistance; clear status updates; courteous concern acknowledgement; escalation of unresolved issues using client-approved procedures.'
  ]
};

const detail = document.getElementById('serviceDetail');

document.querySelectorAll('.service').forEach(card => 
  card.addEventListener('click', () => {
    const [title, copy] = serviceInfo[card.dataset.service];
    detail.innerHTML = '<strong>' + title + '</strong><br>' + copy;
    detail.classList.add('show');
  })
);

document.querySelectorAll('.filter').forEach(btn => 
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn));
    document.querySelectorAll('.work-card').forEach(card => 
      card.classList.toggle('hide', btn.dataset.filter !== 'all' && card.dataset.category !== btn.dataset.filter)
    );
  })
);

document.querySelectorAll('.details-btn').forEach(btn => 
  btn.addEventListener('click', () => {
    const box = btn.closest('.work-card').querySelector('.work-detail');
    const open = box.classList.toggle('show');
    btn.textContent = open ? 'Hide details −' : 'View example details +';
  })
);

const observer = new IntersectionObserver(entries => 
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }), 
  { threshold: .12 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const toast = document.getElementById('toast');
let toastTimer;

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const subject = encodeURIComponent('Virtual Assistant Inquiry — ' + fd.get('need'));
  const bodyText = encodeURIComponent(
    'Hello Sheena,\n\nMy name is ' + fd.get('name') + '.\nEmail: ' + fd.get('email') + 
    '\nSupport needed: ' + fd.get('need') + '\n\nDetails:\n' + fd.get('message') + '\n\nThank you.'
  );
  window.location.href = 'mailto:sheenasalao24@gmail.com?subject=' + subject + '&body=' + bodyText;
  showToast('Opening your email app…');
});

// Profile photo: choose an image for an instant preview, or place profile.jpg beside index.html for a saved site photo.
const profilePhotoInput = document.getElementById('profilePhotoInput');
const profilePhoto = document.getElementById('profilePhoto');
const profileInitials = document.getElementById('profileInitials');
let temporaryProfilePhotoUrl = null;

profilePhotoInput.addEventListener('change', event => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('Please choose an image file.');
    return;
  }
  if (temporaryProfilePhotoUrl) URL.revokeObjectURL(temporaryProfilePhotoUrl);
  temporaryProfilePhotoUrl = URL.createObjectURL(file);
  profilePhoto.src = temporaryProfilePhotoUrl;
  profilePhoto.style.display = 'block';
  profileInitials.style.display = 'none';
  showToast('Photo preview updated. Save it as profile.jpg to keep it on your website.');
});

profilePhoto.addEventListener('error', () => {
  profilePhoto.style.display = 'none';
  profileInitials.style.display = 'grid';
});

profilePhoto.addEventListener('load', () => {
  profilePhoto.style.display = 'block';
  profileInitials.style.display = 'none';
});
