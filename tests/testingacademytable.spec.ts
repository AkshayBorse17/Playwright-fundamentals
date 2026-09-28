import {test,expect} from "@playwright/test"

let URL="https://app.thetestingacademy.com/playwright/tables/webtable"
let specific_column="//table[@id='employees-table']/tbody/tr/td[3]"
let rows="//table[@id='employees-table']/tbody/tr"
let columns="//table[@id='employees-table']/thead/tr/th"

test("Testing Aca Table",async({page})=>{
    await page.goto(URL)
    await page.waitForLoadState("load") 
while(true){
    let rows=await page.locator("//table[@id='employees-table']/tbody/tr").count()
    let columns=await page.locator("//table[@id='employees-table']/thead/tr/th").count()
    let specific_column=await page.locator("//table[@id='employees-table']/tbody/tr/td[4]").count()

    for (let i=1 ; i<=specific_column;i++){
            let Email=await page.locator(`//table[@id='employees-table']/tbody/tr[${i}]/td[4]`).innerText()
            let Name=await page.locator(`//table[@id='employees-table']/tbody/tr[${i}]/td[4]/preceding-sibling::td[1]`).innerText()
            let Role=await page.locator(`//table[@id='employees-table']/tbody/tr[${i}]/td[4]/preceding-sibling::td[2]`).innerText()
            let Country=await page.locator(`//table[@id='employees-table']/tbody/tr[${i}]/td[4]/following-sibling::td[1]`).innerText()

            if (Email.includes("hiroshi@tta.dev")){
                console.log(Name)
                console.log(Role)
                console.log(Country)
                return
            }
               
        }
    let nextButton = page.getByRole("button",{name:"Next ›"})
    if(await nextButton.isEnabled())
    {
         await nextButton.click()       
    }
    else{
        console.log("Email ID not found")
                break
    }
}
})