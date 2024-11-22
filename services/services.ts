const baseUrl = "https://gateway.pandatv.uz/catalogservice";
const paymentUrl = "https://gateway.pandatv.uz/billingservice";
interface PaymentBody {
  user_id: number | string;
  plan_id: number | string;
}
export default {
  getFavoriteMovies(page: number | string, token: string | null) {
    return $fetch(`${baseUrl}/user-favorites/?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  getSavedMovies(token: string | null) {
    return $fetch(`${baseUrl}/user-favorites/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  addFavorite(
    id: number | string,
    token: string | number,
    type: string,
    typeUrl: string
  ) {
    return $fetch(baseUrl + `/${typeUrl}/${id}/add-favorite/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        content_type: type,
      },
    });
  },
  remFavorite(
    id: number | string,
    token: string | number,
    type: string,
    typeUrl: string
  ) {
    return $fetch(baseUrl + `/${typeUrl}/${id}/remove-favorite/`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: {
        content_type: type,
      },
    });
  },
  getGenres() {
    return $fetch(`${baseUrl}/genres/`);
  },
  payment(token: string | null, body: PaymentBody) {
    return $fetch(paymentUrl + "/billing/payment-url/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });
  },
  activePlan(id: number | string, token: null | string) {
    return $fetch(`${paymentUrl}/billing/${id}/subscriptions/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  },
  getPlans(token: string | null) {
    return $fetch(`${baseUrl}/plans/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
};
