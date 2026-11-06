import { test, expect } from "@playwright/test";
import path from "path";

// let page;
// let context;
let URL = "https://testautomationpractice.blogspot.com/";

// test.beforeAll(async ({ browser }) => {
//     context = await browser.newContext();
//     page = await context.newPage();
//     await page.goto(URL);
// });

test("dropdown", async ({page}) => {
    await page.goto(URL)
    const countryDropdown = await page.getByRole('combobox', { name: 'Country' });
    await countryDropdown.scrollIntoViewIfNeeded();
    await countryDropdown.selectOption({index: 3});

    await page.waitForLoadState("domcontentloaded");
    await page.screenshot({path:`reports/dropdown_${Date.now()}.png`})
});

test("jsalert",async({page})=>{
        await page.goto(URL)
        page.on("dialog", async dialog=>{
            if (dialog.type() === "prompt") {
                await dialog.accept("Akshay B");
            } 
            else if (dialog.type() === "confirm") {
                await dialog.accept();
            }
    })
   
    // let alertButton=page.getByRole("button",{name:"Simple Alert"})
    // let alertButton=page.getByRole("button",{name:"Confirmation Alert"})
    let alertButton=page.getByRole("button",{name:"Prompt Alert"})
    // await alertButton.scrollIntoViewIfNeeded();
    await alertButton.click();
    // await page.waitForTimeout(3000);
    // expect(page.locator('p[id="demo"]')).toContainText("OK",{timeout:3000})
   let value=await page.locator('#demo').innerText()
    // expect(page.locator('#demo')).toContainText("Akshay",{timeout:3000})
    expect(value).toContain("Akshay")
    console.log(value)
})


test("frames", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/nested_frames");
    const topFrame = page.frameLocator('frame[name="frame-top"]');
    const middleFrame = topFrame.frameLocator('frame[name="frame-middle"]');
    const text = await middleFrame.locator('body').innerText();
    expect(text).toBe("MIDDLE");
    console.log(text);
});


test("upload files",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForLoadState('domcontentloaded');

    // let filelocator=page.locator("#singleFileInput");
    let filelocator=page.locator("#multipleFilesInput");
    await filelocator.scrollIntoViewIfNeeded();
    const filepath1=path.join(__dirname,"../test2.js")
    const filepath2 = path.join(__dirname, "../test2.js");
    // console.log(filepath)
    await filelocator.setInputFiles([filepath1, filepath2]);
      await page.waitForLoadState('networkidle');
})


test("download files",async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/download");
    await page.waitForLoadState('domcontentloaded');

     const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByText("textfile.txt").click()
    ]);

    // let downloadPromise=page.waitForEvent('download');
    // await page.getByText("not_empty.txt").click();
    // let download=await downloadPromise;
    let downloadPath=await download.path();
    const filepath1=path.join(__dirname,"../",download.suggestedFilename())
    download.saveAs(filepath1);
    console.log(downloadPath)
})





// test.afterAll(async () => {
//     await context.close();
// });