const members = require("./members");

const getOnline = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // result = [];
      // members.forEach((mem) => {
      //   if (mem.location === "online") {
      //     result.push(mem);
      //   }
      // });
      // resolve(result);

      resolve(members.filter(item => item.location === "online"))
    }, 500);
  });
};

const getOffline = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      result = [];
      members.forEach((mem) => {
        if (mem.location === "offline") {
          result.push(mem);
        }
      });
      resolve(result);
    }, 500);
  });
};

const getYB = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      result = [];
      members.forEach((mem) => {
        if (mem.group === "YB") {
          result.push(mem);
        }
      });
      resolve(result);
    }, 500);
  });
};

const getOB = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      result = [];
      members.forEach((mem) => {
        if (mem.group === "OB") {
          result.push(mem);
        }
      });
      resolve(result);
    }, 500);
  });
};

// resolve된 데이터가 자동으로 파라미터로 넘어갈 수 있다
getOnline(members).then(getOB).then(console.log);
getYB(members).then(getOffline).then(console.log);
