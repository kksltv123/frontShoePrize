import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import releasesInfo from '../../static/releases/413.json'
import ModalState from '../atom/ModalState';
import ReleasesProductId from '../atom/ReleasesProductId';


const ProductInfoReleases = () => {
    const releasesInfos = releasesInfo.results
    // 종료된 발매정보 더보기 5개씩 가져오기
    const [sliceNumTerminate, setSliceNumTerminate] = useState(5);
    // 진행중인 발매정보 더보기 5개씩 가져오기
    const [sliceNumRunnig, setSliceNumTerminateRunnig] = useState(5);

    // 현재시간 타임스탬프
    const time = Date.now();

    // 종료된 발매 리스트
    const notReleases = releasesInfos.filter((releasesInfo) => time - releasesInfo.closedTimestamp >= 0)
    // 진행중인 발매 리스트
    const releases = releasesInfos.filter((releasesInfo) => time - releasesInfo.closedTimestamp < 0)
    // 종료된 발매 리스트 5개씩 자르기
    const notReleasesTime = releasesInfos.filter((releasesInfo) => time - releasesInfo.closedTimestamp >= 0).slice(0, sliceNumTerminate)
    // 진행중인 발매 리스트 5개씩 자르기
    const releasesTime = releasesInfos.filter((releasesInfo) => time - releasesInfo.closedTimestamp < 0).slice(0, sliceNumRunnig)
    // 진행중, 종료 탭 토글 버튼 상태값
    const [toggle, setToggle] = useState(true)
    // 해당 uuid값의 모달창을 띄우기 위한 전역 상태값
    const [uuidJson, setUuidJson] = useRecoilState(ReleasesProductId);
    // 모달 조건부 렌더링 true일때 화면에 렌더링
    const [modalState, setModalState] = useRecoilState(ModalState);

    // toggle 값이 true일 때 active되고 진행중 발매 리스트 5개씩 가져옴
    const runningHandler = () => {
        document.getElementById('terminate')?.classList.remove('active');
        document.getElementById('running')?.classList.add('active');
        setToggle(true)
    }

    // toggle 값이 false일 때 active되고 종료된 발매 리스트 5개씩 가져옴
    const terminateHandler = () => {
        document.getElementById('running')?.classList.remove('active');
        document.getElementById('terminate')?.classList.add('active');
        setToggle(false)
    }

    // 종료된 발매리스트의 전체 길이가 sliceNumTerminate 보다 크면 sliceNumTerminate + 5
    // 리스트를 5개씩 더 가져온다
    const moreTerminatedDataHandler = () => {
        if(notReleases.length > sliceNumTerminate) {
            setSliceNumTerminate(sliceNumTerminate + 5)
        } else {
            return
        }
    }

    // 진행중인 발매리스트의 전체 길이가 sliceNumRunnig 보다 크면 sliceNumRunnig + 5
    // 리스트를 5개씩 더 가져온다
    const moreRunningDataHandler = () => {
        if(releases.length > sliceNumRunnig) {
            setSliceNumTerminateRunnig(sliceNumRunnig + 5)
        } else {
            return
        }
    }

    // 모달창을 띄우고 해당 데이터의 uuid 값을 전역 상태 관리
    const uuidHandler = (id: string) => {
        setUuidJson(id);
        setModalState(true);
    }




    return (
        <div>
            <StHeader>
                <div>
                    발매정보{releasesInfos.length}
                </div>
                <StButttonDiv>
                    <button id='running' className='active' onClick={runningHandler}>진행중</button>
                    <button id='terminate' onClick={terminateHandler}>종료</button>
                </StButttonDiv>
            </StHeader>
            {toggle ?
                <div>
                    {releasesTime.map((releasesTime) => (
                        <StReleasesBox key={releasesTime.id}>
                            <StThumbBox>
                                <StThumb imgUrl={releasesTime.releaseMarket.icon} />
                            </StThumbBox>
                            <StReleasesInfo>
                                <StNameDiv>
                                    {releasesTime.releaseMarket.name}
                                </StNameDiv>
                                <StTagBox>
                                    {releasesTime.isEvent ? <StTag>이벤트</StTag> : null}
                                    <StTag>{releasesTime.region}</StTag>
                                    <StTag>{releasesTime.shippingMethod}</StTag>
                                    <StTag>{releasesTime.method}</StTag>
                                </StTagBox>
                                <StButtton>
                                    {releasesTime.type === 0 ? "선착순" : "응모"}
                                </StButtton>
                            </StReleasesInfo>
                        </StReleasesBox>
                    ))}
                    {/* 발매리스트의 길이가 5보다 크면 더보기 버튼 렌더링  리스트의 길이가 sliceNumRunnig 보다 작아지면 숨기기*/}
                    {releases.length > 5 && releases.length > sliceNumRunnig && 
                    <StMoreButton onClick={moreRunningDataHandler}>더보기</StMoreButton>}
                </div>
                :
                <div>
                    {notReleasesTime.map((releasesTime) => (
                        <StReleasesBox key={releasesTime.id}>
                            <StThumb imgUrl={releasesTime.releaseMarket.icon} />
                            <StReleasesInfo>
                                <StNameDiv>
                                    {releasesTime.releaseMarket.name}
                                </StNameDiv>
                                <StTagBox>
                                    {releasesTime.isEvent ? <StTag>이벤트</StTag> : null}
                                    <StTag>{releasesTime.region}</StTag>
                                    <StTag>{releasesTime.shippingMethod}</StTag>
                                    <StTag>{releasesTime.method}</StTag>
                                </StTagBox>
                                <StButtton className='terminateButton' onClick={() => uuidHandler(releasesTime.uuid)}>
                                    종료
                                </StButtton>
                            </StReleasesInfo>
                        </StReleasesBox>
                    ))}
                    {notReleases.length > 5 && notReleases.length > sliceNumTerminate && 
                    <StMoreButton onClick={moreTerminatedDataHandler}>더보기</StMoreButton>}
                </div>
            }
        </div>
    );
};

const StHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #cdcdcd;
    margin-top: 24px;
    div {
        margin-top: 24px;
        font-size: 14px;
        font-weight: bold;
    }
    button {
        font-weight: bold;
        background: none;
        border: none;
        cursor: pointer;
        color: #959595;
        &:first-child {
            position: relative;
        }
        &:first-child::after {
            position: absolute;
            display: block;
            content: "";
            width: 1px;
            height: 14px;
            right: 0;
            top: 4px;
            background-color: #cdcdcd;
        }
    }
    button.active {
        color: #333;
    }
`

const StButttonDiv = styled.div`

`

const StReleasesBox = styled.div`
    width: 100%;
    display: flex;
    padding: 20px 0px 20px 0px;
    border-top: 1px solid #cdcdcd;
    align-items: center;
    justify-content: space-between;
    &:first-child {
        border-top: none;
    }
    button.terminateButton {
        color: #666;
    }
`

const StThumbBox = styled.div`
    width: 30%;
`

const StThumb = styled.div<{ imgUrl: string }>`
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: ${props => `url(${props.imgUrl})`};
    background-size: cover;
    background-position: center;
`

const StReleasesInfo = styled.div`
    width: 70%;
`

const StNameDiv = styled.div`
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 6px;
`

const StTagBox = styled.ul`
    display: flex;
    margin-bottom: 6px;
    gap: 10px;
`

const StTag = styled.li`
    font-size: 12px;
    height: 22px;
    line-height: 22px;
    background-color: #f4f4f4;
    padding: 2px 6px;
    align-items: center;
    border-radius: 100px;
`

const StButtton = styled.button`
    width: 100%;
    border: 1px solid #cdcdcd;
    background-color: transparent;
    cursor: pointer;
    font-size: 13px;
`

const StMoreButton = styled.button`
    width: 100%;
    line-height: 40px;
    background: transparent;
    border: 1px solid #666;
    cursor: pointer;
`

export default ProductInfoReleases;