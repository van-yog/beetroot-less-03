class Lessons {
  getAll() {
    return ["One", "Two"];
  }
}

class FileLessons extends Lesson {
  getAll() {
    return [1, 2, 3];
  }
}

class DbLessons extends Lessons {
  getAll() {
    return { one: "One", two: "Two" };
  }
}
