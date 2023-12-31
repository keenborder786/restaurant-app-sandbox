import http from "../http-common";

class RestaurantDataService {
    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }

    get(id) {
        return http.get(`/id/${id}`);
    }

    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    }

    createReview(data) {
        return http.post("/reviews", data);
    }

    updateReview(data) {
        return http.put("/reviews", data);
    }

    deleteReview(id, userId) {
        return http.delete(`/reviews?id=${id}`, { data: { user_id: userId } });
    }

    getCuisines(id) {
        return http.get(`/cuisines`);
    }

}

export default new RestaurantDataService();