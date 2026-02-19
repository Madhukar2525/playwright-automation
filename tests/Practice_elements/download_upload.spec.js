import { test, expect } from '@playwright/test';


test('upload file tc @upload', async ({ page }) => {
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');

    const filesSelected = page.locator('[id="fileList"]').locator('li')
    const fileName = "dummy_file.pdf"
    await expect(filesSelected).toHaveText('No Files Selected');

    await page.locator('input[type="file"]').setInputFiles(`test-data/${fileName}`);

    await expect(filesSelected).toHaveText(fileName);
})

test('File download @download', async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/FileDownload.html');

    const msg = "My name is Rob"
    const generateFileButton = page.getByRole('button', { name: "Generate File" }).first();
    const textArea = page.locator('textarea[id="textbox"]');

    await page.locator('label[for="comment"]').first().scrollIntoViewIfNeeded();


    await expect(generateFileButton).toBeDisabled();

    await textArea.pressSequentially(msg, { delay: 50 });
    await expect(generateFileButton).toBeEnabled();
    await generateFileButton.click();

    // Method 2
    page.once('download', async download => {
        const file_name = download.suggestedFilename();
        await download.saveAs(`test-data/${file_name}`);
    })
    await page.getByRole('link', { name: "Download" }).first().click();
    
    // // Method 1: Wait for download event
    // const downloadPromise = page.waitForEvent('download');
    // await page.getByRole('link', { name: "Download" }).first().click();
    // const download = await downloadPromise;
    // // Save to specific path
    // await download.saveAs('test-data/downloaded_file.txt');
    // // Get download info
    // console.log(download.suggestedFilename());
    // const path = await download.path(); // temporary path

})