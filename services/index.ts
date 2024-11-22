const baseUrl = "https://gateway.pandatv.uz/catalogservice";
const userInfoBase = "https://gateway.pandatv.uz/userservice";
const authBase = "https://gateway.pandatv.uz";
const paymentUrl = "https://gateway.pandatv.uz/billingservice";
const analiticsUrl = "https://gateway.pandatv.uz/analitics";
const megogoBaseUrl = "https://ff7ff4845640e1062dd2cfcbb097f4e3.serveo.net";

export default {
  getBanners() {
    return $fetch(`${baseUrl}/banners/`);
  },
};
