const baseUrl = "https://gateway.pandatv.uz/catalogservice";
export default {
  search(search: string, token: string | null) {
    return $fetch(`${baseUrl}/search/`, {
      method: "GET",
      params: {
        q: search,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  searchCategory(
    genre: string,
    startYear: string | number,
    endYear: string | number,
    cateogrie: number | string | null
  ) {
    return $fetch(`${baseUrl}/search/`, {
      method: "GET",
      params: {
        genre: genre,
        start_year: startYear,
        end_year: endYear,
        category: cateogrie,
      },
    });
  },
};
