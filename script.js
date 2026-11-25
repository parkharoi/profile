const toggle = document.querySelector('.theme-toggle');
const icon = document.querySelector('.toggle-icon');
const label = document.querySelector('.toggle-label');

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  toggle.setAttribute('aria-pressed', String(isDark));
  toggle.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
  icon.textContent = isDark ? '☀' : '☾';
  label.textContent = isDark ? '라이트 모드' : '다크 모드';
  document.querySelector('meta[name="theme-color"]').content = isDark ? '#151620' : '#f7f8fc';
  try { localStorage.setItem('haroi-theme', isDark ? 'dark' : 'light'); } catch (_) { /* 저장소를 사용할 수 없어도 전환은 동작합니다. */ }
}

let storedTheme = null;
try { storedTheme = localStorage.getItem('haroi-theme'); } catch (_) { /* 저장소를 사용할 수 없는 환경을 지원합니다. */ }
const previewTheme = new URLSearchParams(location.search).get('theme');
if (previewTheme === 'dark' || previewTheme === 'light') storedTheme = previewTheme;
setTheme(storedTheme === 'dark');
toggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

document.querySelectorAll('.interest-card').forEach((card) => {
  card.addEventListener('click', () => {
    const detail = document.getElementById(card.getAttribute('aria-controls'));
    const willOpen = card.getAttribute('aria-expanded') !== 'true';

    document.querySelectorAll('.interest-card').forEach((otherCard) => {
      const otherDetail = document.getElementById(otherCard.getAttribute('aria-controls'));
      otherCard.setAttribute('aria-expanded', 'false');
      otherDetail.hidden = true;
    });

    card.setAttribute('aria-expanded', String(willOpen));
    detail.hidden = !willOpen;
  });
});

const greeting = document.querySelector('.typed-greeting');
const greetingText = Array.from(greeting.textContent.trim());
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  greeting.textContent = greetingText.join('');
} else {
  greeting.textContent = '';
  greeting.classList.add('is-typing');
  let letter = 0;
  const typingTimer = window.setInterval(() => {
    greeting.textContent += greetingText[letter];
    letter += 1;
    if (letter >= greetingText.length) {
      window.clearInterval(typingTimer);
      greeting.classList.remove('is-typing');
    }
  }, 90);
}
