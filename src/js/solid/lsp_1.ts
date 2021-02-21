interface LessonRepository {
  getAll: () => string[]
}


class Lessons implements LessonRepository {
  getAll() {
    return ["One", "Two"];
  }
}

class FileLessons implements LessonRepository {
  readFile() {
    return ["1", "2", "3"]
  }
  getAll(): string[] {
    const out = this.readFile();
    return out;
  }
}

class DbLessons implements LessonRepository {
  fetchAll() {
    return ['one', 'tow'];
  }
  getAll() {
    return this.fetchAll();
  }
}
