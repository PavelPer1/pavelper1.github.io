// Клиентская демонстрация. Здесь только переключение пяти статических HTML-макетов.
(() => {
  'use strict';
  const designs = [
    { name: 'Дизайн -1', file: 'design-1.html' },
    { name: 'Дизайн -2', file: 'design-2.html' },
    { name: 'Дизайн -3', file: 'design-3.html' },
    { name: 'Дизайн -4', file: 'design-4.html' },
    { name: 'Дизайн -5', file: 'design-5.html' },
  ];
  const options = document.getElementById('options');
  const frame = document.getElementById('preview');
  const name = document.getElementById('control-name');
  const stage = document.getElementById('stage');
  const deviceButtons = Array.from(document.querySelectorAll('.device'));
  let selected = 0;

  designs.forEach((design, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option';
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', 'preview');
    button.setAttribute('aria-selected', 'false');
    button.textContent = design.name;
    button.addEventListener('click', () => select(i, true));
    options.appendChild(button);
  });

  function select(index, changeHash) {
    if (!designs[index]) return;
    selected = index;
    options.querySelectorAll('.option').forEach((button, i) => {
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
    });
    name.textContent = designs[index].name;
    frame.title = designs[index].name;
    if (!frame.src.endsWith('/' + designs[index].file)) frame.src = designs[index].file;
    if (changeHash) history.replaceState(null, '', '#design-' + (index + 1));
  }

  options.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = (selected + ((event.key === 'ArrowDown' || event.key === 'ArrowRight') ? 1 : -1) + designs.length) % designs.length;
    select(next, true);
    options.children[next].focus();
  });

  deviceButtons.forEach(button => button.addEventListener('click', () => {
    deviceButtons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    stage.dataset.device = button.dataset.device;
  }));

  function fromHash() {
    const match = location.hash.match(/^#design-([1-5])$/);
    select(match ? Number(match[1]) - 1 : 0, false);
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
