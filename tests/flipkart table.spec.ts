import {test,expect} from "@playwright/test"
import { nextTick } from "node:process"

test("Flipkart table validation",async({page})=>{

await page.goto("https://www.flipkart.com/")
 await page.getByRole("textbox",{name: "Search for Products, Brands and More"}).fill("DSLR camera")
     await page.getByRole("textbox",{name: "Search for Products, Brands and More"}).press("Enter")

while(true){
   
     let product:string[]=await page.locator("//div[@class='RG5Slk']").allInnerTexts()
     let price:string[]=await page.locator("//div[@class='hZ3P6w DeU9vF']").allInnerTexts()

    //  for (let productitem of product){
    //     console.log(productitem)
    //  }

     
    //  for (let priceitem of price){
    //     console.log(priceitem)
    //  }

     for (let i = 0; i < product.length; i++) {
    console.log(product[i], " - ", price[i])
    }
    
  let nextButton = page.getByRole("button", { name: "Next" })
    
    if (await nextButton.count() === 0){
        break
    }

    await nextButton.click()
}
})