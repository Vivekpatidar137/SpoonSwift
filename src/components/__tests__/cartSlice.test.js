import cartReducer, { addItems, removeItem, clearCart } from "../../utils/cartSlice";

// Test for initial state
describe("cartSlice", () => {
  it("should return the initial state", () => {
    expect(cartReducer(undefined, {})).toEqual({
      items: [],
    });
  });

  // Test for addItems reducer
  it("should handle addItems", () => {
    const initialState = { items: [] };
    const newItem = { id: 1, name: "Pizza", quantity: 1 };
    
    const nextState = cartReducer(initialState, addItems(newItem));
    
    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual(newItem);
  });

  // Test for removeItem reducer
  it("should handle removeItem", () => {
    const initialState = {
      items: [{ id: 1, name: "Pizza", quantity: 1 }],
    };

    const nextState = cartReducer(initialState, removeItem());

    expect(nextState.items).toHaveLength(0);
  });

  // Test for clearCart reducer
  it("should handle clearCart", () => {
    const initialState = {
      items: [{ id: 1, name: "Pizza", quantity: 1 }],
    };

    const nextState = cartReducer(initialState, clearCart());

    expect(nextState.items).toHaveLength(0);
  });
});
