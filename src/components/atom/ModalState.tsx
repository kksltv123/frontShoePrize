import { atom } from "recoil";

// 모달 조건부 렌더링 상태 전역 관리
const ModalState = atom({
    key: "ModalState",
    default: false
})

export default ModalState