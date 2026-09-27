import {test,expect,Locator} from "@playwright/test"



test("Table",async({page})=>{
    
    await page.goto("https://www.w3schools.com/htmL//tryit.asp?filename=tryhtml_table_intro")
    await page.waitForLoadState("load")
    // let main:Locator=page.locator("//table/tbody/tr[5]/td[2]/following-sibling::td")
    let frame=page.frameLocator("iframe#iframeResult")
    let rows=await frame.locator("//table/tbody/tr").count()
    let columns=await frame.locator("//table/tbody/tr/th").count()
    
    for(let i=2;i<=rows;i++){
        for (let j=1;j<=columns;j++){
            let contact=await frame.locator(`//table/tbody/tr[${i}]/td[${j}]`).innerText()
            if (contact.includes("Helen")){
                let country=await frame.locator(`//table/tbody/tr[${i}]/td[${j}]/following-sibling::td`).innerText()
                console.log(`${contact} country is: ${country}`)
            }   
        }            
    }
})