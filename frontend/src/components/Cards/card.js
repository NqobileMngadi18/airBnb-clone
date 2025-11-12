import React from "react";
import "./styles.css";
import "./swiper-custom.css";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

function Card({ card }) {
  return (
    <div className="card-box">
      <div className="card-img-container">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="swiper-container"
          style={{ height: '100%' }}
        >
          {card.imgSrc.map((src, i) => (
            <SwiperSlide key={i}>
              <img src={src} className="card-img" alt={card.title || ""} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="card-info-flex">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="card-location">{card.title}</h3>
          <div className="card-rating">
            <StarIcon style={{ fontSize: '14px' }} />
            <span>{card.rating}</span>
          </div>
        </div>
        <p className="card-description">{card.desc}</p>
        <p className="card-description">{card.date}</p>
        <p className="card-price">
          <span className="card-price-amount">${card.price}</span>
          <span className="card-price-night"> / night</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
