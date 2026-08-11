const page = document.body.dataset;
document.title = `Math Level ${page.level}, Week ${page.week} | Month 6`;
document.querySelector('[data-title]').textContent = `Level ${page.level} • Week ${page.week}`;
document.querySelector('[data-back]').href = `../../level-${page.level.toLowerCase()}.html`;
