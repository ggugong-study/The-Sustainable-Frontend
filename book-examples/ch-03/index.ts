/**
 * 예제 3.1
 * hello 함수 내부와 외부 스코프
 */
const outside = 10;

function hello() {
  const inside = 20;
  // ...
}

/**
 * 예제 3.2
 * 사용자 데이터와 이를 사용하는 여러 함수
 * NOTE: 하나의 데이터에 여러 함수가 직접 접근하는 구조를 흔히 볼 수 있다.
 */

const fetchUsers = () => {
  // 사용자 정보를 가져오는 코드

  /**
   * users의 데이터 구조
   * [
   *   { id: 1, name: "foo", email: "foo@bar.com" }
   *   // ...
   * ]
   */
  return users;
};

const users = fetchUsers();

// users를 사용하는 함수들
const specialUsers = users.filter(/* ... */);
const filteredUsers = filterUser(users);
const usersWithChecked = users.map(/* ... */);
sendMessage(users);

/**
 * 예제 3.3
 * 요구사항을 반영하기 위해 바꾼 users의 데이터 구조
 * NOTE: users의 구조가 바뀌면 여기에 의존하던 모든 함수를 수정해야 한다. 특히 filter,map처럼 데이터 구조에 강하게 결합된 함수를 사용하는 곳은 더 많은 수정과 꼼꼼한 검증이 필요하다.
 */
const fetchUsers = () => {
  // 사용자 정보를 가져오는 코드

  /**
   * 새로운 users의 데이터 구조
   * {
   *   totalCount: 20,
   *   isSorted: false,
   *   list: [
   *     { id: 1, name: 'foo', email: 'foo@bar.com' },
   *     // ...
   *   ]
   * }
   */
  return users;
};

/**
 * 예제 3.4
 * 즉시 실행 함수를 사용해 users 및 관련 로직을 캡슐화
 */

/**
 * @typeof {Object} UsersManager
 * @property {() => User[]} getUsers 사용자 목록을 반환합니다.
 * @property {() => { totalCount: number, isSorted: boolean, list: User[] }} getUsersWithMeta 사용자 목록을 반환하며, 추가적인 메타 정보를 포함합니다.
 * @property {() => User[]} getSpecialUsers 특별한 사용자 목록을 반환합니다.
 */

/** @type {UsersManager} */
const usersManager = (() => {
  const fetchUsers = () => {
    // 사용자 정보를 가져오는 코드
    // ...
    return users;
  };

  const privateUsers = fetchUsers();

  return {
    getUsers: () => [...privateUsers], // 메모리 주소를 외부에 그대로 넘기지 않도록 하기 위해 스프레드 연산자 사용
    getUsersWithMeta: () => {
      return {
        totalCount: privateUsers.length,
        isSorted: false,
        list: [...privateUsers],
      };
    },
    getSpecialUsers: () => privateUsers.filter(/* ... */),
    // ...
  };
})();
