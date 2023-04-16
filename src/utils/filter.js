import checkType from "./checkType";

const filter = (filterForType, users) => {
    switch (filterForType) {
      case "admin":
        return users.filter((user) => checkType(user.type) === 66);
      case "service":
        return users.filter((user) => checkType(user.type) === 14);
      case "standard":
        return users.filter((user) => checkType(user.type) === 21);
      default:
        break;
    }
  };

export default filter