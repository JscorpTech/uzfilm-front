const baseUrl = "https://gateway.pandatv.uz/catalogservice";
export default {
  getCategorys() {
    return $fetch(`${baseUrl}/category/`);
  },
  getCategoryMovies(
    slug: string,
    token: any,
    page: number | string,
    size: number | string
  ) {
    if (token) {
      return $fetch(
        baseUrl + `/category/${slug}/slug/?size=${size}&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } else {
      return $fetch(
        baseUrl + `/category/${slug}/slug/?size=${size}&page=${page}`,
        {
          method: "GET",
        }
      );
    }
  },
  getMegogoFilms(size: number | string, page: number | string) {
    return $fetch(`${baseUrl}/megogo/?size=${size}&page=${page}`);
  },
  getMegogoDetails(
    id: number | string,
    userId: number | string,
    token: string | null
  ) {
    return $fetch(
      `${baseUrl}/megogo/content/details/?video_id=${id}&user_id=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
};
