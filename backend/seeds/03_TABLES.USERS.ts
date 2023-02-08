import type { Knex } from "knex";
import { hashPassword } from "../src/utils/hash";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("users").insert([
      {
        username: "lovepetuser01",
        email: "lovepetuser01@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-09-1997",
        gender: "female",
        is_experienced: false,
        fullname:"陳大文"
      },
      {
        username: "lovepetuser02",
        email: "lovepetuser02@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-09-1993",
        gender: "male",
        is_experienced: true,
        fullname:"陳小文"
      },
      {
        username: "lovepetuser03",
        email: "lovepetuser03@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-09-2005",
        gender: "female",
        is_experienced: true,
        fullname:"陳忠文"
      },
      {
        username: "lovepetuser04",
        email: "lovepetuser04@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-09-2001",
        gender: "male",
        is_experienced: true,
        fullname:"陳世文"
      },
      {
        username: "lovepetuser05",
        email: "lovepetuser05@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-09-1993",
        gender: "male",
        is_experienced: true,
        fullname:"陳細文"
      },
      {
        username: "lovepetuser06",
        email: "lovepetuser06@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-09-1899",
        gender: "male",
        is_experienced: true,
        fullname:"陳中文"
      },
      {
        username: "lovepetuser07",
        email: "lovepetuser07@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-09-1999",
        gender: "male",
        is_experienced: true,
        fullname:"陳英文"
      },
      {
        username: "lovepetuser08",
        email: "lovepetuser08@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-03-1999",
        gender: "male",
        is_experienced: true,
        fullname:"陳巨文"
      },
      {
        username: "lovepetuser09",
        email: "lovepetuser09@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-09-2004",
        gender: "female",
        is_experienced: true,
        fullname:"陳具文"
      },
      {
        username: "lovepetuser010",
        email: "lovepetuser10@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-03-1905",
        gender: "male",
        is_experienced: true,
        fullname:"陳思文"
      },
      {
        username: "lovepetuser11",
        email: "lovepetuser11@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "03-08-1991",
        gender: "male",
        is_experienced: true,
        fullname:"陳斯文"
      },
      {
        username: "lovepetuser12",
        email: "lovepetuser12@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-09-1989",
        gender: "female",
        is_experienced: true,
        fullname:"陳絲文"
      },
      {
        username: "lovepetuser13",
        email: "lovepetuser13@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-02-1999",
        gender: "female",
        is_experienced: true,
        fullname:"陳文"
      },
      {
        username: "lovepetuser14",
        email: "lovepetuser14@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-09-2001",
        gender: "female",
        is_experienced: true,
        fullname:"陳加文"
      },
      {
        username: "lovepetuser15",
        email: "lovepetuser15@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-04-1989",
        gender: "male",
        is_experienced: true,
        fullname:"陳嘉文"
      },
      {
        username: "lovepetuser16",
        email: "lovepetuser16@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-02-1989",
        gender: "female",
        is_experienced: true,
        fullname:"陳乘文"
      },
      {
        username: "lovepetuser17",
        email: "lovepetuser17@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-03-1992",
        gender: "female",
        is_experienced: true,
        fullname:"陳成文"
      },
      {
        username: "lovepetuser18",
        email: "lovepetuser18@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-02-1990",
        gender: "male",
        is_experienced: true,
        fullname:"陳承文"
      },
      {
        username: "lovepetuser19",
        email: "lovepetuser19@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "09-02-1991",
        gender: "male",
        is_experienced: true,
        fullname:"陳除文"
      },
      {
        username: "lovepetuser20",
        email: "lovepetuser20@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1991",
        gender: "female",
        is_experienced: true,
        fullname:"陳隨文"
      },
      {
        username: "lovepetuser21",
        email: "lovepetuser21@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳法文"
      },
      {
        username: "lovepetuser22",
        email: "lovepetuser22@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1993",
        gender: "female",
        is_experienced: true,
        fullname:"陳德文"
      },
      {
        username: "lovepetuser23",
        email: "lovepetuser23@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1992",
        gender: "male",
        is_experienced: true,
        fullname:"陳美文"
      },
      {
        username: "lovepetuser24",
        email: "lovepetuser24@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1991",
        gender: "female",
        is_experienced: true,
        fullname:"陳俄文"
      },
      {
        username: "lovepetuser25",
        email: "lovepetuser25@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳國文"
      },
      {
        username: "lovepetuser26",
        email: "lovepetuser26@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳日文"
      },
      {
        username: "lovepetuser27",
        email: "lovepetuser27@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳手文"
      },
      {
        username: "lovepetuser28",
        email: "lovepetuser28@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳田文"
      },
      {
        username: "lovepetuser29",
        email: "lovepetuser29@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳水文"
      },
      {
        username: "lovepetuser30",
        email: "lovepetuser30@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳口文"
      },
      {
        username: "lovepetuser31",
        email: "lovepetuser31@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳廿文"
      },
      {
        username: "lovepetuser32",
        email: "lovepetuser32@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳卜文"
      },
      {
        username: "lovepetuser33",
        email: "lovepetuser33@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳山文"
      },
      {
        username: "lovepetuser34",
        email: "lovepetuser34@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳戈文"
      },
      {
        username: "lovepetuser35",
        email: "lovepetuser35@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1995",
        gender: "female",
        is_experienced: true,
        fullname:"陳戈文"
      },
      {
        username: "lovepetuser36",
        email: "lovepetuser36@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-1895",
        gender: "female",
        is_experienced: true,
        fullname:"陳人文"
      },
      {
        username: "lovepetuser37",
        email: "lovepetuser37@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "10-02-1997",
        gender: "female",
        is_experienced: true,
        fullname:"陳心文"
      },
      {
        username: "lovepetuser38",
        email: "lovepetuser38@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "06-12-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳木文"
      },
      {
        username: "lovepetuser39",
        email: "lovepetuser39@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "05-06-1898",
        gender: "female",
        is_experienced: true,
        fullname:"陳火文"
      },
      {
        username: "lovepetuser40",
        email: "lovepetuser40@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "11-05-1891",
        gender: "female",
        is_experienced: true,
        fullname:"陳土文"
      },
      {
        username: "lovepetuser41",
        email: "lovepetuser41@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-09-2003",
        gender: "female",
        is_experienced: true,
        fullname:"陳竹文"
      },
      {
        username: "lovepetuser42",
        email: "lovepetuser42@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "11-04-1993",
        gender: "female",
        is_experienced: true,
        fullname:"陳十文"
      },
      {
        username: "lovepetuser43",
        email: "lovepetuser43@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-02-2001",
        gender: "female",
        is_experienced: true,
        fullname:"陳難文"
      },
      {
        username: "lovepetuser44",
        email: "lovepetuser44@gmail.com",
        password: await hashPassword("123456"),
        mobile: "12345678",
        birthday: "01-08-2003",
        gender: "female",
        is_experienced: true,
        fullname:"陳金文"
      },
      {
        username: "kennethccw",
        email: "kennethccw@gmail.com",
        password: await hashPassword("abc12345678!"),
        mobile: "12345678",
        birthday: "17-10-1998",
        gender: "male",
        is_experienced: true,
        created_at: new Date("2023-01-01"),
        fullname:"陳月文"
      },
    ]);
    await trx.commit();
  } catch (e) {
    console.log(e);
    await trx.rollback();
  }
}
