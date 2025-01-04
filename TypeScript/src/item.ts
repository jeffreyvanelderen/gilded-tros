export class Item {
    /**
     * TODO adjust name type to ItemType enum if allowed? (or even better, separate name: string and type: ItemType properties)
     * @param name
     * @param sellIn
     * @param quality
     */
  constructor(public name: string, public sellIn: number, public quality: number) {
}

public toString(): string {
    return `${this.name}, ${this.sellIn}, ${this.quality}`;
}
}
