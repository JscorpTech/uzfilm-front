const baseUrl = "https://gateway.pandatv.uz/catalogservice";
const analiticsUrl = "https://gateway.pandatv.uz/analitics";

interface CommentBody {
  username: string;
  content: string | number;
  object_id: number | string;
  content_type: string;
  parent: null | number | string;
}

interface userWatchDataBody {
  user_id: number | string;
  content_id: number | string | null;
  watch_duration: number;
  content_type: string;
}

interface userActivityDataBody {
  user_id: number | string;
  content_id: number | string | null;
  timestamp: number;
  content_type: string;
  activity_type: string;
  playback_position: number | string;
}
export default {
  getMovieDetail(slug: string, token: string | null) {
    return $fetch(baseUrl + "/movies/slug/" + slug + "/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  },
  sendComment(token: string | null, body: CommentBody) {
    return $fetch(`${baseUrl}/comments/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: body,
    });
  },
  getWatchTime(
    userId: number | string,
    id: number | string,
    content_type: string
  ) {
    return $fetch(
      `${analiticsUrl}/last-watched-position/${userId}/${id}/${content_type}/`
    );
  },
  userWatchData(token: string | null, body: userWatchDataBody) {
    return $fetch(`${analiticsUrl}/user-watch-data/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: body,
    });
  },
  useractivity(token: string | null, body: userActivityDataBody) {
    return $fetch(`${analiticsUrl}/user-activity/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: body,
    });
  },
  getUserHistory(
    userId: string | number,
    size: number | string,
    page: string | number,
    token: string | null
  ) {
    return $fetch(
      `${analiticsUrl}/user-watch-history/${userId}/?page_size=${size}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  },
};
