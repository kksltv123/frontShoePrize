import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from "styled-components";
import detail1 from "../../static/product_release/0ff92b20-0563-43b2-88c1-c05928579271.json"
import detail2 from "../../static/product_release/169ee95b-793b-4689-9a8b-067f8994f53c.json"
import detail3 from "../../static/product_release/23fed23b-25ce-4baa-8bcc-1194e7615e40.json"
import detail4 from "../../static/product_release/30bf3b41-9601-43c6-ad3c-b74d4811c856.json"
import detail5 from "../../static/product_release/39d938af-2f25-470e-980a-8adb35fc531f.json"
import detail6 from "../../static/product_release/50d1b6df-98d1-4ff6-bb98-b20e4e21f781.json"
import detail7 from "../../static/product_release/6ce0a858-898c-4a22-a02c-196ac6cb87e5.json"
import detail8 from "../../static/product_release/9ddaf554-d1a0-432f-814b-72f49477aaf8.json"
import detail9 from "../../static/product_release/a22ca8f7-3426-45df-a8c9-f7611cca454c.json"
import detail10 from "../../static/product_release/d4029e49-1929-4441-b4e4-b39b5de79d6d.json"
import detail11 from "../../static/product_release/de9beb49-3ae8-49a1-9205-b1baac202f3f.json"
import releasesProductId from '../atom/ReleasesProductId';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ModalState from '../atom/ModalState';
import uuid from 'react-uuid';
import { ReactComponent as Copy } from '../asset/img/copy.svg'
import { ReactComponent as Icon } from '../asset/img/icon.svg'
import { ReactComponent as Instagram } from '../asset/img/Instagram.svg'
import { ReactComponent as KaKao } from '../asset/img/kakao.svg'
import { ReactComponent as Twiter } from '../asset/img/twiter.svg'



const ModalDetail = () => {
    // 모달창에 띄워줄 리스트
    const modalDetail = [detail1, detail2, detail3, detail4, detail5, detail6, detail7, detail8, detail9, detail10, detail11];
    // 선택된 데이터의 uuid 값을 가져온다
    const selectedUuid = useRecoilValue(releasesProductId)
    // 엑스버튼 눌렀을때 화면에서 모달창을 지워준다.
    const [modalState, setModalState] = useRecoilState(ModalState);
    const [active, setActive] = useState(false)
    const [copyActive, setCopyActive] = useState(false);
    const time = Date.now();

    // modalDetail 배열에서 해당 uuid값과 같은 값을 리턴
    const modalDetailSelected = modalDetail.filter((modalDetail) => modalDetail.uuid === selectedUuid)[0];
    const copyHandler = () => {
        setCopyActive(!copyActive);
        setActive(!active);
        let innerText = document.getElementById("code")?.innerText;
        if (typeof (innerText) === 'string') {
            navigator.clipboard.writeText(innerText)
        }
        setTimeout(() => { setCopyActive(false) }, 1000);
        setTimeout(() => { setActive(false) }, 1000);
    }

    // 선택된 해당 json데이터에 mission 키워드가 있는지 확인
    const hasMisson = modalDetailSelected.hasOwnProperty('mission');

    return (
        <StDiv>
            <StModalHeader>
                <StreleaseMarketBox>
                    <StIcon imgUrl={modalDetailSelected.releaseMarket.icon} />
                    <StrelName>{modalDetailSelected.releaseMarket.name}</StrelName>
                </StreleaseMarketBox>
                <button onClick={() => setModalState(false)}><FontAwesomeIcon icon={faXmark} /></button>
            </StModalHeader>
            <StModalBody>
                <StProductBox>
                    <StProductThumb imgUrl={modalDetailSelected.product.thumb} />
                    <ul>
                        <li>{modalDetailSelected.product.brandName}</li>
                        <li>{modalDetailSelected.product.name}</li>
                    </ul>
                </StProductBox>
                <dl>
                    <dt>제품코드</dt>
                    <dd className='bold' id='code'>
                        {modalDetailSelected.product.code}
                        <CopyBox><Copy onClick={copyHandler} />{copyActive && <BallonDiv active={active}>복사완료</BallonDiv>}</CopyBox>
                    </dd>
                </dl>
                <dl>
                    <dt>가격</dt>
                    <dd className='bold'>{modalDetailSelected.price}</dd>
                </dl>
                <dl>
                    <dt>공지 방법</dt>
                    <dd>{modalDetailSelected.method}</dd>
                </dl>
                <dl>
                    <dt>결제 방법</dt>
                    <dd>{modalDetailSelected.payMethod}</dd>
                </dl>
                <dl>
                    <dt>수령 방법</dt>
                    <dd>{modalDetailSelected.shippingMethod}</dd>
                </dl>
                <dl>
                    <dt>공식 채널</dt>
                    <StIconDiv>
                        {modalDetailSelected.releaseMarket.channels.map((channel) => (
                            <div key={uuid()}>
                                {channel.type === "instagram" && <a href={channel.link} target="_blank" rel="noreferrer"><Instagram /></a>}
                                {channel.type === "homepage" && <a href={channel.link} target="_blank" rel="noreferrer"><Icon /></a>}
                                {channel.type === "twitter" && <a href={channel.link} target="_blank" rel="noreferrer"><Twiter /></a>}
                                {channel.type === "kakaotalk" && <a href={channel.link} target="_blank" rel="noreferrer"><KaKao /></a>}
                            </div>
                        ))}
                    </StIconDiv>
                </dl>
            </StModalBody>
            {hasMisson &&
                    <StMissonBox>
                        <StMissonTitle>유의 사항</StMissonTitle>
                        {modalDetailSelected.uuid === detail7.uuid && <StP>{detail7.mission.split('\n').map((line) => (<span key={uuid()}>{line}<br /></span>))}</StP>}
                        {modalDetailSelected.uuid === detail4.uuid && <StP>{detail4.mission.split('\n').map((line) => (<span key={uuid()}>{line}<br /></span>))}</StP>}
                        {modalDetailSelected.uuid === detail5.uuid && <StP>{detail5.mission.split('\n').map((line) => (<span key={uuid()}>{line}<br /></span>))}</StP>}
                        {modalDetailSelected.uuid === detail6.uuid && <StP>{detail6.mission.split('\n').map((line) => (<span key={uuid()}>{line}<br /></span>))}</StP>}
                    </StMissonBox>
                }
            <StModlaBottom>
                {time - modalDetailSelected.closedTimestamp >= 0 ?
                    <a href={modalDetailSelected.url} target="_blank" rel="noreferrer"><button>종료</button></a>
                    :
                    <a href={modalDetailSelected.url} target="_blank" rel="noreferrer">
                        <button className='onLive'>
                            {modalDetailSelected.type === 0 && "선착순 구매하기"}
                            {modalDetailSelected.type === 1 && "응모 바로가기"}
                        </button>
                    </a>
                }
            </StModlaBottom>
        </StDiv>
    );
};

const StDiv = styled.div`
    width: 375px;
    height: 812px;
    background-color: #fff;
    position: relative;
`

const StModalHeader = styled.div`
    display: flex;
    align-items: center;
    button {
        border: none;
        background: transparent;
        font-size: 25px;
        cursor: pointer;
    }
    
`
const StreleaseMarketBox = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 0 auto;
`

const StIcon = styled.div<{ imgUrl: string }>` 
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${props => `url(${props.imgUrl})`};
    background-size: cover;
    background-position: center;
`

const StrelName = styled.div`
    font-size: 15px;
    font-weight: bold;
`

const StModalBody = styled.div`
    margin-top: 39px;
    dl {
        padding: 16px 0px;
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        border-top: 1px solid #E0E0E0;
        &:last-child {
            border-bottom: 1px solid #E0E0E0;
        }
        .bold {
            font-weight: bold;
        }
        #code {
            display: flex;
            gap: 5px;
        }
        dt {
            color: #666;
        }
    }
`

const CopyBox = styled.div`
    position: relative;
    width: 16px;
    cursor: pointer;
`

const BallonDiv = styled.div<{ active: boolean }>`
    position: absolute;
    width: 65px;
    height: 32px;
    line-height: 18px;
    bottom: 40px;
    left: -30px;
    background: #484848;
    color: #fff;
    border-radius: 5px;
    padding: 7px 12px;
    box-sizing: border-box;
    font-size: 10px;
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

const StProductBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    ul {
        margin-left: 12px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        li {
            line-height: 18px;
            font-size: 13px;
            &:first-child {
                font-weight: bold;
            }
        }
    }
`

const StProductThumb = styled.div<{ imgUrl: string }>`
    width: 48px;
    height: 48px;
    background: ${props => `url(${props.imgUrl})`};
    background-size: cover;
    background-position: center;
`
const StIconDiv = styled.div`
    display: flex;
    gap: 18px;
    svg {
        cursor: pointer;
    }
`

const StP = styled.p`
    width: 335px;
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    span {
        text-align: start;
    }
`

const StMissonBox = styled.div`
    margin-top: 12px;
`

const StMissonTitle = styled.div`
    font-size: 13px;
    color: #666;
    text-align: start;
    margin-bottom: 12px;
`

const StModlaBottom = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    button {
        padding: 12px;
        border: 1px solid #e0e0e0;
        background-color: transparent;
        width: 100%;
        font-size: 13px;
        cursor: pointer;
    }
    button.onLive {
        background-color: #ffca00;
    }
`

export default ModalDetail;