import { act } from "react";
import RestaurantMenu from "../RestaurantMenu";
import MOCK_MENU_DATA from "../__mocks__/resMenuMock.json";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import "@testing-library/jest-dom";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../utils/cartSlice"; // Import your cart slic

// Mock fetch to return the menu data
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_MENU_DATA),
  })
);

// Create a mock store using Redux Toolkit's configureStore
const store = configureStore({
  reducer: {
    cart: cartReducer, // Pass your cart reducer
  },
  preloadedState: {
    cart: {
      items: [], // Mock initial state with no items in cart
    },
  },
});


describe("RestaurantMenu Integration Tests", () => {
  // Test to verify if the RestaurantMenu component renders correctly
  test("should render RestaurantMenu component with fetched data", async () => {
    await act(async () =>
      render(
        <Provider store={appStore}>
          <RestaurantMenu />
        </Provider>
      )
    );

    // Check if the accordion header for a category is displayed
    const categoryHeader = screen.getByText("Starters (Chinese) (3)");
    expect(categoryHeader).toBeInTheDocument();
  });

  // Test to check if the correct number of category items is rendered
  test("should display correct number of items in category", async () => {
    await act(async () =>
      render(
        <Provider store={appStore}>
          <RestaurantMenu />
        </Provider>
      )
    );

    // Expand the category accordion
    const categoryHeader = screen.getByText("Starters (Chinese) (3)");
    fireEvent.click(categoryHeader);

    // Check if the correct number of items is displayed within the category
    const categoryItems = screen.getAllByTestId("categoryItems");
    expect(categoryItems.length).toBe(3); // Expecting 3 items based on mock data
  });

  // Test to verify adding items to the cart
  test("should add items to Cart component when 'ADD' button is clicked", async () => {
    await act(async () =>
      render(
        <Provider store={appStore}>
          <RestaurantMenu />
          <Cart />
        </Provider>
      )
    );

    // Expand the category accordion
    const categoryHeader = screen.getByText("Starters (Chinese) (3)");
    fireEvent.click(categoryHeader);

    // Check that the cart is initially empty
    const cartEmptyMessage = screen.getByText("Your cart is empty.");
    expect(cartEmptyMessage).toBeInTheDocument();

    // Simulate adding an item to the cart
    const addToCartButtons = screen.getAllByRole("button", { name: "ADD" });
    fireEvent.click(addToCartButtons[0]);

    // Verify that items have been added to the cart
    const categoryItemsAfterAdd = screen.getAllByTestId("categoryItems");
    expect(categoryItemsAfterAdd.length).toBe(4); // Expecting an additional item in the cart
  });

  test("should display cart item count correctly", async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Header />
            <RestaurantMenu />
          </Provider>
        </BrowserRouter>
      )
    );

    // Check for initial cart count
    const beforeAddingItem = screen.getByTestId("cart-item-count");
    expect(beforeAddingItem.textContent).toBe("0"); // If items array is empty

    const categoryHeader = screen.getByText("Starters (Chinese) (3)");
    expect(categoryHeader).toBeInTheDocument();

    const addToCartButtons = screen.getAllByRole("button", { name: "ADD" });
    fireEvent.click(addToCartButtons[0]);

    const afterAddingItem = screen.getByTestId("cart-item-count");
    expect(afterAddingItem.textContent).toBe("1");

    fireEvent.click(addToCartButtons[1]);
    expect(afterAddingItem.textContent).toBe("2");
  });
});
