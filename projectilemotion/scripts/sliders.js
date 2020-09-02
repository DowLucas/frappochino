class Slider {
    constructor(min, max, start, incr, name) {
        this.slider = createSlider(min, max, start, incr);
        this.slider.id = name;
        this.name = name;
        this.hoverOver = false;

    }


}
