class Input {
    constructor(text) {
        this.input = createInput(text.toString(10))
    }

    update(newvalue) {
        this.input.value = newvalue;
    }
}