import { test, expect } from "@playwright/test";
import path from "path";
import logger from "../logger.js"

// let page;
// let context;
let URL = "https://testautomationpractice.blogspot.com/";

// test.beforeAll(async ({ browser }) => {
//     context = await browser.newContext();
//     page = await context.newPage();
//     await page.goto(URL);
// });

test("dropdown", async ({ page }) => {
    await page.goto(URL)
    const countryDropdown = await page.getByRole('combobox', { name: 'Country' });
    await countryDropdown.scrollIntoViewIfNeeded();
    await countryDropdown.selectOption({ label: "France" });
    // await countryDropdown.selectOption({ value: "france"});
    // await countryDropdown.selectOption({ index: 3 });

    await page.waitForLoadState("domcontentloaded");
    await page.screenshot({ path: `reports/dropdown_${Date.now()}.png` })
});

test("@d1 multiple dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    let dropdown = page.locator("#colors")
    dropdown.scrollIntoViewIfNeeded();
    await dropdown.selectOption(["Red", "Green", "yellow"])
    await page.waitForLoadState("networkidle");
})

test("@d2 multiple dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    let dropdown = page.locator("#animals")
    dropdown.scrollIntoViewIfNeeded();
    await dropdown.selectOption([{ label: "Cat" }, { value: "dog" }, { index: 1 }])
    await page.waitForLoadState("networkidle");
})

test("@c1 checkbox", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    let checkbox = page.locator("#saturday")
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.check();
    await page.waitForLoadState("networkidle");
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
})

test("@c2 multiple checkbox", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    //  await checkbox.scrollIntoViewIfNeeded();
    const days = ['monday', 'wednesday', 'friday'];

    for (const day of days) {
        await page.locator(`#${day}`).check();
        expect(page.locator(`#${day}`)).toBeChecked();
    }
    await page.waitForLoadState("networkidle");
})

test("@c3 multiple checkbox", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const values = page.locator('input.form-check-input[type="checkbox"]');

    const countValues = await values.count();
    console.log(`Total checkboxes found: ${countValues}`);

    for (let i = 0; i < countValues; i++) {
        const checkbox = values.nth(i);

        await checkbox.scrollIntoViewIfNeeded();
        await checkbox.check();
        expect(checkbox).toBeChecked();
        // const value = await checkbox.getAttribute('value');
        // console.log(value);
    }
    page.waitForLoadState("domcontentloaded");
});

test("jsalert", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    page.on("dialog", async dialog => {
        if (dialog.type() === "prompt") {
            await dialog.accept("Akshay B");
        }
        else if (dialog.type() === "confirm") {
            await dialog.accept();
        }
    })

    // let alertButton=page.getByRole("button",{name:"Simple Alert"})
    // let alertButton=page.getByRole("button",{name:"Confirmation Alert"})
    let alertButton = page.getByRole("button", { name: "Prompt Alert" })
    // await alertButton.scrollIntoViewIfNeeded();
    await alertButton.click();
    // await page.waitForTimeout(3000);
    // expect(page.locator('p[id="demo"]')).toContainText("OK",{timeout:3000})
    let value = await page.locator('#demo').innerText()
    // expect(page.locator('#demo')).toContainText("Akshay",{timeout:3000})
    expect(value).toContain("Akshay")
    console.log(value)
})


test("radio button", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    let radioButton = page.locator("#female")
    await radioButton.scrollIntoViewIfNeeded();
    await radioButton.check();
    await page.waitForLoadState("networkidle");
    await expect(radioButton).toBeChecked();
    console.log(`Radio button checked: ${await radioButton.isChecked()}`);
})


test("@dd1 Drag and Drop", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const source = page.locator("#draggable");
    const target = page.locator("#droppable");
    await source.scrollIntoViewIfNeeded();

    await source.dragTo(target);
    await page.waitForLoadState("networkidle");
    const textTarget = page.locator("#droppable> p:has-text('Dropped!')");
    console.log(`Text after drop: ${await textTarget.innerText()}`);
});

test("@dp1 date picker",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    let datePicker=page.locator("#datepicker").first();
    await datePicker.scrollIntoViewIfNeeded();
    await datePicker.fill("12/05/1996");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Tab");
    console.log(`Date entered: ${await datePicker.inputValue()}`);
    await expect(datePicker).toHaveValue("12/05/1996");
})


test("@t1 table",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForLoadState("networkidle");
    // let coumns =page.locator("table[name='BookTable'] th");
    // let rows=page.locator("table[name='BookTable'] tbody tr");
    let table=page.locator("table[name='BookTable']");
    await table.scrollIntoViewIfNeeded();
    let bookNames=await table.locator("//tr//td[1]").allInnerTexts();
    console.log(`Book names: ${bookNames}`);
 
    logger.error('this is error');
    logger.warn('this is warning');
    logger.info('this is info');
    logger.debug('this is debug');
    logger.silly('this is info');
})

test("@t2 table",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForLoadState("networkidle");
    //table[@name='BookTable']//td[1]
    let columns =page.locator("//table[@name='BookTable']//th");
    //table[@name='BookTable']//tr//td[3]
    let rows=page.locator("//table[@name='BookTable']//tr[position()>1]");
        // let rowsCount=await rows.count();
    let specific_column=page.locator("//table[@name='BookTable']//tr//td[3]")
    let specific_column_count=await specific_column.count();

    for(let i=0;i<specific_column_count;i++){
        let values=await page.locator("//table[@name='BookTable']//tr//td[3]").nth(i).innerText();
        if(values.includes("Javascript")){ 
            // let author=await page.locator("//table[@name='BookTable']//tr//td[2]").nth(i).innerText();
            // let price=await page.locator("//table[@name='BookTable']//tr//td[4]").nth (i).innerText(); 
            let data=await page.locator("//table[@name='BookTable']//tr[position()>1]").nth(i).innerText();
            // console.log(`Author: ${author}, Price: ${price}`);
            console.log(data)
        }
    }
})


test("@t3 table",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    let priceLocator=page.locator("//table[@name='BookTable']//tr//td[4]");
   
    for(let i=0;i<await priceLocator.count();i++){
        let price=await priceLocator.nth(i).innerText();
        if(price>300){
            let data=await page.locator("//table[@name='BookTable']//tr[position()>1]").nth(i).innerText();
            console.log(data);
        }
    }
})

test("frames", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/nested_frames");
    const topFrame = page.frameLocator('frame[name="frame-top"]');
    const middleFrame = topFrame.frameLocator('frame[name="frame-middle"]');
    const text = await middleFrame.locator('body').innerText();
    expect(text).toBe("MIDDLE");
    console.log(text);
});


test("upload files", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForLoadState('domcontentloaded');

    // let filelocator=page.locator("#singleFileInput");
    let filelocator = page.locator("#multipleFilesInput");
    await filelocator.scrollIntoViewIfNeeded();
    const filepath1 = path.join(__dirname, "../test2.js")
    const filepath2 = path.join(__dirname, "../test2.js");
    // console.log(filepath)
    await filelocator.setInputFiles([filepath1, filepath2]);
    await page.waitForLoadState('networkidle');
})


test("download files", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/download");
    await page.waitForLoadState('domcontentloaded');

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByText("textfile.txt").click()
    ]);

    // let downloadPromise=page.waitForEvent('download');
    // await page.getByText("not_empty.txt").click();
    // let download=await downloadPromise;
    let downloadPath = await download.path();
    const filepath1 = path.join(__dirname, "../", download.suggestedFilename())
    download.saveAs(filepath1);
    console.log(`File downloaded at ${filepath1}`);
})


test("popup", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    let popupLocator = page.locator("#PopUp")
    await popupLocator.scrollIntoViewIfNeeded();

    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        popupLocator.click(),
    ])

    await popup.bringToFront()
    await popup.waitForLoadState('networkidle');
    console.log(`Popup title: ${await popup.title()}`);

    let valueLocator = popup.getByRole("tab", { name: "Python" })
    await valueLocator.scrollIntoViewIfNeeded();
    await expect(valueLocator).toContainText("Python")
    console.log(`Value found: ${await valueLocator.innerText()}`)

})


test("window", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    let popupLocator = page.getByRole("button", { name: "New Tab" })
    await popupLocator.scrollIntoViewIfNeeded();

    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        popupLocator.click(),
    ])

    await popup.bringToFront()
    await popup.waitForLoadState('networkidle');
    console.log(`Popup title: ${await popup.title()}`);
    await expect(popup).toHaveTitle("SDET-QA Blog")

    const pages = page.context().pages();

    for (const window of pages) {
        const title = await window.title();

        console.log(`Window title: ${title}`);

        if (title === "Automation Testing Practice") {
            await window.bringToFront();
            break;
        }
    }
    await page.waitForLoadState('networkidle');
    console.log(`Required window brought to front: ${await page.title()}`);
    await page.waitForTimeout(5000);
})




// test.afterAll(async () => {
//     await context.close();
// });