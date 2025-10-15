import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import {OrdersPage} from '../../pages/order.page.js'
/** @type {OrdersPage} */
let orderPage;
let mainPage; 
let newEmail;
When('I navigate to the website page', async function () {
  orderPage = new OrdersPage(this.page);
  mainPage = this.page; 
  this.page = await orderPage.clickOnTheWebsiteLink();
  await orderPage.dismissPopup()

});

Then(
  'I enter all the required details {string} {string} {string} {string} {string} {string} {string} {string} {string}',
  async function (firstName, lastName, email, address, city, state, zip, phone, coupon) {

    await orderPage.selectTheProduct()
    await orderPage.selectDate();
    await orderPage.fillBillingDetails({
      firstName,
      lastName,
      email,
      address,
      city,
      state,
      zip,
      phone,
      coupon
    });
  }
);

Then('I complete the product purchase for the customer email address {string} and cancel the order', async function (email) {
// will write the code for complete the product purchasing process.

  await this.page.close();
  this.page = mainPage;
  await this.page.bringToFront();
   console.log('Returned to main website page');
   await this.page.waitForTimeout(3000)
   orderPage = new OrdersPage(this.page);
   await orderPage.navigateAllOrder()
   await orderPage.editTheOrder(email)
  //  await orderPage.reviewOrder()
   await orderPage.proceedPayment()
   await orderPage.editTheOrder(email)
   await orderPage.cancelCreatedOrder()
   await orderPage.deleteTheOrder(email)

});


// Route Planner Steps:-
When('I navigate to the route planner page',  async function () {
  orderPage = new OrdersPage(this.page);
  await orderPage.navigateRoutePlannerPage()
})

Then('I add a truck with start location {string} and end location {string}', async function (startLocation, endLocation) {
 orderPage = new OrdersPage(this.page);
  await orderPage.addTruckDetails(startLocation, endLocation)

})

Then('I delete the newly created truck', async function () {
  orderPage = new OrdersPage(this.page);
  await orderPage.deleteTheTruck()
})

When('I navigate to the Customers page', async function () {
  orderPage = new OrdersPage(this.page);
  await orderPage.navigateCustomerPage();
})

Then('I add a new customer with the following details: {string}, {string}, {string}, {string}, {string}, {string}, {string}',  async function (firstName, lastName, address, city, state, zip, phone) {
 orderPage = new OrdersPage(this.page);
 await orderPage.clickAddNewCustomer()
 newEmail=await orderPage.addNewCustomer(firstName, lastName, address, city, state, zip, phone)

})

Then('I click on the reports and verify the customer report', async function(){
  
  orderPage = new OrdersPage(this.page);
  await orderPage.verifyCustomerReport(newEmail)
  
})


Then('I update the customer details whose email is {string} with new update phone number {string}', async function (email,updateNumber) {
  orderPage = new OrdersPage(this.page);
  await orderPage.updateTheCustomerDetails(newEmail, updateNumber);
  
})


Then('I delete the customer whose email is {string}',async function (email) {
 orderPage = new OrdersPage(this.page);
  await orderPage.deleteTheCustomer(newEmail);
})

When('I navigate to the Manual Order page', async function () {
  orderPage = new OrdersPage(this.page);
  await orderPage.navigateManualOrderPage();
})



Then('I cancel the order for {string}',async function (email) {
  
  orderPage = new OrdersPage(this.page);
  await orderPage.deleteTheOrder(email)
})



When('I update some details in the backend for the customer email address {string} such as {string} add a {string} and update payment mode to {string}', async function (email, phoneNumber, publicNote, paymentType) {
  // Write code here that turns the phrase above into concrete actions

  await this.page.close();
  this.page = mainPage;
  await this.page.bringToFront();
   console.log('Returned to main website page');
   await this.page.waitForTimeout(3000)
   orderPage = new OrdersPage(this.page);
   await orderPage.navigateAllOrder()
   await orderPage.editTheOrder(email)
   await orderPage.editAddress(phoneNumber)
   await orderPage.editDetails(publicNote)
   await orderPage.editDate()
   await orderPage.editProduct()
   await orderPage.editPayment(paymentType)
   await orderPage.reviewOrder()

})

When('I send the invoice and verify the invoice details on the billing page', async function(){
  // Write code here that turns the phrase above into concrete actions

   orderPage = new OrdersPage(this.page);
   await orderPage.sendInvoice()
})

When('I click on process payment for the customer email address {string} and verify success payment on the billing payment page', async function(email){
  // Write code here that turns the phrase above into concrete actions

  orderPage = new OrdersPage(this.page);
  await orderPage.clickOnAllOrder();
  await orderPage.editTheOrder(email)
  await orderPage.successPayment()

})

When('I click on the reports section and verify the customer report, product report, order report for the customer email address {string}', async function(email){
  // Write code here that turns the phrase above into concrete actions

   orderPage = new OrdersPage(this.page);
   await orderPage.clickOnReports()
   await orderPage.verifyCustomerReportsForAllDurations(email)
   await orderPage.verifyOrderReport(email)

})

When('I click on the batch print section and verify batch process for the customer email address {string}', async function(email){
  // Write code here that turns the phrase above into concrete actions

  orderPage = new OrdersPage(this.page);
  await orderPage.clickOnBatchPrint()
  await orderPage.verifyBatchPrint(email)
})

Then('I cancel the order created for the customer with email address {string}', async function(email){
  // Write code here that turns the phrase above into concrete actions
  
  orderPage = new OrdersPage(this.page);
  await orderPage.clickOnAllOrder()
  await orderPage.editTheOrder(email)
  await orderPage.cancelCreatedOrder()
})

Then('I un-cancel the previously canceled order for the customer with email address {string}', async function(email){
  // Write code here that turns the phrase above into concrete actions
  orderPage = new OrdersPage(this.page);
  await orderPage.uncancelTheOrder(email)
})

Then('I delete the created order for the customer with email address {string}',async function(email){
  // Write code here that turns the phrase above into concrete actions

  orderPage = new OrdersPage(this.page);
  await orderPage.cancelTheCompleteOrder(email)
  await orderPage.deleteTheOrder(email)

})

When('I click on the reports section and verify the customer report, product report, order report for the customer email address {string} and product name is {string}', async function(email, productName){
  // Write code here that turns the phrase above into concrete actions

   orderPage = new OrdersPage(this.page);
   await orderPage.clickOnReports()
   await orderPage.verifyCustomerReportsForAllDurations(email)
   await orderPage.verifyOrderReport(email)
   await orderPage.verifyProductReport(productName)
})

// Quote an order:

When('I click on the new customer button and add new customer with the following details: {string}, {string}, {string}, {string}, {string}, {string}, {string}',async function (firstName, lastName, address, city, state, zip, phone) {
  // Write code here that turns the phrase above into concrete actions

  orderPage = new OrdersPage(this.page);
  mainPage = this.page; 
  this.page = await orderPage.clickOnNewCustomer();
  newEmail=await orderPage.addNewCustomer(firstName, lastName, address, city, state, zip, phone)
})

Then('I complete the manual order for the newly added customer and selected the product {string}, {string}, {string}', async function (productName, startTime, endTime) {
  orderPage = new OrdersPage(this.page);
  await orderPage.completeManualOrder(newEmail, productName, startTime, endTime);
})

When('I navigate to the all order page and deleted the created order', async function(){
  // Write code here that turns the phrase above into concrete actions
  orderPage = new OrdersPage(this.page);
  await orderPage.clickOnAllOrder()
  await orderPage.editTheOrder(newEmail)
   await orderPage.cancelCreatedOrder()
  await orderPage.deleteTheOrder(newEmail)
})

Then('I navigate to the customer page and delete the newly created customer', async function(){
  // Write code here that turns the phrase above into concrete actions

  orderPage = new OrdersPage(this.page);
  await orderPage.clickOnCustomerLink()
  await orderPage.deleteTheCustomer(newEmail)

})

When('I enter all the required details {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string}', async function (firstName, lastName, email, address, city, state, zip, phone, coupon, cardnumber, expdate, cvc, zipnumber) {
  // Write code here that turns the phrase above into concrete actions
  orderPage = new OrdersPage(this.page);
  await orderPage.selectTheProduct()
  await orderPage.selectDate();
  await orderPage.fillBillinDetailsAlongWithCardDetails(firstName, lastName, email, address, city, state, zip, phone, coupon, cardnumber, expdate, cvc, zipnumber)
})




















