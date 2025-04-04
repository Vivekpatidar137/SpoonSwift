import cartReducer, {
  addItems,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../../utils/cartSlice";

describe("cartSlice", () => {
  const mockItem = {
    card: {
      info: {
        id: "1",
        name: "Pizza",
        price: 10000, // ₹100.00
      },
    },
    quantity: 1,
  };

  // Test for initial state
  it("should return the initial state", () => {
    expect(cartReducer(undefined, {})).toEqual({
      items: [],
    });
  });

  // Test for addItems reducer
  describe("addItems", () => {
    it("should add new item to empty cart", () => {
      const initialState = { items: [] };
      const nextState = cartReducer(initialState, addItems(mockItem));

      expect(nextState.items).toHaveLength(1);
      expect(nextState.items[0]).toEqual({
        ...mockItem,
        quantity: 1,
      });
    });

    it("should increment quantity when adding existing item", () => {
      const initialState = { items: [mockItem] };
      const nextState = cartReducer(initialState, addItems(mockItem));

      expect(nextState.items).toHaveLength(1);
      expect(nextState.items[0].quantity).toBe(2);
    });
  });

  // Test for increaseQuantity reducer
  describe("increaseQuantity", () => {
    it("should increase quantity of existing item", () => {
      const initialState = { items: [mockItem] };
      const nextState = cartReducer(initialState, increaseQuantity("1"));

      expect(nextState.items[0].quantity).toBe(2);
    });

    it("should do nothing if item not found", () => {
      const initialState = { items: [mockItem] };
      const nextState = cartReducer(initialState, increaseQuantity("2"));

      expect(nextState.items[0].quantity).toBe(1);
    });
  });

  // Test for decreaseQuantity reducer
  describe("decreaseQuantity", () => {
    it("should decrease quantity when quantity > 1", () => {
      const initialState = {
        items: [{ ...mockItem, quantity: 2 }],
      };
      const nextState = cartReducer(initialState, decreaseQuantity("1"));

      expect(nextState.items[0].quantity).toBe(1);
    });

    it("should remove item when quantity is 1", () => {
      const initialState = { items: [mockItem] };
      const nextState = cartReducer(initialState, decreaseQuantity("1"));

      expect(nextState.items).toHaveLength(0);
    });
  });

  // Test for clearCart reducer
  describe("clearCart", () => {
    it("should remove all items from cart", () => {
      const initialState = {
        items: [
          mockItem,
          {
            card: { info: { id: "2", name: "Burger", price: 15000 } },
            quantity: 1,
          },
        ],
      };
      const nextState = cartReducer(initialState, clearCart());

      expect(nextState.items).toHaveLength(0);
    });
  });
});
