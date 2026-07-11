const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value.trim();

  const subjectLabels = {
    general: 'General question',
    facts: 'Fact correction',
    api: 'API or data issue',
    videos: 'Videos',
    privacy: 'Privacy',
    other: 'Other',
  };

  const mailSubject = encodeURIComponent(`Egyptian Football Facts: ${subjectLabels[subject] || subject}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${subjectLabels[subject] || subject}\n\n${message}`);
  const mailto = `mailto:support@egyptianfootballfacts.com?subject=${mailSubject}&body=${body}`;

  window.location.href = mailto;

  contactStatus.hidden = false;
  contactStatus.textContent = 'Your email app should open. If it does not, email us at support@egyptianfootballfacts.com';
  contactStatus.className = 'contact-note contact-note-success';
});
