(function applySavedTheme() {
  try {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (error) {
    console.warn('The saved color theme could not be restored.', error);
  }
})();
