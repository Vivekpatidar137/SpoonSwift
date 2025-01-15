import { render, screen } from "@testing-library/react";
import Header from "../Header";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";

test("Should render header component with links", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  // Get all link elements
  const links = screen.getAllByRole("link");

  // Check if the links array is not empty
  expect(links.length).toBeGreaterThan(0);

  // Optionally, check if each link is in the document
  links.forEach((link) => {
    expect(link).toBeInTheDocument();
  });
});

test("renders all navigation links", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  // Check if all expected links are present
  const homeLink = screen.getByText("Home");
  const aboutLink = screen.getByText("About");
  const contactLink = screen.getByText("Contact");
  const expressMartLink = screen.getByText("ExpressMart");

  expect(homeLink).toBeInTheDocument();
  expect(homeLink).toHaveAttribute("href", "/");

  expect(aboutLink).toBeInTheDocument();
  expect(aboutLink).toHaveAttribute("href", "/about");

  expect(contactLink).toBeInTheDocument();
  expect(contactLink).toHaveAttribute("href", "/contact");

  expect(expressMartLink).toBeInTheDocument();
  expect(expressMartLink).toHaveAttribute("href", "/expressMart");
});

test("renders logo with correct src and alt", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );

  const logo = screen.getByAltText("Logo");
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute(
    "src",
    "https://www.creativefabrica.com/wp-content/uploads/2020/02/11/Food-Logo-Graphics-1-71-580x386.jpg"
  );
});


