// 신청 여부에 따라 다른 UI를 렌더링하고 신청할 수 있는 버튼이 있는 컴포넌트
type MemberType = "teacher" | "student" | "parent";

const PostDetail = ({
  postId,
  memberType,
  registered: initialRegistered,
}: {
  postId: number;
  memberType: MemberType;
  registered: boolean;
}) => {
  const [registered, setRegistered] = useState(initialRegistered);
  const handleRegister = async () => {
    const response = await fetch(
      `https://example.com/post/${postId}/register`,
      {
        method: "POIST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ memberType }),
      },
    )
      .then((res) => res.json())
      .catch((error) => console.error(error));

    if (response.ok) {
      setRegistered(true);
    } else {
      alert("신청에 실패했습니다.");
    }
  };

  return (
    <div>
      {
        // ...
      }
    </div>
  );
};

// 함수로 분리한 API 요청 코드
const register = async (
  postId: number,
  memberType: MemberType,
): Promise<boolean> => {
  const response = await fetch(`https://example.com/post/${postId}/register`, {
    method: "POIST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ memberType }),
  })
    .then((res) => res.json())
    .catch((error) => console.error(error));

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

const PostDetail = ({
  postId,
  memberType,
  registered: initialRegistered,
}: {
  postId: number;
  memberType: MemberType;
  registered: boolean;
}) => {
  const [registered, setRegistered] = useState(initialRegistered);
  const handleRegister = async () => {
    const response = await register(postId, memberType);

    if (response) {
      setRegistered(true);
    } else {
      alert("신청에 실패했습니다.");
    }
  };

  return (
    <div>
      {
        // ...
      }
    </div>
  );
};

// register 함수의 인터페이스를 유지하고 구현을 변경
const register = async (
  postId: number,
  memberType: MemberType,
): Promise<boolean> => {
  return Promise.resolve(true);
};

// API 요청 함수를 외부에서 주입받음
const PostList = () => {
  // ...
  return (
    <div>
      {/* ... */}
      <PostDetail
        postId={id}
        memberType="student"
        registered={false}
        registerApi={register}
      />
      {/* ... */}
    </div>
  );
};

const PostDetail = ({
  postId,
  memberType,
  registered: initialRegistered,
  registerApi: register,
}: {
  postId: number;
  memberType: MemberType;
  registered: boolean;
  registerApi: (postId: number, memberType: MemberType) => Promise<boolean>;
}) => {
  const [registered, setRegistered] = useState(initialRegistered);
  const handleRegister = async () => {
    const response = await registerApi(postId, memberType);

    if (response) {
      setRegistered(true);
    } else {
      alert("신청에 실패했습니다.");
    }
  };

  return <div>{/* ... */}</div>;
};
