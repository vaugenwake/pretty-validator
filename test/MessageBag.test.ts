import { MessageBag } from "../src/MessageBag";

describe("MessageBag", () => {
  test("can check item is in bag", () => {
    const messageBag = new MessageBag();

    messageBag.add("name", "Required item");

    expect(messageBag.has("name")).toBeTruthy();
    expect(messageBag.has("email")).toBeFalsy();
  });

  test("can add a new message to bag", () => {
    const messageBag = new MessageBag();

    messageBag.add("name", "Name is required");

    expect(messageBag.all().name.length).toBe(1);

    messageBag.add("name", "Name is required again");
    expect(messageBag.all().name.length).toBe(2);
  });

  test("can get item from bag with key", () => {
    const messageBag = new MessageBag();

    messageBag.add("name", "Required item");

    expect(messageBag.get("name")).toBe("Required item");
  });

  test("returns true is any messages in bag", () => {
    const messageBag = new MessageBag();
    const messageBag2 = new MessageBag();

    messageBag.add("name", "Required item");

    expect(messageBag.any()).toBeTruthy();
    expect(messageBag2.any()).toBeFalsy();
  });

  test("list all messages in bag", () => {
    const messageBag = new MessageBag();

    messageBag.add("name", "Required item");
    messageBag.add("email", "Required item 2");

    expect(messageBag.list().length).toBe(2);
    expect(messageBag.list()[1]).toBe("Required item 2");
  });
});
