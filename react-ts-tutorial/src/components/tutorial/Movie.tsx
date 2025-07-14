type MovieProps = {
    key: number;
    year: number;
    title: string;
    rating: number;
    medium_cover_image: string;
    genres: string[];
    // desc: string;
}

const Movie = ({ title, year, rating, medium_cover_image, genres }: MovieProps) => {
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={medium_cover_image} alt={title} />
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{title}</h3>
                <div className="movie-details">
                    <span className="movie-year">{year}</span>
                    <span className="movie-rating">⭐ {rating}</span>
                </div>
                <div className="movie-genres">
                    {genres.map((genre, index) => (
                        <span key={index} className="genre-tag">{genre}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Movie