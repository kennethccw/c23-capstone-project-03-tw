import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("activities").insert([
      {
        name: "平面設計師或攝影師義工",
        type: "editors_choice",
        image: "photos/activities/editor_choice/image-marketing2.png",
        description:
          "不定期設計活動或領養海報，天下貓狗一樣是可愛貓狗，展示出他們有趣一面為他們尋家",
        date: new Date("2023/03/05"),
        start_time: new Date("2023/03/05 14:00"),
        end_time: new Date("2023/03/05 18:30"),
        requirement: "無需經驗，有心就事成",
        district: "kowloon",
        location: "香港旺角駱克道三號",
        total_place: 5,
        remaining_place: 2,
        fee: 0,
        organisation_id: 4,
      },
      {
        name: "場內清潔義工 (大量)",
        type: "urgent",
        image: "photos/activities/urgent/image-urgent7.jpeg",
        description:
          "每天都需要義工幫忙清潔，特別是平日，希望大家到場幫忙之餘，親親一班無家的毛孩，近距離接觸，讓牠們受到關懷。清潔狗舍 (清理大小便、更換清潔水兜、添加飲用水和狗糧)清理執拾場內物資 (搬狗糧、添糧筒、整理場內物品、清潔風扇、狗床)",
        date: new Date("2023/03/10"),
        start_time: new Date("2023/03/10 11:00"),
        end_time: new Date("2023/03/10 13:00"),
        requirement: "刻苦耐勞，唔怕擔擔抬抬",
        district: "hong_kong_island",
        location: "香港灣仔中心 (總部)",
        total_place: 5,
        remaining_place: 5,
        fee: 0,
        organisation_id: 1,
      },
      {
        name: "梳毛及剪甲義工",
        type: "urgent",
        image: "photos/activities/urgent/image3.png",
        description: "為毛小孩扮靚靚，讓牠們快快找個好人家",
        date: new Date("2023/02/25"),
        start_time: new Date("2023/02/25 14:00"),
        end_time: new Date("2023/02/25 18:30"),
        requirement: "有信心照顧小動物及有寵物美容知識的經驗人士",
        district: "new_territories",
        location: "新界屯門屏山鄉后海灣濱",
        total_place: 8,
        remaining_place: 8,
        fee: 0,
        organisation_id: 2,
      },
      {
        name: "活動義工",
        type: "popular",
        image: "photos/activities/popular/image-popular1.jpeg",
        description:
          "不定期成為Event Helper用行動為被遺棄、被虐待、被遺忘的一群找個家 (活動：領養日、義賣日、活動日、教育講座、慈善活動,領養人講座)",
        date: new Date("2023/02/12"),
        start_time: new Date("2023/02/12 11:00"),
        end_time: new Date("2023/02/12 14:00"),
        requirement: "無需經驗，有心就事成",
        district: "hong_kong_island",
        location: "香港灣仔中心 (總部)",
        total_place: 10,
        remaining_place: 10,
        fee: 0,
        organisation_id: 3,
      },
      {
        name: "領養日",
        type: "popular",
        image: "photos/activities/popular/image-popular2.jpeg",
        description: "歡迎愛狗人士參與我們的領養日，請大家支持領養，代替購買。",
        date: new Date("2023/02/12"),
        start_time: new Date("2023/02/12 11:00"),
        end_time: new Date("2023/02/12 13:00"),
        requirement: "無需經驗，有心就事成",
        district: "new_territories",
        location: "新界屯門屏山鄉后海灣濱",
        total_place: 10,
        remaining_place: 10,
        fee: 0,
        organisation_id: 3,
      },
      {
        name: "義賣日",
        type: "popular",
        image: "photos/activities/urgent/image-urgent1.png",
        description:
          "義賣日活動所籌得之善款，將撥捐「流浪動物醫療基金」作為社區流浪動物福利之慈善用途。",
        date: new Date("2023/02/18"),
        start_time: new Date("2023/02/18 12:00"),
        end_time: new Date("2023/02/18 18:30"),
        requirement: "無需經驗，有心就事成",
        district: "new_territories",
        location: "新界元朗僑興路白沙村第一段",
        total_place: 12,
        remaining_place: 12,
        fee: 0,
        organisation_id: 4,
      },
      {
        name: "領養人講座",
        type: "urgent",
        image: "photos/activities/urgent/image-urgent2(1).jpeg",
        description: "過往 / 現在的領養人士分享關於領養寵物的心得以及領養寵物需要注意的事項。",
        date: new Date("2023/03/25"),
        start_time: new Date("2023/03/25 11:00"),
        end_time: new Date("2023/03/25 13:00"),
        requirement: "無需經驗，有心就事成",
        district: "new_territories",
        location: "新界屯門屏山鄉后海灣濱",
        total_place: 10,
        remaining_place: 10,
        fee: 0,
        organisation_id: 4,
      },
      {
        name: "公關犬大使",
        type: "editors_choice",
        image: "photos/activities/urgent/image-urgent2.jpeg",
        description:
          "公關犬大使”，從前都是被主人放棄飼養的家犬，牠們剛進入動物收容中心的時候，都曾表現徬徨及悲傷，幸得我們員工的悉心照料及義工的關愛， 這些曾被棄養的公關犬大使，當重新感受到愛的關愛，牠們放下了從前被遺棄的傷痛，用“愛”為市民帶來相聚的歡樂，用“愛”提醒我們要學習珍惜生命。",
        date: new Date("2023/03/04"),
        start_time: new Date("2023/03/04 11:00"),
        end_time: new Date("2023/03/04 14:00"),
        requirement: "無需經驗，有心就事成",
        district: "kowloon",
        location: "香港旺角駱克道三號",
        total_place: 6,
        remaining_place: 6,
        fee: 0,
        organisation_id: 4,
      },
      {
        name: "捉貓義工 pm",
        type: "urgent",
        image: "photos/activities/urgent/image-urgent4.png",
        description: "捕捉、絕育、放回",
        date: new Date("2023/02/25"),
        start_time: new Date("2023/02/25 18:30"),
        end_time: new Date("2023/02/25 22:30"),
        requirement: "刻苦耐勞，唔怕擔擔抬抬，唔怕夜間活動，明白捕捉野貓會有被抓傷或咬傷機會",
        district: "kowloon",
        location: "香港灣仔中心 (總部)",
        total_place: 10,
        remaining_place: 10,
        fee: 0,
        organisation_id: 4,
      },
      {
        name: "捉狗義工 pm",
        type: "urgent",
        image: "photos/activities/urgent/image-urgent3.jpeg",
        description: "捕捉、絕育、放回",
        date: new Date("2023/03/04"),
        start_time: new Date("2023/03/04 18:30"),
        end_time: new Date("2023/03/04 22:30"),
        requirement: "刻苦耐勞，唔怕擔擔抬抬，唔怕夜間活動，明白捕捉野貓會有被抓傷或咬傷機會",
        district: "kowloon",
        location: "香港旺角駱克道三號",
        total_place: 10,
        remaining_place: 10,
        fee: 0,
        organisation_id: 4,
      },
      {
        name: "Marketing義工",
        type: "editors_choice",
        image: "photos/activities/editor_choice/image-marketing1.jpg",
        description: "與其他義工一起策劃活動及推廣事宜，為毛小孩找個快樂的家",
        date: new Date("2023/02/12"),
        start_time: new Date("2023/02/12 11:00"),
        end_time: new Date("2023/02/12 14:00"),
        requirement: "創意無限",
        district: "new_territories",
        location: "新界屯門屏山鄉后海灣濱",
        total_place: 10,
        remaining_place: 10,
        fee: 0,
        organisation_id: 2,
      },
    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}
