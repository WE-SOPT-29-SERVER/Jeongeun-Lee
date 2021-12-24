# level 2: Image Resize
- 원본: https://firebasestorage.googleapis.com/v0/b/wesopt29-463f2.appspot.com/o/20211224_232803_51636950667.png?alt=media&token=a7198acf-2bd3-4a1a-96f8-47153c082c05
- resize: https://firebasestorage.googleapis.com/v0/b/wesopt29-463f2.appspot.com/o/20211224_232803_51636950667_200x200.png?alt=media&token=1d215cff-d508-4e78-be50-2750090b851e

![image](https://user-images.githubusercontent.com/42895142/147366731-d8936212-0afb-47e1-97b9-cd51f8eaf3f1.png)
좌측이 원본 이미지

# level 3: Refresh Token
참고: https://tansfil.tistory.com/59
- Access Token의 문제점
    + 유요기간이 길면 탈취당했을 때 보안에 취약
    + 유효기간이 짧으면 로그인을 자주 해야함
- Refresh Token
    + Access Token과 함께 발급
    + 유효기간이 길다
    + Refresh Token이 있다면 다시 Access Token 발급 가능
    + 보통 2주로 많이 한다
- 구동 방식
    1. 처음 로그인할 때 Access Token과 Refresh Token 모두 발급
    2. 서버는 Refresh Token을 DB에 저장
    3. 사용자는 Access Token만 헤더에 실어 요청을 보냄
    4. Access Token이 만료되면 사용자는 Refresh Token과 Access Token을 함께 서버로 보냄
    5. 서버는 다음 내용을 확인하고 통과하면 새로운 Access Token 발급
        + Access Token이 조작되지 않았는지
        + 사용자가 보낸 Refresh Token과 DB의 Refresh Token이 같은지
        + Refresh Token의 유효기간이 지나지 않았는지
