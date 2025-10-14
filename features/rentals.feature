@rentals
Feature: Test the functionality of Rental Categories

  Background:
    Given I am on the login page
    When I click on the login button
    When I enter valid username "saadsaadcs@gmail.com"
    And I enter valid password "Admin999@"
    And I click the login button
    Then I should be logged in successfully
    Then I should dismiss the warming message

  @categories
  Scenario: Perform CRUD operations on Rental Category
    When I navigate to Rental Categories
    And I add a new Product Category with required details
    Then the category should be created successfully
    And I navigate to the website and confirm that the newly created category appears on the home page
    And Edit the newly created category and verify that the changes are saved successfully.
    Then Delete the newly created category and confirm that it no longer appears on the home page.
  
  
  # @rentalItems
  # Scenario: Perform CRUD operations on Rental Category
  #   When I navigate to Rental Items


  @priceOption
  Scenario Outline: Perform CRUD operations on price options
    When I navigate to the Promo codes
    And I create a new promo code with following deatils "<Promo_title>" "<Despriction>" "<Maximum_discount>" "<Minimum_purchase>" "<type>" "<Amount>" "<percentage>"
    And I update the newly created promo code "<Promo_title>" "<edit_description>"
    Then I delete the newly created promo code "<Promo_title>"

    Examples:
      | Promo_title   | Despriction                 | Maximum_discount | Minimum_purchase | type   | Amount | percentage | edit_description                 |
      | test_discount | test the promo code section |               50 |              200 | Amount |     20 |          5 | edot the new;t created promo coe |
