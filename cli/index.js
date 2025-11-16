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
    baseDir: path.join(projectRoot, "src/content/blogs"),
    frontmatter: blogFrontmatter,
  },
  event: {
    prompts: [{ name: "name", message: "Event name:" }],
    baseDir: path.join(projectRoot, "src/content/events"),
    frontmatter: eventFrontmatter,
  },
};

async function promptForUniqueEventName(eventsDir) {
  while (true) {
    const { name } = await inquirer.prompt([
      { name: "name", message: "Event name:" },
    ]);
    const slug = slugify(name, { lower: true, strict: true });
    const eventFolder = path.join(eventsDir, slug);
    if (!(await fs.pathExists(eventFolder))) {
      return { name, slug };
    }
    console.log(`Event "${name}" already exists. Choose another name.`);
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
    const blogFolder = path.join(blogsDir, slug);
    if (!(await fs.pathExists(blogFolder))) {
      return { title, name, author, slug };
    }
    console.log(`Blog "${title}" already exists. Choose another name.`);
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
    const res = await promptForUniqueEventName(details.baseDir);
    answers = { name: res.name };
    slug = res.slug;
  } else {
    const blog = await promptForUniqueBlogName(details.baseDir);
    answers = blog;
    slug = blog.slug;
  }

  const destFolder = path.join(details.baseDir, slug);
  await fs.ensureDir(destFolder);

  const coverSrc = path.join(projectRoot, "cli", "cover.png");
  const coverDest = path.join(destFolder, "cover.png");
  await fs.copyFile(coverSrc, coverDest);

  const mdPath = path.join(destFolder, "index.md");

  const fm = details.frontmatter({
    ...answers,
    slug,
    date: currDate,
  });

  await fs.writeFile(mdPath, fm);

  console.log(`✅ Added ${type} "${answers.name}" at: ${mdPath}`);
}

main().catch(() => process.exit(1));
