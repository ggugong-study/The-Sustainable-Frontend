# The Sustainable Frontend - Study Workspace

지속 가능한 프런트엔드 엔지니어링 학습을 위한 문서 중심 저장소입니다.

## 목적

- 도서 내용을 장 단위로 정리한다.
- 문제를 1개씩 풀고 풀이 과정을 기록한다.
- 누적 기록을 검색 가능한 형태로 유지한다.

## 디렉터리 구조

- `docs/book-notes/`: 장별 독서 노트
- `docs/problems/`: 문제별 풀이 기록
- `templates/`: 재사용 문서 템플릿

## 사용 순서

1. `templates/chapter-note.template.md`를 복사해 장 노트를 작성한다.
2. `templates/problem-solving.template.md`를 복사해 문제 풀이를 작성한다.
3. 파일명 규칙을 지킨다.
   - 장 노트: `ch-01.md`, `ch-02.md`
   - 문제 풀이: `p-001.md`, `p-002.md`

## 문서 작성 규칙

- 문서 상단에 YAML 메타데이터를 유지한다.
- 상태 값은 `todo`, `doing`, `done` 중 하나를 사용한다.
- 장 노트는 개념 요약과 실무 적용 관점을 함께 기록한다.
- 문제 풀이는 정답뿐 아니라 오답 원인과 재도전 조건을 기록한다.

## 인덱스

### Book Notes

- [Chapter 01](docs/book-notes/ch-01.md)

### Problems

- [Problem 001](docs/problems/p-001.md)
