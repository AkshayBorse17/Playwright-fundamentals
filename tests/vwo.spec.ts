import {test,expect} from "@playwright/test"

const URL1:string="https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"

test("vwo",async({page})=>{
    await page.goto(URL1)
    await page.getByRole('textbox',{name:'Username'}).fill("Admin")
    await page.getByRole('textbox',{name:'Password'}).fill("admin123")
    // await page.getByText('Remember me').check()
    await page.getByRole('button',{name:'Login',exact:true}).click()
    // await page.waitForTimeout(10000)
    await expect(page.getByRole('heading',{name:'Dashboard'})).toContainText('Dashboard')
    await page.waitForLoadState('domcontentloaded')
    // await page.pause()
})
