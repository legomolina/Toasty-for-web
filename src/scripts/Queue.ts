/**
 * Implementation of queue collection
 */
export default class Queue<T> {
    private elements: Array<T> = [];

    public enqueue(element: T): void {
        this.elements.push(element);
    }

    public dequeue(): T {
        let removedElement = this.elements.splice(0, 1);

        return removedElement[0];
    }

    public peek(): T {
        return this.elements[0];
    }

    public size(): number {
        return this.elements.length;
    }
}