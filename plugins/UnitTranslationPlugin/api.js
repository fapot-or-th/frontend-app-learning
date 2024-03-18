// this will be replaced with an API call
// GET {lms}/api/ai_translations/config
const getData = async () => Promise.resolve({
  enabled: true,
  availableLanguages: [
    {
      code: 'en',
      label: 'English',
    },
    {
      code: 'es',
      label: 'Spanish',
    },
  ],
});

export default getData;
