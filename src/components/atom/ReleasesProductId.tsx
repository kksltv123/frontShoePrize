import { atom } from "recoil";

// 버튼 클릭시 해당 uuid로 상태값 변경
const ReleasesProductId = atom({
    key: "releasesProductIdState",
    default: '6ce0a858-898c-4a22-a02c-196ac6cb87e5'
})

export default ReleasesProductId