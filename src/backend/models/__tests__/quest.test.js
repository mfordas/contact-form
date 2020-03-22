import { validateGuest } from "../guest.js";

describe("Guest validation", () => {
  it("should return valid guest if all conditions are correct", () => {
    const newGuest = {
      name: "Mat",
      lastName: "For",
      email: "mail@mail.com",
      eventDate: "03/03/2020"
    };

    const validatedGuest = validateGuest(newGuest);

    expect(validatedGuest.value).toEqual({
      name: "Mat",
      lastName: "For",
      email: "mail@mail.com",
      eventDate: new Date("03/03/2020")
    });
  });

  it("should return required errors if data is empty", () => {
    const newGuest = {
      name: "",
      lastName: "",
      email: "",
      eventDate: ""
    };

    const validatedGuest = validateGuest(newGuest);

    expect(validatedGuest.error.message).toContain("Please type your name");
    expect(validatedGuest.error.message).toContain(
      "Please type your last name"
    );
    expect(validatedGuest.error.message).toContain("Please type your e-mail");
    expect(validatedGuest.error.message).toContain(
      "Date should have following format: DD/MM/YYYY"
    );
  });

  it("should return length errors if data is too short", () => {
    const newGuest = {
      name: "A",
      lastName: "A",
      email: "A",
      eventDate: "20/03/2020"
    };

    const validatedGuest = validateGuest(newGuest);

    expect(validatedGuest.error.message).toContain(
      "Name should have at least 3 characters"
    );
    expect(validatedGuest.error.message).toContain(
      "Last name should have at least 3 characters"
    );
    expect(validatedGuest.error.message).toContain(
      "E-mail should have at least 3 characters"
    );
  });

  it("should return length errors if data is too long", () => {
    const newGuest = {
      name: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      lastName: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      email:
        "email@mail.comAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      eventDate: "20/03/2020"
    };

    const validatedGuest = validateGuest(newGuest);

    expect(validatedGuest.error.message).toContain(
      "Name should have maximum 26 characters"
    );
    expect(validatedGuest.error.message).toContain(
      "Last name should have maximum 26 characters"
    );
    expect(validatedGuest.error.message).toContain(
      "E-mail should have maximum 255 characters"
    );
  });

  it("should return email format error if email adress is wrong", () => {
    const newGuest = {
      name: "AAA",
      lastName: "AAA",
      email: "AAAAA",
      eventDate: "20/03/2020"
    };

    const validatedGuest = validateGuest(newGuest);

    expect(validatedGuest.error.message).toContain(
      "E-mail should have following format: id@domain"
    );
  });
});
