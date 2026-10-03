import {test,expect,Locator} from "@playwright/test"
import { time } from "node:console"

test.describe("group1",()=>{
    const URL="https://www.flipkart.com/search"
    test.beforeEach(async({page})=>{
        await page.goto(URL)
    })

    test("flipkart_test1",async({page})=>{
        
        // let modal=page.getByRole('button', { name: '✕' })
        // await modal.click()
        // if (await modal.isVisible({timeout:5000})){
        //     await modal.click()
        // }
        await page.getByRole("textbox",{name:/Search for products,/}).fill("macmini")
        await page.locator("button >svg").click()
        
        await page.waitForLoadState("networkidle")
        await page.waitForTimeout(5000)
        let names:string[]=await page.locator(".pIpigb").allInnerTexts()
        let prices:string[]=await page.locator(".fb4uj3").allInnerTexts()

        console.log(names.length,prices.length)
        for (let i = 0; i < names.length; i++) {
            console.log(names[i], " - ", prices[i])
        }
    })

    test("flipkart_test2",async({page})=>{
    
        await page.getByRole("textbox",{name:/Search for products,/}).fill("macmini")
        await page.locator("button >svg").click()
        
        await page.waitForLoadState("networkidle")

        let nameLocator:Locator[]=await page.locator(".pIpigb").all()
        let priceLocator:Locator[]=await page.locator(".fb4uj3").all()

        for (let i=0;i<nameLocator.length;i++){
            
            let name=await nameLocator[i].innerText()
            if (name.includes("Apple Mac Studio MHL64HN/A - Mac OS, M5 Max, M5 Max")){
                await nameLocator[i].click()
            }
            
        }
        await page.waitForTimeout(2000)
    })

})