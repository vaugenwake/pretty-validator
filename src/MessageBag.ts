export class MessageBag {
  protected messages: Record<string, string[]> = {};

  /**
   * Add a new message to the bag
   * @param field string
   * @param message string
   */
  public add(field: string, message: string) {
    this.messages[field] = Array.isArray(this.messages[field])
      ? this.messages[field]
      : [];

    this.messages[field].push(message);
  }

  /**
   * Return all messages in the bag.
   * @returns Record<string, string[]>
   */
  public all(): Record<string, string[]> {
    return this.messages;
  }

  /**
   * Return if there is an error for the field
   * @param field string
   * @returns boolean
   */
  public has(field: string): boolean {
    return (
      Object.keys(this.messages).includes(field) &&
      this.messages[field].length > 0
    );
  }

  /**
   * Return an item form the bag via field name/key
   * @param field string
   * @returns string|undefined
   */
  public get(field: string): string | undefined {
    if (this.has(field)) {
      return this.messages[field][0];
    }

    return undefined;
  }

  /**
   * Return a list of all validation messages in the bag
   * @param field string
   * @returns string[]
   */
  public list(field?: string): string[] {
    return typeof field !== "undefined"
      ? this.messages[field]
      : Object.keys(this.messages)
        .map((mapField) => this.messages[mapField])
        .reduce((list, messages) => [...list, ...messages], []);
  }

  /**
   * Are there any messages in teh bag?
   * @returns boolean
   */
  public any(): boolean {
    return this.list().length > 0;
  }

  /**
   * Reset the bag
   * @returns void
   */
  public empty(): void {
    this.messages = {};
  }
}
