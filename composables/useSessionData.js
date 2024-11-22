// ~/composables/useSessionData.js
import { ref, onMounted } from 'vue';
import UAParser from 'ua-parser-js'; // Import UAParser library

export const useSessionData = () => {
  const sessionData = ref({
    browserName: '',
    browserVersion: '',
    operatingSystem: '',
    screenHeight: 0,
    screenWidth: 0,
    locale: '',
    timezone: '',
    // Add other fields as necessary
  });

  const getSessionData = () => {
    if (process.client) {
      const ua = navigator.userAgent;
      const parser = new UAParser(ua); // UAParser is a library to parse user agent string

      sessionData.value = {
        browserName: parser.getBrowser().name,
        browserVersion: parser.getBrowser().version,
        operatingSystem: parser.getOS().name,
        screenHeight: window.screen.height,
        screenWidth: window.screen.width,
        locale: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        // Populate other fields as necessary
      };
    }
  };

  onMounted(() => {
    getSessionData();
  });

  return { sessionData };
};
