const members = [
  { name: "강한희", part: "Server", group: "OB" },
  { name: "고성용", part: "Server", group: "OB" },
  { name: "구건모", part: "Server", group: "YB" },
  { name: "권세훈", part: "Server", group: "YB" },
  { name: "김영권", part: "Server", group: "YB" },
  { name: "김은지", part: "Server", group: "YB" },
  { name: "김진욱", part: "Server", group: "YB" },
  { name: "김희빈", part: "Server", group: "OB" },
  { name: "남지윤", part: "Server", group: "YB" },
  { name: "문규원", part: "Server", group: "YB" },
  { name: "박나희", part: "Server", group: "OB" },
  { name: "박정현", part: "Server", group: "YB" },
  { name: "박현지", part: "Server", group: "OB" },
  { name: "변주현", part: "Server", group: "OB" },
  { name: "서호영", part: "Server", group: "OB" },
  { name: "설지원", part: "Server", group: "YB" },
  { name: "손시형", part: "Server", group: "YB" },
  { name: "안준영", part: "Server", group: "OB" },
  { name: "장서현", part: "Server", group: "OB" },
  { name: "오예원", part: "Server", group: "OB" },
  { name: "이다은", part: "Server", group: "OB" },
  { name: "이동근", part: "Server", group: "YB" },
  { name: "이솔", part: "Server", group: "OB" },
  { name: "이승헌", part: "Server", group: "YB" },
  { name: "이정은", part: "Server", group: "YB" },
  { name: "이제준", part: "Server", group: "YB" },
  { name: "정설희", part: "Server", group: "OB" },
  { name: "조윤서", part: "Server", group: "OB" },
  { name: "조재호", part: "Server", group: "YB" },
  { name: "조찬우", part: "Server", group: "YB" },
  { name: "주어진사랑", part: "Server", group: "YB" },
  { name: "주효식", part: "Server", group: "YB" },
  { name: "채정아", part: "Server", group: "OB" },
  { name: "최영재", part: "Server", group: "OB" },
  { name: "최유림", part: "Server", group: "YB" },
  { name: "최진영", part: "Server", group: "YB" },
  { name: "허유정", part: "Server", group: "YB" },
];

// 랜덤으로 섞기
members.sort(() => Math.random() - 0.5);

// group 기준으로 정렬
members.sort((a, b) => (a.group > b.group ? 1 : -1));
// console.log(members);

// OB 인원 수 카운트
let OB_count = 0;

members.forEach((m) => {
  if (m.group === "OB") {
    OB_count += 1;
  }
});

// console.log(OB_count);

// 전체 인원 수, YB 인원 수 카운트
const all_count = members.length;
const YB_count = all_count - OB_count;

// console.log(all_count);
// console.log(YB_count);

// 그룹 만드는 함수
// @param groupNum: 만들어야 하는 그룹 수
const makeGroup = (groupNum = 4) => {
  // 한 그룹에 들어가게 될 사람 수
  memberNum = parseInt(all_count / groupNum);
  // 남는 인원 수
  remainder = all_count % groupNum;

  // 한 그룹에 들어가게 될 OB 인원 수
  OB_num = parseInt(OB_count / groupNum);
  // 남는 OB 인원 수
  OB_remainder = OB_count % groupNum;

  // 한 그룹에 들어가게 될 YB 인원 수
  YB_num = parseInt(YB_count / groupNum);
  // 남는 YB 인원 수
  YB_remainder = YB_count % groupNum;

  // 그룹 수만큼 2차원 배열 만들어주기
  result = [];
  for (let i = 0; i < groupNum; i++) {
    result.push([]);
  }
  // console.log(result);

  // 각 그룹에 인원 넣어주기
  for (let i = 0; i < groupNum; i++) {
    // 각 그룹에 OB 넣어주기
    for (let j = 0; j < OB_num; j++) {
      // console.log(`OB idx: ${i * OB_num + j}`);
      result[i].push(members[i * OB_num + j]);
    }
    // 각 그룹에 YB 넣어주기
    for (let j = 0; j < YB_num; j++) {
      // console.log(`YB idx: ${OB_count + i * YB_num + j}`);
      result[i].push(members[OB_count + i * YB_num + j]);
    }
  }

  // 한 그룹에 1명씩 남은 OB 넣어주기
  for (let j = 0; j < OB_remainder; j++) {
    // console.log(`idx, mem: ${OB_count - 1 - j}, ${members[OB_count - 1 - j]}`);
    result[j].push(members[OB_count - 1 - j]);
  }

  // 한 그룹에 1명씩 남은 YB 넣어주기
  // 남은 OB 안 넣은 그룹에만 넣어주기
  for (let j = OB_remainder; j < YB_remainder + OB_remainder; j++) {
    // console.log(
    //   `idx, mem: ${all_count - 1 - j}, ${members[all_count - 1 - j]}`
    // );
    result[j].push(members[all_count - 1 - j]);
  }

  return result;
};

console.log(makeGroup(8));
