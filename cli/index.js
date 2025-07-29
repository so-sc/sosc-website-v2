import inquirer from "inquirer";
import slugify from "slugify";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { blogFrontmatter, eventFrontmatter } from "./template.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getCurrentDate = () => new Date().toISOString().slice(0, 10);
const projectRoot = path.resolve(__dirname, "..");

const typeDetails = {
  blog: {
    prompts: [
      { name: "name", message: "Blog name:" },
      { name: "author", message: "Author:" },
    ],
    publicDir: path.join(projectRoot, "public/content/blogs"),
    srcDir: path.join(projectRoot, "src/content/blogs"),
    frontmatter: blogFrontmatter,
  },
  event: {
    prompts: [{ name: "name", message: "Event name:" }],
    publicDir: path.join(projectRoot, "public/content/events"),
    srcDir: path.join(projectRoot, "src/content/events"),
    frontmatter: eventFrontmatter,
  },
};

async function promptForUniqueEventName(eventsDir) {
  while (true) {
    const { name } = await inquirer.prompt([
      { name: "name", message: "Event name:" },
    ]);
    const slug = slugify(name, { lower: true, strict: true });
    const eventMd = path.join(eventsDir, `${slug}.md`);
    if (!(await fs.pathExists(eventMd))) {
      return { name, slug };
    }
    console.log(
      `An event with the name "${name}" (slug: "${slug}") already exists. Please choose another name.`
    );
  }
}

async function promptForUniqueBlogName(blogsDir) {
  while (true) {
    const { title, name, author } = await inquirer.prompt([
      { name: "title", message: "Blog name:" },
      { name: "name", message: "Name:" },
      { name: "author", message: "Username:" },
    ]);
    const slug = slugify(title, { lower: true, strict: true });
    const blogMd = path.join(blogsDir, `${slug}.md`);
    if (!(await fs.pathExists(blogMd))) {
      return { title, name, author, slug };
    }
    console.log(
      `A blog with the name "${title}" (slug: "${slug}") already exists. Please choose another name.`
    );
  }
}

async function main() {
  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Add blog or event?",
      choices: ["blog", "event"],
    },
  ]);

  let answers, slug;
  const currDate = getCurrentDate();
  const details = typeDetails[type];

  if (type === "event") {
    const { name, slug: eventSlug } = await promptForUniqueEventName(
      details.srcDir
    );

    answers = { name };
    slug = eventSlug;
  } else {
    const blog = await promptForUniqueBlogName(details.srcDir);
    answers = blog;
    slug = blog.slug;
  }

  const destFolder = path.join(details.publicDir, slug);
  await fs.ensureDir(destFolder);

  const coverSrc = path.join(projectRoot, "cli", "cover.png");
  const coverDest = path.join(destFolder, "cover.png");
  await fs.copyFile(coverSrc, coverDest);

  const srcMd = path.join(details.srcDir, `${slug}.md`);
  await fs.ensureDir(details.srcDir);
  const fm = details.frontmatter({
    ...answers,
    slug,
    date: currDate,
  });
  await fs.writeFile(srcMd, fm);

  console.log(
    `✅ Added ${type} "${answers.name}" at:\n - ${destFolder}\n - ${srcMd}`
  );
}

main().catch(() => {
  process.exit(1);
});
