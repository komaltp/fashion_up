import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Geocode from 'opencage-api-client';
import Aos from "aos";
import "aos/dist/aos.css";
import { GrLocation } from "react-icons/gr";
// import data from '../data';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      // setProducts(result.data);
    };
    fetchData();
  }, []);
  const [locationInfo, setLocationInfo] = useState("");
  const [showDiv, setShowDiv] = useState(false);

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationInfo(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setShowDiv(true);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  return (
    <>
      <section id="home">
        <p1>FASHION-UP</p1>
        <h2 data-aos="fade-up">Trendy wears at your stairs</h2>
      </section>
      <div className="button-container">
      <button data-aos="fade-up" class="centered-button" onClick={handleClick}> {locationInfo} <GrLocation/></button>
      </div>
      {showDiv && (
        <div >
          
          
          <div  className="products">
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <Row>
                {products.map((product) => (
                  <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default HomeScreen;
