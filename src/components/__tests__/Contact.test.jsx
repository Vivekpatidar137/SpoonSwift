import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

test("should render Contact component with headings and paragraphs", () => {
  render(<Contact />);

  // Test if the main heading "Contact Us" is in the document
  const mainHeading = screen.getByRole("heading", { name: /contact us/i });
  expect(mainHeading).toBeInTheDocument();

  // Test if "Get in Touch" and "Follow Us" subheadings are rendered
  const subHeading1 = screen.getByRole("heading", { name: /Get in Touch/i });
  const subHeading2 = screen.getByRole("heading", { name: /Follow Us/i });

  expect(subHeading1).toBeInTheDocument();
  expect(subHeading2).toBeInTheDocument();

  // Test if email, phone, and address texts are rendered
  const email = screen.getByText(/support@spoonswift.com/i);
  const phone = screen.getByText(/\+1 \(555\) 123-4567/i);
  const address = screen.getByText(/123 foodie lane/i);

  expect(email).toBeInTheDocument();
  expect(phone).toBeInTheDocument();
  expect(address).toBeInTheDocument();
});

test("should render all social media links", () => {
  // Render the Contact component
  render(<Contact />);

  // Test if all social media links are rendered
  const facebook = screen.getByRole("link", { name: /Facebook/i });
  const twitter = screen.getByRole("link", { name: /Twitter/i });
  const instagram = screen.getByRole("link", { name: /Instagram/i });
  const linkedIn = screen.getByRole("link", { name: /LinkedIn/i });

  // Assert that all links are in the document
  expect(facebook).toBeInTheDocument();
  expect(twitter).toBeInTheDocument();
  expect(instagram).toBeInTheDocument();
  expect(linkedIn).toBeInTheDocument();
});
