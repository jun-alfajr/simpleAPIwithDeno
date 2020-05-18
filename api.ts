import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// file: Model
interface Course {
  name: string;
  price: number;
  certification: boolean;
}

// file: Fata
let courses: Array<Course> = [
  { name: "PHP Bootcamp", price: 50, certification: true },
  { name: "JS Bootcamp", price: 70, certification: true },
  { name: "Ts Bootcamp", price: 90, certification: true },
  { name: "Python Bootcamp", price: 90, certification: true },
  { name: "Ruby Bootcamp", price: 90, certification: true },
  { name: "Golang Bootcamp", price: 90, certification: true },
];

// file: Controllers
export const getCourses = ({ response }: { response: any }) => {
  response.body = courses;
};

export const addCourses = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const course: Course = body.value;

  courses.push(course);
  response.body = { coursesAdded: "Success" };
  response.status = 200;
};

// file: server files
const router = new Router();
const app = new Application();
const PORT = 4300;

router.get("/learn", getCourses).post("/create", addCourses);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 4300 });
