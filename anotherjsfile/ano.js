

const publishedIn = new Date("11/1/2022");
const formattedDate = publishedIn.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const message = `This article was published on ${formattedDate}.`;
console.log(message);