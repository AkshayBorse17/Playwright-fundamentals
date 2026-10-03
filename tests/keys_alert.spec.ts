import {test,expect} from "@playwright/test"

test("keys",async({page})=>{
    await page.goto("https://www.toptal.com/developers/keycode")
    await page.keyboard.press("Akshay")
    await page.pause()

})

test("drag and drop",async({page})=>{
    await page.goto("https://app.thetestingacademy.com/playwright/widgets/dnd")
    let source=page.getByRole("heading",{name:"Review PR #21 — flaky test fix"})
    let dest=page.locator("#col-in-progress")
    await source.dragTo(dest)
    await page.pause()

})