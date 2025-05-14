type UserRoll = "teacher" | "student";

interface User {
  name: string;
  email: string;
  password: string;
  roll: UserRoll;
  login(email: string, password: string): void;
}

interface Teacher extends User {
  subject: string;
}

interface Student extends User {
  grade: number;
}

const user: Teacher = {
  name: "Juan",
  email: "juan@nucba.com",
  password: "123",
  roll: "teacher",
  subject: "Math",
  login(email: string, password: string) {
    if (email === this.email && password === this.password) {
      console.log("Login");
    } else {
      console.log("Login failed");
    }
  },
};

const student: Student = {
  name: "Juan",
  email: "juan@nucba.com",
  password: "123",
  roll: "student",
  grade: 1,
  login(email: string, password: string) {
    if (email === this.email && password === this.password) {
      console.log("Login");
    } else {
      console.log("Login failed");
    }
  },
};

student.login("juan@nucba.com", "123");
