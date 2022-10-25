import React from 'react';
import productThumbJson from '../../static/product/id/413.json'
import styled from 'styled-components';
import uuid from 'react-uuid'
import { useMediaQuery } from 'react-responsive'
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";

const ProductThumb = () => {

    const productImg = productThumbJson.images;
    // 브라우저 width 값이 768px 이하가되면 true 그전에는 false
    const isMobile = useMediaQuery({ maxWidth: 768 })

    return (
        <>
            {isMobile ?
                <StSwiperDiv>
                    <Swiper
                        slidesPerView={1}
                        navigation
                        modules={[Navigation, Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        autoplay={{
                        delay: 3000, 
                        }}
                        loop={true}
                    >
                        {productImg.map((img) => (
                            <SwiperSlide key={uuid()}>
                                <StSlideDiv imgUrl={img}>
                                </StSlideDiv>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </StSwiperDiv>
                :
                <StDiv>
                    {productImg.map((img) => (
                        <StImgDiv key={uuid()}>
                            <StImg src={img} alt="상품이미지" />
                        </StImgDiv>
                    ))}
                </StDiv>
            }
        </>
    );
};
const StDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 10px;
    width: 66%;
    margin-top: 40px;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

const StImgDiv = styled.div`
    width: calc(100% - 10px);
`

const StImg = styled.img`
    display: block;
    width: 100%;
`

const StSlideDiv = styled.div<{imgUrl: string}>`
    width: 100%;
    height: 500px;
    background: ${props => `url(${props.imgUrl})`};
    background-size: cover;
    background-position: center;
`

const StSwiperDiv = styled.div`
    width: 100%;
`



export default ProductThumb;