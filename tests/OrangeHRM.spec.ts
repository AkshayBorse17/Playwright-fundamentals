import {test,expect,chromium} from "@playwright/test"
import dotenv from "dotenv"
dotenv.config()

// dotenv
// session storage
// load state

const username=process.env.ORANGEHRM_USER
const password=process.env.ORANGEHRM_PASS

let URL="https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
test("Orange Login",async({})=>{

  let browser=await chromium.launch()
  let context=await browser.newContext()
  let page=await context.newPage()
  await page.goto(URL)
  await page.getByRole("textbox",{name:"Username"}).fill(username)
  await page.getByRole("textbox",{name:"Password"}).fill(password)
  await page.getByRole("button",{name: "Login"}).click()
  await page.waitForLoadState("load")
  let dashboard= page.locator("h6:has-text('Dashboard')")
  await expect(dashboard).toBeVisible()

  await context.storageState({path:"auth.json"})
  await browser.close()
})

test.only("Orange Add Employee",async({})=>{
   let browser=await chromium.launch()
   let context=await browser.newContext({storageState:"auth.json"})
   let page=await context.newPage()
   await page.goto(URL)
   await page.getByRole("link",{name:"PIM"}).click()
   await page.getByRole("button",{name:"Add"}).click()
   await page.getByRole("textbox",{name:"First Name"}).fill("Amar")
   await page.getByRole("textbox",{name:"Middle Name"}).fill("Akbar")
   await page.getByRole("textbox",{name:"Last Name"}).fill("Anthony")
   let id=await page.locator(".oxd-input.oxd-input--active").last().inputValue()
   await page.getByRole("button",{name:"Save"}).click()
   
   let personalinfo= page.locator("h6:has-text('Personal Details')")
   await page.waitForLoadState('load')
   await expect(personalinfo).toBeVisible()
    console.log(id)
    await page.getByRole("link",{name:"PIM"}).click()
    await page.getByRole('textbox').nth(2).fill(id)
    await page.getByRole("button",{name:"Search"}).click()
    await page.waitForLoadState('load')
    await expect(page.getByText("(1) Record Found")).toBeVisible()
    await expect(page.getByRole("row").filter({ hasText: id })).toBeVisible();

    await page.screenshot()
     await browser.close()
})