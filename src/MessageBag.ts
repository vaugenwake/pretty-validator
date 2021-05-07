export class MessageBag {
  protected messages: Record<string, string[]> = {};

  public add(field: string, message: string) {
    this.messages[field] = Array.isArray(this.messages[field])
      ? this.messages[field]
      : [];

    this.messages[field].push(message);
  }

  public all(): Record<string, string[]> {
    return this.messages;
  }

  public has(field: string) {
    return (
      Object.keys(this.messages).includes(field) &&
      this.messages[field].length > 0
    );
  }

  public get(field: string): string | undefined {
    if (this.has(field)) {
      return this.messages[field][0];
    }

    return undefined;
  }

  public list(field?: string) {
    return typeof field !== "undefined"
      ? this.messages[field]
      : Object.keys(this.messages)
          .map((mapField) => this.messages[mapField])
          .reduce((list, messages) => [...list, ...messages], []);
  }

  public any() {
    return this.list().length > 0;
  }
}
