import { useEffect } from "react";

const LifeCycleLogger = () => {
    useEffect(() => {
        console.log("렌더링 완료!")
    }, [])
    
    return <div>컴포넌트 테스트 중</div>
}

export default LifeCycleLogger