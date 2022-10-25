import React, { useState } from 'react';
import styled from 'styled-components';
import productThumbJson from '../../static/product/id/413.json'
import { ReactComponent as Copy} from '../asset/img/copy.svg'
import ProductInfoReleases from './ProductInfoReleases';

const ProductInfo = () => {
    const productInfo = productThumbJson

    // 복사하기 말풍선 css 애니메이션
    const [active, setActive] = useState(false)
    // 복사하기 말풍선 조건부 렌더링
    const [copyActive, setCopyActive] = useState(false);
    // 더보기
    const [moreActive, setMoreActive] = useState(true); 

    // 상품 코드 복사하기 이벤트 핸들러
    const copyHandler = () => {
        setCopyActive(!copyActive);
        setActive(!active);
        let innerText = document.getElementById("code")?.innerText;
        if(typeof(innerText) === 'string') {
            navigator.clipboard.writeText(innerText)
        }
        setTimeout(()=>{setCopyActive(false)},1000);
        setTimeout(()=>{setActive(false)},1000);
    }

    // 글 더보기 이벤트 핸들러 
    const clickHandler = () => {
        document.getElementById('comment')?.classList.remove('shortComment')
        setMoreActive(false)
    }


    return (
        <StSIdeDiv>
            <StDiv>
                <StBrandInfoBox>
                    <ul>
                        <li>{productInfo.brandName}</li>
                        <li>{productInfo.nameEn}</li>
                        <li>{productInfo.name}</li>
                    </ul>
                    <StBrand src={productInfo.brandIcon}/>
                </StBrandInfoBox>
                <StProductInfoBox>
                    <dl>
                        <dt>제품 코드</dt>
                        <dd id="code">{productInfo.code}<CopyBox><Copy onClick={copyHandler}/>{copyActive&&<BallonDiv active={active}>복사완료</BallonDiv>}</CopyBox></dd>
                    </dl>
                    <dl>
                        <dt>가격</dt>
                        <dd>{productInfo.price}</dd>
                    </dl>
                    <dl>
                        <dt>발매일</dt>
                        <dd>{productInfo.firstReleaseDate}</dd>
                    </dl>
                    <dl>
                        <dt>총 응모 횟수</dt>
                        <dd>{productInfo.applyCount}</dd>
                    </dl>
                </StProductInfoBox>
                <StCommentBox>
                    <p id='comment' className='shortComment'>{productInfo.comment}</p>
                    {moreActive&&<button onClick={clickHandler}>더보기</button>}
                </StCommentBox>
                <StProductCountDiv>
                    발매처{productInfo.releaseSiteCount} · 조회수{productInfo.views}
                </StProductCountDiv>
                <ProductInfoReleases/>
            </StDiv>
        </StSIdeDiv>
    );
};
const StSIdeDiv = styled.div`
    width: 34%;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`


const StDiv = styled.div`
    width: 400px;
    margin: 0 auto;
    margin-top: 160px;
`

const StBrandInfoBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: 1px solid #cdcdcd;
    border-top: none;
    padding: 0px 12px 12px 12px;
    box-sizing: border-box;
    ul {
        li {
            font-size: 14px;
            font-weight: bold;
            line-height: 25px;
            &:last-child {
                font-weight: 400;
            }
        }
    }
`

const StBrand = styled.img`
    width: 61px;
    height: 61px;
    display: block;
`

const StProductInfoBox = styled.div`
    margin-top: 14px;
    width: 100%;
    border: 1px solid #cdcdcd;
    border-top: none;
    padding: 0px 12px 12px 12px;
    box-sizing: border-box;
    line-height: 25px;
    dl {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        dt {
            color: #666;
            width: 155px;
        }
        dd {
            font-weight: bold;
            width: 155px;
            display: flex;
            svg {
                cursor: pointer;
            }
        }
    }
`

const CopyBox = styled.div`
    position: relative;
    width: 16px;
`

const BallonDiv = styled.div<{active: boolean}>`
    position: absolute;
    width: 76px;
    height: 32px;
    line-height: 18px;
    bottom: 40px;
    left: -30px;
    background: #484848;
    color: #fff;
    border-radius: 5px;
    padding: 7px 12px;
    box-sizing: border-box;
    font-size: 12px;
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${props => props.active === true ? 'fadeIn' : 'fadeOut'};
    animation-fill-mode: forwards;
    &:after {
        border-top: 10px solid #484848;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 0px solid transparent;
        content : "";
        position: absolute;
        top: 32px;
        left: 50%;
        transform: translate(-50%);
    }
`

const StCommentBox = styled.div`
    margin-top: 14px;
    width: 100%;
    border: 1px solid #cdcdcd;
    border-top: none;
    padding: 0px 12px 12px 12px;
    box-sizing: border-box;
    font-size: 13px;
    line-height: 1.4;
    position: relative;
    p.shortComment {
        display: inline-block;
        width: 100%;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1.4;
        height: 4.2em;
    }
    button {
        position: absolute;
        width: 60px;
        line-height: 18px;
        font-size: 13px;
        font-weight: bold;
        right: 0;
        bottom: 13px;
        border: none;
        cursor: pointer;
        background-color: rgba( 255, 255, 255, 0.9 );
    }
`

const StProductCountDiv = styled.div`
    margin: 12px 0px 12px 0px;
    font-size: 12px;
    color: #959595;
`


export default ProductInfo;