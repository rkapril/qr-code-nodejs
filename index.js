/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      name: "url",
      message: "Enter your url",
      type: "input",
    },
  ])
  .then(function (answer) {
    fs.writeFile("URL.txt", answer.url, (err) => {
      if (err) throw err;
      console.log("The details has been saved!");
      qr.image(answer.url, { type: "png" }).pipe(
        fs.createWriteStream("qr_img.png").on("finish", () => {
          console.log("QR Code created.");
        })
      );
    });
  });
