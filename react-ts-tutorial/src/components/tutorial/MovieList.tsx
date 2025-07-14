import axios from "axios";
import Movie from "./Movie";
import { useEffect, useState } from "react";

const MovieList = () => {
    // let id = 0
    type Movies = {
        medium_cover_image: string,
        id: number,
        title: string,
        year: number,
        rating: number,
        genres: string[],
    }

    const [MovieData, setMovieData] = useState<Movies[]>([])

    function getMovies() {
        const url = "https://yts.mx/api/v2/list_movies.json"

        axios.get(url)
            .then(({ data: { data: { movies } } }) => {
                // console.log(movies)
                setMovieData(movies)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getMovies()
        console.log("영화 DB 불러오기 완료")
    }, [])
    // getMovies()
    // console.log(MovieData)
    // const MovieData = [
    //     {
    //         id: id++,
    //         title: "오징어게임",
    //         rating: 4
    //     },
    //     {
    //         id: id++,
    //         title: "타짜",
    //         rating: 5
    //     },
    //     {
    //         id: id++,
    //         title: "포레스트검프",
    //         rating: 5
    //     }
    // ]

    return (
        <div className="movie-list-container">
            <div className="movie-grid">
                {MovieData.length > 0 ? MovieData.map((movie) => (
                    <Movie
                        key={movie.id}
                        medium_cover_image={movie.medium_cover_image}
                        title={movie.title}
                        rating={movie.rating}
                        year={movie.year}
                        genres={movie.genres}
                    />
                )) : <div className="loading">Loading...</div>}
            </div>
        </div>
    )
}

export default MovieList