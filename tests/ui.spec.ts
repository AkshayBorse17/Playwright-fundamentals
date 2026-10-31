import {test,expect} from "@playwright/test"

let URL="https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
test("UI test",async({page})=>{
    await page.goto(URL)
    await page.getByRole("textbox",{name:"Username"}).fill("Admin")
    await page.getByRole("textbox",{name:"Password"}).fill("admin123")
    await page.locator("button:has-text('Login')").click()
    // await page.waitForTimeout(5000)
    
    await page.waitForLoadState("networkidle")
    await page.screenshot({path: "screenshot.png"})
    // await page.waitForEvent("load")
    await expect(page).not.toHaveTitle("OrangeHRM")
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")

})