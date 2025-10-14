import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {OrdersPage} from '../../pages/order.page.js'
/** @type {OrdersPage} */
let orderPage;
let mainPage; 
import {RentalsPage} from '../../pages/rentals.page.js'
/** @type {RentalsPage} */
let rentalPage;
let newCategoriesName

When('I navigate to Rental Categories', async function () {
rentalPage=new RentalsPage(this.page)
await rentalPage.clickOnRentalsDropdown()

});

Then('I add a new Product Category with required details', async function () {
   newCategoriesName=await rentalPage.fillAddProductCatagoryDetails()

});

Then('the category should be created successfully', async function () {
  await rentalPage.catagorySuccessfullyCreated()
});

Then('I navigate to the website and confirm that the newly created category appears on the home page',  async function () {
  // Write code here that turns the phrase above into concrete actions

  orderPage = new OrdersPage(this.page);
  mainPage = this.page; 
  this.page = await orderPage.clickOnTheWebsiteLink();
  await orderPage.dismissPopup()
  rentalPage=new RentalsPage(this.page)
  await rentalPage.verifyCateogryCreatwedOnWebsiteHomePage(newCategoriesName)

})

Then('Edit the newly created category and verify that the changes are saved successfully.', async function () {
  // Write code here that turns the phrase above into concrete actions

  await this.page.close();
  this.page = mainPage;
  await this.page.bringToFront();
  console.log('Returned to main website page');
  await this.page.waitForTimeout(3000)
  rentalPage=new RentalsPage(this.page)
  rentalPage.editTheCategory(newCategoriesName)


})

Then('Delete the newly created category and confirm that it no longer appears on the home page.',async function () {
  // Write code here that turns the phrase above into concrete actions

  rentalPage=new RentalsPage(this.page)
  await rentalPage.deleteCategory(newCategoriesName)
  orderPage = new OrdersPage(this.page);
  mainPage = this.page; 
  this.page = await orderPage.clickOnTheWebsiteLink();
  await orderPage.dismissPopup()
  rentalPage=new RentalsPage(this.page)
  await rentalPage.verifyCategoryDeleteFromHomePage(newCategoriesName)

})

When('I navigate to the Promo codes', async function () {
  // Write code here that turns the phrase above into concrete actions
  rentalPage=new RentalsPage(this.page)
  await rentalPage.navigateToPromoCodesPage()
})

When('I create a new promo code with following deatils {string} {string} {string} {string} {string} {string} {string}', async function (promotitle, description, maxdiscount, minpurchase, optionText, amount, percentage) {
  // Write code here that turns the phrase above into concrete actions

  rentalPage=new RentalsPage(this.page)
  await rentalPage.createNewPromoCode(promotitle, description, maxdiscount, minpurchase, optionText, amount, percentage)

})

When('I update the newly created promo code {string} {string}', async function (promotitle, description) {
  // Write code here that turns the phrase above into concrete actions

  rentalPage=new RentalsPage(this.page)
  await rentalPage.editTheNewlyCreatedPromo(promotitle, description)
})

Then('I delete the newly created promo code {string}',async function (promotitle) {
  // Write code here that turns the phrase above into concrete actions

   rentalPage=new RentalsPage(this.page)
   await rentalPage.deleteNewlyCreatedPromo(promotitle)
})

// Rental Items steps:

When('I navigate to Rental Items', async function () {
  // Write code here that turns the phrase above into concrete actions

  

})






