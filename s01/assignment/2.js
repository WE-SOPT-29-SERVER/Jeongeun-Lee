// 남지윤 22 술 공덕
// 이승헌 23 게임 광흥창
// 이정은 23 게임 숙대입구
// 최진영 22 산책 극락

team = [
  {
    name: "남지윤",
    location: "공덕",
    age: 22,
    hobby: "술",
  },
  {
    name: "이승헌",
    location: "광흥창",
    age: 23,
    hobby: "게임",
  },
  {
    name: "이정은",
    location: "숙대입구",
    age: 23,
    hobby: "게임",
  },
  {
    name: "최진영",
    location: "극락",
    age: 22,
    hobby: "산책",
  },
];

const introduce = () => {
  team.forEach((mem) =>
    console.log(
      `${mem.name}씨의 사는 곳은 ${mem.location}이며 나이는 ${mem.age}세이고 취미는 ${mem.hobby}입니다.`
    )
  );
};

introduce();
