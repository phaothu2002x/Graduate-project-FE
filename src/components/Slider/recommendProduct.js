import './RecommendProduct.scss';
import Slider from 'react-slick';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

const RecommendProduct = (props) => {
    const navigate = useNavigate();
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: props.slideShow(props.data.length),
        slidesToScroll: 1,
    };
    const suggestList = props.data;

    const handleSuggestItemClick = (id) => {
        navigate(`/product/${id}`);
        window.location.reload();
    };

    return (
        <div className="slider-wrapper">
            <div className="inner">
                <Slider {...settings}>
                    {suggestList && suggestList.length > 1 ? (
                        suggestList.map((item, index) => (
                            <div className="product-item" key={`item-${index}`} onClick={() => handleSuggestItemClick(item.id)}>
                                <img src={item.thumbnail} alt="img" className="product-image" />
                            </div>
                        ))
                    ) : (
                        <>
                            <h2>No product sugessted...</h2>
                        </>
                    )}
                </Slider>
            </div>
        </div>
    );
};

export default RecommendProduct;
