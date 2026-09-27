import {test,expect,chromium} from "@playwright/test"

const URL1:string="https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
const URL2:string="https://www.saucedemo.com/"
test.describe("Regression",()=>{
test("Test1",async({})=>{
    const browser=await chromium.launch()
    const context=await browser.newContext()
    const page=await context.newPage()
    await page.goto(URL1)
   

    await page.getByRole('textbox',{name:'Username'}).fill("Admin")
    await page.getByRole('textbox',{name:'Password'}).fill("admin123")
    await page.getByRole('button',{name:'login'}).click()   

    // await page.waitForTimeout(5000)
    await expect(page).toHaveTitle("OrangeHRM")
    await expect(page.getByRole('heading',{name:'Dashboard'})).toBeVisible()
    // await browser.close()


})
})



test.describe("E2E",()=>{
test("Test2",async({})=>{
    const browser=await chromium.launch()
    const context=await browser.newContext()
    const page=await context.newPage()
    await page.goto(URL2)
   

    await page.getByRole('textbox',{name:'Username'}).fill("standard_user")
    await page.getByRole('textbox',{name:'Password'}).fill("secret_sauce")
    await page.getByRole('button',{name:'Login'}).click()   

    // await page.waitForTimeout(5000)
    await expect(page).toHaveTitle("Swag Labs")
    await expect(page.getByText("Swag Labs")).toBeVisible()
    // await expect(page).toHaveURL(URL)
    // await browser.close()
})
})

