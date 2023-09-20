// api.js
// API 호출을 관리하는 모듈
export const fetchWithToken = async (url, method, data) => {
    // 로컬 스토리지에서 저장된 JWT 토큰을 가져옵니다.
    const storedToken = localStorage.getItem('token');

    // 요청 헤더에 JWT 토큰을 포함합니다.
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': storedToken,
    };

    // 요청 옵션을 구성합니다.
    const options = {
        method, // HTTP 메서드 (예: 'GET', 'POST', 'PUT', 'DELETE' 등)
        headers, // 헤더 정보
        body: data ? JSON.stringify(data) : undefined, // 요청 본문 (데이터)
    };

    try {
        // API 호출을 수행하고 응답을 받아옵니다.
        const response = await fetch(url, options);

        // 응답이 성공적인지 확인합니다.
        if (!response.ok) {
            throw new Error('API 요청 실패');
        }

        // JSON 형식으로 파싱한 응답 데이터를 반환합니다.
        return response;
    } catch (error) {
        // 오류가 발생한 경우 오류를 던집니다.
        throw error;
    }
};