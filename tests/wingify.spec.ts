import {test,expect,chromium} from "playwright/test"
import dotenv from "dotenv"

dotenv.config()
const user = process.env.VWO_USER;
const pass = process.env.VWO_PASS;
test("wingify",async({})=>{
    let browser=await chromium.launch()
    let context=await browser.newContext()
    let page=await context.newPage()
    await page.goto("https://app.wingify.com/#/login")

    page.getByRole("textbox",{name:"email"}).fill(user)
    page.getByRole('textbox', { name: 'Password' }).fill(pass)
    page.getByRole('button', { name: 'Sign in', exact: true}).click()
    await expect(page).toHaveURL("/dashboard")
  
})
