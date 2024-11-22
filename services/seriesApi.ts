const baseUrl = "https://gateway.pandatv.uz/catalogservice";
export default {
  getSerieDetail(id: number | string, token: string | null) {
    return $fetch(baseUrl + "/series/" + id + "/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  getEpisods(
    id: number | string,
    ep: number | string,
    token: string | null,
    page: number | string
  ) {
    return $fetch(
      baseUrl + "/series/" + id + `/seasons/${ep}/episodes/?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
  getSeaseons(
    id: number | string,
    season: number | string,
    episode: number | string,
    token: string | null
  ) {
    return $fetch(
      `${baseUrl}/series/${id}/seasons/${season}/episodes/${episode}/`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
};
