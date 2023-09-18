import React, { useState, useContext } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link, useParams, useLocation } from "react-router-dom";
import { UserContext } from '../App.js';
function AddReview(props) {
    let initialReviewState = ""
    const { id } = useParams();
    const location = useLocation();
    const { state } = location;
    const { user, setUser } = useContext(UserContext);
    let editing = false;
    if (state !== null) {
        editing = true;
        initialReviewState = state.currentReview.text
    }
    const [review, setReview] = useState(initialReviewState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        setReview(event.target.value);
    };

    const saveReview = () => {
        var data = {
            text: review,
            name: user.name,
            user_id: user.id,
            restaurant_id: id
        };

        if (editing) {
            data.review_id = location.state.currentReview._id
            RestaurantDataService.updateReview(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            RestaurantDataService.createReview(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }

    };

    return (
        <div>
            {user.logged_in ? (
                <div className="submit-form">
                    {submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <Link to={"/restaurants/" + id} className="btn btn-success">
                                Back to Restaurant
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="description">{editing ? "Edit" : "Create"} Review</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="text"
                                    required
                                    value={review}
                                    onChange={handleInputChange}
                                    name="text"
                                />
                            </div>
                            <button onClick={saveReview} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    )}
                </div>

            ) : (
                <div>
                    Please log in.
                </div>
            )}

        </div>
    );
};

export default AddReview;