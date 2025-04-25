import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { useData } from "../../contexts/DataContext"

jest.mock("../../contexts/DataContext");

beforeEach(() => {
  useData.mockReturnValue({
    last: {
      title: "User&product MixUsers",
      cover: "/images/cover.jpg",
      date: "2025-04-15"
    }
  });
});

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {  
    render(<Home />);
    expect(screen.getByText("User&product MixUsers")).toBeInTheDocument();
  });

  it("a list of people is displayed", () => {
    render(<Home />);
    expect(screen.getByText("Samira")).toBeInTheDocument();
    expect(screen.getByText("Jean-baptiste")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Luís")).toBeInTheDocument();
    expect(screen.getByText("Christine")).toBeInTheDocument();
    expect(screen.getByText("Isabelle")).toBeInTheDocument();
  });

  it("a footer is displayed", () => {
    render(<Home />);
    expect(screen.getByText(/Notre derniére prestation/i)).toBeInTheDocument();
    expect(screen.getByText(/Contactez-nous/i)).toBeInTheDocument();
    expect(
      screen.getByText(/45 avenue de la République/i)
    ).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);

    const lastCard = await screen.findByTestId("last-event-card");
  
    expect(lastCard).toBeInTheDocument();
    expect(lastCard).toHaveTextContent("User&product MixUsers"); 
    expect(lastCard).toHaveTextContent("avril")
    const image = lastCard.querySelector("img");
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/images/cover.jpg");
  });
});
