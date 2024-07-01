import fs from "fs/promises";
import cheerio from "cheerio";
import postgres from "./db.js";

const addLeadingZeros = (num) => {
  return String(num).padStart(6, "0");
};

(async () => {
  const file = await fs.readFile("contents.json");

  const posts = JSON.parse(file.toString())["post"] as string[];

  // let i = 1;
  // for (let post of posts) {
  //   const id = post.split("/")[2].split(".")[0];
  //   const newPath = post.replace(id, addLeadingZeros(i));
  //   await fs.rename(
  //     "/Users/phamvant/Coding/JavaScript/dreamhacker/back/contents/" + post,
  //     "/Users/phamvant/Coding/JavaScript/dreamhacker/back/contents/" + newPath,
  //   );
  //   i++;
  //   console.log(id);
  // }

  for (let post of posts) {
    const category = post.split("/")[1];

    const html = (
      await fs.readFile(
        "/Users/phamvant/Coding/JavaScript/dreamhacker/back/contents/" + post,
      )
    ).toString();

    const $ = cheerio.load(html);

    const title = $("h1.aTitle").text().trim();

    const ret = await postgres.query(
      `INSERT INTO public.post (title, link, category_id, is_scrap)
    VALUES
        (
            $1,
            $2,
            (SELECT id FROM category WHERE name = $3),
            TRUE
        )`,
      [title, post, category],
    );

    console.log(post);
  }
})();

// const main = async () => {
//   const file = await fs.readFile("test.json");

//   const posts = JSON.parse(file.toString())["posts"] as string[];

//   for (const post of posts) {
// const res = await awsBucket.send(
//   new GetObjectCommand({
//     Bucket: "dreamhacker",
//     Key: "scrap/" + post,
//   }),
// );

// // const readStream = res.Body.transformToWebStream();
// fs.writeFile("test.html", res.Body.transformToWebStream());

//     console.log(post);
//   }
// };

// main();
