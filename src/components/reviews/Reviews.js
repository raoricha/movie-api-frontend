import { useEffect, useRef } from "react";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import ReviewForm from "../reviewForm/ReviewForm";

import React from 'react'

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef()
    let params = useParams()
    const movieId = params.movieId

    useEffect(() => {
        getMovieData(movieId)
    }, [])

    const addReview = async (e) => {
        e.preventDefault()

        const rev = revText.current

        try {

            const response = await axios.post("/api/v1/movies", { reviewBody: rev.value, imdbId: movieId })

            const updatedReviews = [...review, { body: rev.value }]

            rev.value = ""

            setReviews(updatedReviews)

        } catch (error) {
            console.log(error)
        }


    }

    return (
        <container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a review." />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        reviews?.map((r) => {
                            return (
                                <>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </container>

    )
}

export default Reviews
