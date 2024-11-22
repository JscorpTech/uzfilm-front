const baseUrl = "https://gateway.pandatv.uz/userservice";
interface UpdateForm {
  phone_number: string;
  name: string;
}
export default {
  getUserInfo(token: string | null) {
    return $fetch(`${baseUrl}/users`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  updateUserInfo(token: string | null, form: UpdateForm) {
    return $fetch(`${baseUrl}/users`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: form,
    });
  },
};
